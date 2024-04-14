'use client'

import { formatPrices } from "@/Utils/formatPrices";
import { truncateText } from "@/Utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps{
  item: CartProductType
}

const OrderItem: React.FC<OrderItemProps> = ({item}) => {


  return (
    <div className="
    grid grid-cols-4 text-xs 
    md:text-sm gap-4 border-t-[1.5px] border-white py-4 items-center">
      <div className=" col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className=" relative w-[80px] aspect-square">
          <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain"/>
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(item.name)}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrices(item.price)}</div>
      <div className="justify-self-end font-semibold">${(item.price *item.quantity).toFixed(2)}</div>
    </div>
  )
};

export default OrderItem;