'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQantityProps{
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const SetQantity: React.FC<SetQantityProps>= ({
    cartProduct, cartCounter, handleQtyIncrease, handleQtyDecrease
}) => {
  return (
    <div>SetQantity</div>
  )
};

export default SetQantity;