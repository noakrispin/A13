'use client';
// Import the CartProductType interface
import { CartProductType } from "@/app/product/[productId]/ProductDetails";

// Define the props interface for the SetQuantity component
interface SetQantityProps{
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

// SetQuantity component definition
const SetQantity: React.FC<SetQantityProps>= ({
    cartProduct, cartCounter, handleQtyIncrease, handleQtyDecrease
}) => {
  return (
    <div>
    {/* Render buttons to increase and decrease quantity */}
    {/* Handle quantity decrease */}
    <button onClick={handleQtyDecrease}>-</button>
    {/* Display the current quantity */}
    <span>{cartProduct.quantity}</span>
    {/* Handle quantity increase */}
    <button onClick={handleQtyIncrease}>+</button>
  </div>
  )
};

export default SetQantity;