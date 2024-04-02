'use client';

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation"; // Importing useRouter hook from Next.js for navigation
import { CiShoppingCart } from "react-icons/ci";


// CartCount component to display the total quantity of items in the cart
const CartCount = () => {
    const {cartTotalQty} = useCart(); // Using custom hook to get cart total quantity
    const router =useRouter();
    return (
        <div 
        className="relative cursor-pointer" 
        onClick={()=>router.push('/cart')}>
            {/* Shopping cart icon */}
            <div className="text-3xl">
                <CiShoppingCart className="cursor-pointer" />
            </div>
            {/* Cart count badge */}
            <span className="absolute
            top-[-10px] 
            right-[-10px]
            bg-purple-300
            text-black
            w-6
            h-6
            rounded-full 
            flex 
            justify-center 
            items-center">{cartTotalQty}</span>
        </div>
    );
};

export default CartCount