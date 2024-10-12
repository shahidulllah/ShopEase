import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { error } from "console";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductCart: (product: CartProductType) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalQty, setCartQty] = useState(0);

    useEffect(() => {
        const cartItems: any = localStorage.getItem("shopEaseCartItems")
       const cProducts: CartProductType[] | null = JSON.parse(cartItems)

       setCartProducts(cProducts)
    }, [])

    const handleAddProductCart = useCallback(( procuct: CartProductType) =>{
        setCartProducts((prev) => {
            let updatedCart;

            if(prev){
                updatedCart = [...prev, procuct];
            } 
            else{
                updatedCart = [procuct]
            }

            toast.success('Product added to card')
            localStorage.setItem ('shopEaseCartItems', JSON.stringify(updatedCart));

            return updatedCart;
        })
    }, []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductCart
    }

    return <CartContext.Provider value={value} {...props} />
};


export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null) {
       throw new Error("useCart must be used within a CartContextProvider")
    }

    return context;
}