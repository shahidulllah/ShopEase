import { prisma } from "@/libs/prismadb";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-09-30.acacia",
});

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse) {
    // if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET) {
    //     return res.status(500).json({ error: "Stripe keys not configured properly" });
    // }

    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    if (!sig) {
        return res.status(400).send("Missing the Stripe signature");
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            buf, 
            sig, 
            process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        // console.error("Webhook error:", err.message);
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    switch (event.type) {
        case "charge.succeeded":
            const charge:any = event.data.object as Stripe.Charge;

            if (typeof charge.payment_intent === "string"){
                    await prisma?.order.update({
                        where: { paymentIntentId: charge.payment_intent },
                        data: {
                            status: "complete",
                            address: charge.shipping?.address},
                    });
                } 
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
}

