'use client';

import Button from "@/app/components/Button";
import { useState } from "react";

interface ProductDetailsProps{
    product: any
}

const Horizontal =() => {
  return <hr className="w-[50%] my-2 opacity-25"/>
};

export type CartProductType ={
  id: string,
  name: string, 
  description: string,
  Artist_Name:string,
  Size: string,
  category: string,
  selectedImg: SelectedImgType,
  price: number
}

export type SelectedImgType ={
  color: string,
  colorCode: string,
  image: string
}
const ProductDetails: React.FC<ProductDetailsProps>
= ({product}) => {
  const [CartProduct,setCartProduct]= 
  useState<CartProductType>({
    id:product.id,
    name: product.name, 
    description: product.description,
    Artist_Name: product.Artist_Name,
    Size: product.Size,
    category: product.category,
    selectedImg: {...product.images[0]},
    price: product.price
  })
  return (
    <div className="grid grid-cols-1 
    md:grid-cols-2 gap-12 text-violet-200">
        <div>Images</div>
        <div>
            <h2 className="text-3xl font-medium ">{product.name}</h2>
            <Horizontal/>
            <div className="text-justify ">{product.description}</div>
            <div className="text-justify ">{product.Artist_Name}</div>
            <div className="text-justify ">{product.Size}</div>
            <Horizontal/>
            <div> 
              <span className="font-semibold ">CATEGORY:</span>{product.category}
            </div>
            <div>{product.inStock? 'In stock' : 'Out of stock'} </div>
            <Horizontal/>
            <div>
              <Button
              label="Add To Cart"
              onClick={()=>{}}
              />
            </div>
        </div>
    </div>
  );
};

export default ProductDetails;