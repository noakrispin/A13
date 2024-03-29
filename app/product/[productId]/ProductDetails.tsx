'use client';

import Button from "@/app/components/Button";
import ProductsImg from "@/app/components/products/ProductsImg";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdEasel } from "react-icons/io";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps{
    product: any;
}

export type CartProductType = {
  id: string,
  name: string, 
  description: string,
  Artist_Name:string,
  Size: string,
  category: string,
  selectedImg: SelectedImgType,
  quantity: number,
  price: number
}

export type SelectedImgType ={
  color: string,
  colorCode: string,
  image: string
}

const Horizontal =() => {
  return <hr className="w-[80%] my-2  bg-violet-500"/>
};


const ProductDetails: React.FC<ProductDetailsProps>=
({product}) => {

  const{handleAddProductToCart,cartProducts} = useCart ();

  //Checking if the product is already in the cart or not
  const [isProductInCart, setisProductInCart]= useState(false);

  const [cartProduct,setCartProduct]= useState<CartProductType>({
    id: product.id,
    name: product.name, 
    description: product.description,
    Artist_Name: product.Artist_Name,
    Size: product.Size,
    category: product.category,
    selectedImg: {...product.images[0]},
    quantity: 1,
    price: product.price
  });

  const router = useRouter()


  useEffect(()=> {
    setisProductInCart(false)

    if(cartProducts){
      const exsitingIndex = cartProducts.findIndex((item)=> item.id == product.id)

      if (exsitingIndex> -1){
        setisProductInCart(true);
      }
    }

  },[cartProducts]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-black">
      <div>
        <ProductsImg cartProduct={cartProduct} product={product} />
      </div>
        <div className="w-2/3 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-medium mb-6">{product.name}</h2>

            <div className="text-justify mb-4">{product.Artist_Name}</div>
            <div className="text-justify ">{product.description}</div>
            <div className="text-justify ">{product.Size}</div>
            <Horizontal/>
            <div> 
              <span className="font-semibold mb-2 ">Category: </span>{product.category}
            </div>
            <div className="text-justify flex items-center gap-2 md:underline"><IoMdEasel />{product.unique}</div>
            <div className="text-justify flex items-center gap-2 md:underline"><LiaShippingFastSolid />{product.Shipping}</div>
            <Horizontal/>
            {isProductInCart ? (
            <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20}/>
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]"> 
              <Button label="View Cart"  onClick={()=> {
                router.push('/cart');
              } }/>
            </div>
            </>) : (
            <>
              <div className="max-w-[300px]">
                <Button 
                label="Add To Cart"
                onClick={()=>handleAddProductToCart(cartProduct)}
                />
              </div>
            </>)}

        </div>
    </div>
  );
};

export default ProductDetails;