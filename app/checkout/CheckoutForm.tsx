'use client'

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../Components/Heading";
import Button from "../Components/Button";

interface CheckoutFormProps {
    clientSecret: string,
    handlePaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handlePaymentSuccess }) => {
    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false);
    const formatedPrice = formatPrice(cartTotalAmount)

    useEffect(() => {
        if (!stripe || !clientSecret) {

            return;
        }
        handlePaymentSuccess(false)
    }, [stripe, clientSecret, handlePaymentSuccess])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        stripe.confirmPayment({
            elements,
            redirect: "if_required",
        })
            .then((result) => {
                if (!result.error) {
                    toast.success("Checkout Success");

                    handleClearCart();
                    handlePaymentSuccess(true)
                    handleSetPaymentIntent(null)
                }
                setIsLoading(false);
            })
    }
    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your details to checkout"/>
            </div>
            <h2 className="font-semibold mb-2">Adress Information</h2>
            <AddressElement options={{mode: 'shipping', allowedCountries: ["US", "BD", "KE"]}}/>
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{layout: 'tabs'}}/>
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Total: {formatedPrice}
            </div>
            <Button label={isLoading? "Processing":"Pay"} disabled={isLoading || !stripe || !elements} onClick={() => {}}/>
        </form>
    );
};

export default CheckoutForm;