'use client';
import React from 'react';
import { formatPrices } from "@/Utils/formatPrices";
import { truncateText } from "@/Utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Correct import


interface productsCardProps{
    data:any 
}

const ProductsCard: React.FC<productsCardProps> = ({
data}) => {
  const router =useRouter();

  return (
    <div
    onClick={() => router.push(`/product/${data.id}`)} // Navigate to product detail page on click
    className="      
    col-span-1 
    cursor-pointer 
    border-slate-200 
    bg-white  // Set background to white
    rounded-sm 
    p-2 
    transition hover:scale-105 
    text-center 
    text-sm
    shadow-sm shadow-slate-400">
        <div className="
        flex flex-col
        items-center
        w-full
        gap-1">
            <div className="
            aspect-square
            overflow-hidden
            relative q w-full
            bg-white-200
            flex 
            justify-center 
            items-center">
                <Image
                fill
                src={data.images[0].image}
                alt={data.name}
                
                className=" w-full h-full object-contain "
                />
            </div>
            <div className="mt-4">
              {truncateText(data.name)}
            </div>
            <div className="mt-4">{truncateText(data.Artist_Name)}</div>
            <div>
              <Rating value={5}/>
               </div>
            <div className="font-semibold">{formatPrices(data.price)}</div>
        </div>
        
    </div>
  );
};

export default ProductsCard;
