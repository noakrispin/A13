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
                <Image
                    fill
                    src={cartProduct.selectedImg.image}
                    alt={cartProduct.name}
                    className="max-w-full h-auto object-contain max-h-[5000px] min-h-[300px] sm:min-h-[300px]"
                />
            </div>
        </div>
    );
};

export default ProductsImg;
