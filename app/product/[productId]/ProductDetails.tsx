"use client"

import Button from "@/app/Components/Button";
import SetColor from "@/app/Components/Product/SetColor";
import SetQuantity from "@/app/Components/Product/SetQuantity";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] mt-2 my-2]"></hr>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    });

    console.log(cartProduct);

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length

    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct(prev => {
            return { ...prev, selectedImg: value };
        })
    },
        [cartProduct.selectedImg])

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return;
        }

        setCartProduct((prev) => {
            return { ...prev, quantity: ++prev.quantity }
        })
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return;
        }

        setCartProduct(prev => {
            return { ...(prev), quantity: --prev.quantity }
        })
    }, [cartProduct]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>dfsdf</div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating}></Rating>
                    <div>
                        {product.reviews.length} reviews
                    </div>
                </div>
                <Horizontal></Horizontal>
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal></Horizontal>

                <div>
                    <span className="font-semibold">CATAGORY:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND:</span> {product.brand}
                </div>
                <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>
                    {product.inStock ? 'In stock' : 'Out of stock'}
                </div>
                <Horizontal></Horizontal>
                <SetColor
                    cartProduct={cartProduct}
                    images={product.images}
                    handleColorSelect={handleColorSelect}
                ></SetColor>
                <Horizontal></Horizontal>
                <SetQuantity
                    cartProduct={cartProduct}
                    handleQtyDecrease={handleQtyDecrease}
                    handleQtyIncrease={handleQtyIncrease}
                ></SetQuantity>
                <Horizontal></Horizontal>
                <div>
                    <Button onclick={() => {}} label="Add To Cart"></Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;