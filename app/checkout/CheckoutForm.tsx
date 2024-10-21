'use client'

import { useCart } from "@/hooks/useCart";
import { useStripe } from "@stripe/react-stripe-js";

interface CheckoutFormProps{
    clientSecret: string,
    handlePaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret, handlePaymentSuccess}) => {
    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} = useCart()
    const stripe = useStripe()
    return (
        <div>
            
        </div>
    );
};

export default CheckoutForm;