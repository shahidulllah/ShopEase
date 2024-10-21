'use client'

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

interface CheckoutFormProps{
    clientSecret: string,
    handlePaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret, handlePaymentSuccess}) => {
    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false);
    const formatedPrice = formatPrice(cartTotalAmount)

    useEffect(() => {
        if (!stripe || !clientSecret) {
           
            return;
          }
          handlePaymentSuccess(false)
    },[stripe, clientSecret, handlePaymentSuccess])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
          }
      
          setIsLoading(true);
      
    }
    return (
        <div>
            
        </div>
    );
};

export default CheckoutForm;