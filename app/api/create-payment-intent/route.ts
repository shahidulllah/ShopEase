import { getCurrentUser } from "@/actions/getCurrentUser"
import { CartProductType } from "@/app/product/[productId]/ProductDetails"
import { prisma } from "@/libs/prismadb"
import { NextResponse } from "next/server"
import Stripe from "stripe"


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-09-30.acacia'
})

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;


        return acc + itemTotal;
    }, 0)

    return totalPrice;
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, payment_intent_id } = body
    const total = calculateOrderAmount(items) * 100;
    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: 'usd',
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: payment_intent_id,
        products: items
    }

    if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if (current_intent) {
            console.log(current_intent, "Current intent====================");
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });

            //update the oreder
            const existing_order = await prisma.order.findFirst({
                where: { paymentIntentId: payment_intent_id },
            });

            if (!existing_order) {
                return NextResponse.json({ error: "Order not found for the provided Payment Intent" }, { status: 404 });
            }

            // If an order is found, proceed to update it
            const updated_order = await prisma.order.update({
                where: { paymentIntentId: payment_intent_id },
                data: {
                    amount: total,
                    products: items,
                },
            });


            return NextResponse.json({ paymentIntent: updated_intent })
        }
    }
    // In case of no existing Payment Intent, create a new one
    if (!payment_intent_id) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });

        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({ paymentIntent });
    }



}