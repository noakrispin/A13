'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductsImgProps{
    cartProduct: CartProductType,
    product: any, 
}
const ProductsImg: React.FC<ProductsImgProps> =(
    {cartProduct,product}
) => {
    return <div className="col-span-5 relative aspect-square">
        <Image fill src={cartProduct.selectedImg.image} alt={cartProduct.name} className="w-full
        h-full
        object-contain
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[300px]
        "/>

    </div>
  };



export default ProductsImg; 
