'use client';
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";


const CartCount = () => {
    const router =useRouter();
  return (
    <div 
    className="relative cursor-pointer" 
    onClick={()=>router.push('/cart')}>
        <div className="text-3xl">
            <CiShoppingCart className="cursor-pointer" />
        </div>
    </div>
  );
}

export default CartCount