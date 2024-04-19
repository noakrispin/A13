// Importing necessary modules and components
import { formatPrices } from "@/Utils/formatPrices";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/Utils/truncateText";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

// Define props for ContentItem component
interface ContentItemProps {
  item: CartProductType;// Cart product item
}

// Define ContentItem functional component
const ContentItem: React.FC<ContentItemProps> = ({ item }) => {
  // Destructuring handleRemoveProductFromCart from useCart hook
  const {handleRemoveProductFromCart} = useCart();

  // Event handler for removing a product from cart
  const handleRemoveClick = () => {
    handleRemoveProductFromCart(item); // Call handleRemoveProductFromCart with item parameter
  };

   // Render the ContentItem component
  return (
    <div className="
      grid
      grid-cols-4
      text-xs
      md:text-sm
      gap-4
      border-t-[1px]
      border-violet-500
      py-4
      items-center
    ">
      <div className="col-span-2 
        justify-self-start 
        gap-2
        md:gap-4
        flex
        items-center
      ">
        {/* Link to product details page */}
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between flex-grow">
          {/* Link to product details page */}
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)} {/* Truncate product name if too long */}
          </Link>
          <div>
           {/* <button className="text-violet-500 underline" onClick={() => 
              handleRemoveProductFromCart (item)}>
              Remove
           </button>*/}
            <button
              className="text-violet-500 underline"
              onClick={handleRemoveClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Space") {
                  handleRemoveClick();
                }
              }}
            >
            Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrices(item.price)}</div>
      <div className="justify-self-end font-semibold">
        {formatPrices(item.price)} {/* Display formatted price */}
      </div>
    </div>
  );
};
// Export the ContentItem component
export default ContentItem;
