'use client';
// Import necessary dependencies and components
import React from 'react';
import { formatPrices } from "@/Utils/formatPrices";
import { truncateText } from "@/Utils/truncateText";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Correct import
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Define the props interface for the ProductsCard component
interface productsCardProps {
    data: any; // Data object containing product information
}

// ProductsCard component definition
const ProductsCard: React.FC<productsCardProps> = ({ data }) => {
    const router = useRouter(); // Initialize the useRouter hook
    // Product card container with onClick event handler to navigate to product detail page
    return (
        <div
            onClick={() => router.push(`/product/${data.id}`)} // Navigate to product detail page on click
            className="
            col-span-1 
            cursor-pointer 
            border-slate-200 
            bg-white  
            text-black
            rounded-sm 
            p-2 
            transition hover:scale-105 
            text-center 
            text-sm
            shadow-sm shadow-slate-400"
        >
            {/* Container for product information */}
            <div className="
                flex flex-col
                items-center
                w-full
                gap-1"
            >
                {/* Product image */}
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
                        fill
                        src={(data.images ?? [])[0]?.image} // Using nullish coalescing operator (??)
                        alt={data.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                {/* Product name */}
                <div className="mt-4">
                    {truncateText(data.name)}
                </div>
                {/* Artist name */}
                <div className="mt-4">{truncateText(data.Artist_Name)}</div>
                <div>
                    {/* Product rating */}
                    <Rating
                        value={5}
                        icon={<FavoriteIcon fontSize="inherit" className="red-heart" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                </div>
                {/* Product price */}
                <div className="font-semibold">{formatPrices(data.price)}</div>
            </div>
        </div>
    );
};

export default ProductsCard;
