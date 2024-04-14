'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductsImgProps {
    cartProduct: CartProductType,
    product: any,
}

const ProductsImg: React.FC<ProductsImgProps> = ({ cartProduct, product }) => {
    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[5000px] min-h-[300px] sm:min-h-[300px]">
            <div className="col-span-5 relative aspect-square">
                {cartProduct.selectedImg && cartProduct.selectedImg.image && (
                    <Image

                        src={cartProduct.selectedImg.image}
                        alt={cartProduct.name || "Product Image"}
                        layout="fill" // Add layout="fill" to utilize the full space
                        objectFit="contain" // Adjust objectFit based on your design
                        sizes="(max-width: 600px) 100vw, 50vw" // Example sizes attribute
                    />
                )}
            </div>
        </div>
    );
};

export default ProductsImg;
