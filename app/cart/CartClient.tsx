'use client';
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ContentItem from "./ContentItem";
import { formatPrices } from "@/Utils/formatPrices";


const CartClient = () => {
    //get are cart Products
    const {cartProducts, handleClearCart,cartTotalAmount} = useCart();

    if (!cartProducts || cartProducts.length==0){
        return (
        <div className="text-white flex flex-col items-center">
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
  return (
    <div className='text-white'>
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
            {cartProducts && cartProducts.map((item) => {
                return <ContentItem key={item.id} item={item}/>;
            })}
        </div>
        <div className="border-t-[1px] border-violet-500 py-4 flex justify-between gap-5 ">
            <div className="w-[100px]">
                <Button label='Clear Cart' onClick={() =>
                    {handleClearCart()}} small outline/>
            </div>
            <div className="text-sm flex flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                    <span>Subtotal</span>
                    <span>{formatPrices(cartTotalAmount)}</span>
                </div>

                <p className="text-violet-500">
                    Taxes and Shipping are calculated at checkout
                </p>
                <Button label="Checkout" onClick={()=>
                {}}/>
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

export default CartClient;