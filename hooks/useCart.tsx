import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { error } from "console";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0)

    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)    

    useEffect(() => {
        const cartItems: any = localStorage.getItem("shopEaseCartItems")
       const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        const shopEasePaymentIntent:any = localStorage.getItem('shopEasePaymentIntent');
        const paymentIntent: string | null = JSON.parse(shopEasePaymentIntent)

       setCartProducts(cProducts)
       setPaymentIntent(paymentIntent);
    }, [])

    useEffect(() => {
        const getTotals = () => {
            if(cartProducts) {
                const {total, qty} = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
    
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
    
                    return acc;
                }, {
                    total: 0,
                    qty: 0 
                })

                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        }
        getTotals()
    }, [cartProducts])

    const handleAddProductCart = useCallback(( product: CartProductType) =>{
        setCartProducts((prev) => {
            let updatedCart;

            if(prev){
                updatedCart = [...prev, product];
            } 
            else{
                updatedCart = [product]
            }

            toast.success('Product added to card')
            localStorage.setItem ('shopEaseCartItems', JSON.stringify(updatedCart));

            return updatedCart;
        })
    }, []);

    const handleRemoveProductFromCart = useCallback(( product: CartProductType) =>{
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

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val);
        localStorage.setItem('shopEasePaymentIntent', JSON.stringify(val))
    }, [])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        handleSetPaymentIntent,
        paymentIntent
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