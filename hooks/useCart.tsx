import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { error } from "console";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { product } from "../../utils/procuct";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalQty, setCartTotalQty] = useState(0);

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

    const handleRemoveProductFromCart = useCallback(( procuct: CartProductType) =>{
       if(cartProducts){
        const filteredProducts = cartProducts.filter((item)=> {
            return item.id !== product.id
        })
        setCartProducts(filteredProducts)
        toast.success('Product removed')
        localStorage.setItem ('shopEaseCartItems', JSON.stringify(filteredProducts));
       }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 99){
            return toast.error('Ooop! Maximum reached')
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('shopEaseCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts]);


    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1){
            return toast.error('Ooop! Minimum reached')
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('shopEaseCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts]);


    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)

        localStorage.setItem('shopEaseCartItems', JSON.stringify(null))
    }, [])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
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