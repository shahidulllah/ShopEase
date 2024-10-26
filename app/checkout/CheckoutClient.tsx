'use client'

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../Components/Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const router = useRouter()

    console.log("PaymentIntent", paymentIntent);
    console.log("ClientSecret", clientSecret);

    useEffect(() => {
        //create a payment intent as soon as the page loads
        if (cartProducts) {
            setLoading(true);
            setError(false);

            fetch('/api/create-payment-intent', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                })
            })
            .then((res) => {
                console.log(res, "This is res");
                setLoading(false);
                if (res.status === 401) {
                            return router.push('/login')
                        }
                
                return res.json();
            })
            .then((data) => {
                console.log(data, "This is data");
                if (data.paymentIntent && data.paymentIntent.client_secret) {
                    setClientSecret(data.paymentIntent.client_secret);
                    handleSetPaymentIntent(data.paymentIntent.id);
                } else {
                    throw new Error("Client secret not found in response");
                }
            })
            .catch((error) => {
                setError(true);
                toast.error(`Error: ${error.message}`);
                console.error("Checkout error:", error);
            });
            
        }

    }, [cartProducts, handleSetPaymentIntent, paymentIntent, router])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    }

    const handlePaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])

    return <div className="w-full">
        {clientSecret && cartProducts && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} handlePaymentSuccess={handlePaymentSuccess} />
            </Elements>
        )}

        {loading && <div className="text-center">Loading Checkout..</div>}
        {error && (
            <div className="text-center text-rose-500">Something went wrong..</div>
        )}
        {paymentSuccess && (
            <div className="flex items-center flex-col gap-4">
                <div className="text-teal-500 text-center">
                    Payment Success
                </div>
                <div className="max-w-[220px] w-full">
                    <Button label="View Your Orders" onClick={() => router.push('/order')} />
                </div>
            </div>
        )}

    </div>
};

export default CheckoutClient;