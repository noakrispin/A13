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
                    <div className="w-full h-full relative">
                        <Image
                            src={cartProduct.selectedImg.image}
                            alt={cartProduct.name}
                            layout="fill"
                            objectFit="cover" // If you were using objectFit="cover" previously
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsImg;
