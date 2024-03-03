import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type CartContextType={
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product : CartProductType) => void 
};

export const CartContext = 
createContext<CartContextType | null>(null);

interface Props{
    [propName: string] : any;

}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty,setCartTotalQty]= useState(10);
    const [cartProducts, setcartProducts] = useState<CartProductType[] |null>(
        null
    );

    useEffect(()=>{
        const cartItems: any = localStorage.getItem('FrameOfFameCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setcartProducts(cProducts)
    },[])
    
    //add product to the stat
    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        setcartProducts((prev)=>{
            let updateCart; 

            //prev can be null or value
            if(prev){
                updateCart=[...prev,product]

            }else{
                updateCart = [product]
            }
            
            localStorage.setItem('FrameOfFameCartItems', JSON.stringify(updateCart))
            return updateCart;
        })
    },[]);

    const value={
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
    };

    return <CartContext.Provider value={value} {...props}/>
    
};

export const useCart = () => {
    const context = useContext(CartContext);
    
    if (context == null ){
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context;

};
