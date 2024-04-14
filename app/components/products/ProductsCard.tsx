'use client';
import React from 'react';
import { formatPrices } from "@/Utils/formatPrices";
import { truncateText } from "@/Utils/truncateText";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Correct import
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface productsCardProps {
    data: any
}

const ProductsCard: React.FC<productsCardProps> = ({ data }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/product/${data.id}`)} // Navigate to product detail page on click
            className="
            col-span-1 
            cursor-pointer 
            border-slate-200 
            bg-white  
            rounded-sm 
            p-2 
            transition hover:scale-105 
            text-center 
            text-sm
            shadow-sm shadow-slate-400"
        >
            <div className="
                flex flex-col
                items-center
                w-full
                gap-1"
            >
                <div className="
                    aspect-square
                    overflow-hidden
                    relative q w-full
                    bg-white-200
                    flex 
                    justify-center 
                    items-center"
                >
                    <Image
                    src={data.images?.[0]?.image} // Change 'fill' to 'src'
                    alt={data.name}
                    layout="fill" // Add layout="fill" to stretch the image within its container
                    objectFit="cover" // Add objectFit="cover" to ensure the image covers the container
                    className="w-full h-full object-cover" // Replace 'object-contain' with 'object-cover'
                    />
                </div>
                <div className="mt-4">
                    {truncateText(data.name)}
                </div>
                <div className="mt-4">{truncateText(data.Artist_Name)}</div>
                <div>
                    <Rating
                        value={5}
                        icon={<FavoriteIcon fontSize="inherit" className="red-heart" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                </div>
                <div className="font-semibold">{formatPrices(data.price)}</div>
            </div>
        </div>
    );
};

export default ProductsCard;
