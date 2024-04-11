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
    <div>
    {/* Replace this placeholder div with actual UI elements */}
    {/* For example, buttons to increase and decrease quantity */}
    <button onClick={handleQtyDecrease}>-</button>
    <span>{cartProduct.quantity}</span>
    <button onClick={handleQtyIncrease}>+</button>
  </div>
  )
};

export default SetQantity;