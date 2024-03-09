'use client';

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";


const CartCount = () => {
    const {cartTotalQty} = useCart();
    const router =useRouter();
    return (
        <div 
        className="relative cursor-pointer" 
        onClick={()=>router.push('/cart')}>
            <div className="text-3xl">
                <CiShoppingCart className="cursor-pointer" />
            </div>
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