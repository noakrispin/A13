'use client';
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ContentItem from "./ContentItem";
import { formatPrices } from "@/Utils/formatPrices";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

// Defining the props interface for the CartClient component
interface CartClientProps{
    currentUser: SafeUser | null; 
}

// Defining the CartClient component as a functional component that accepts props of type CartClientProps
const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    //get are cart Products -->Destructuring values from the useCart hook
    const {cartProducts, handleClearCart,cartTotalAmount} = useCart();
    // Initializing the router
    const router=useRouter();
    // If the cart is empty, render a message and a link to start shopping
    if (!cartProducts || cartProducts.length==0){
        return (
        <div className=" flex flex-col items-center">
            <div className="text-2xl"> Your cart is empty</div>
            <div>
                <Link href={'/'} className="
                 flex items-center gap-1 mt-2">
                    <MdArrowBack/>
                <span>Start Shopping</span>
                </Link>
            </div>
        </div>
        );
    }
    // If the cart is not empty, render the cart items and other cart details
  return (
    <div>
        <Heading title="Shopping Cart" center/>
        <div className="
        grid
        grid-cols-4
        text-xs
        gap-5
        pb-2
        items-center
        mt-8">
            <div className="col-span-2 justify-self-start">Product</div>
            <div className="justify-self-center">Price</div>
            <div className="justify-self-end">Total</div>
        </div>
        <div>
            {/* Mapping through cartProducts to render each item */}
            {cartProducts && cartProducts.map((item) => {
                return <ContentItem key={item.id} item={item}/>;
            })}
        </div>
        <div className="border-t-[1px] border-violet-500 py-4 flex justify-between gap-5 ">
            <div className="w-[100px]">
                {/* Button to clear the cart */}
                <Button label='Clear Cart' onClick={() =>
                    {handleClearCart()}} small outline/>
            </div>
            <div className="text-sm flex flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                    {/* Displaying subtotal */}
                    <span>Subtotal</span>
                    <span>{formatPrices(cartTotalAmount)}</span>
                </div>
                {/* Additional information */}
                <p className="text-violet-500">
                    Taxes and Shipping are calculated at checkout
                </p>
                {/* Button to proceed to checkout or login */}
                <Button label={currentUser ? "Checkout" : 'Login To Checkout'} 
                outline = {currentUser ? false : true}
                onClick={()=>{currentUser ? router.push('/checkout') : router.push('/login')}}
                />
                {/* Link to continue shopping */}
                <Link href={'/'} className="
                 flex items-center gap-1 mt-2">
                    <MdArrowBack/>
                    <span>Continue Shopping</span>
                </Link>
            </div>
        </div>
    </div>
  );
};

// Exporting the CartClient component as the default export of this module
export default CartClient;