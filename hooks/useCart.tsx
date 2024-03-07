import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type CartContextType={
    cartTotalAmount: number,
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product : CartProductType) => void;
    handleRemoveProductFromCart: (product : CartProductType) => void;
    handleClearCart: () => void;
};



export const CartContext = 
createContext<CartContextType | null>(null);

interface Props{
    [propName: string] : any;

}

export const CartContextProvider = (props: Props) => {
    const[cartTotalAmount, setCartTotalAmount]= useState(0)
    const [cartProducts, setcartProducts] = useState<CartProductType[] |null>(
        null
    );
    
    console.log('amount',cartTotalAmount);

    useEffect(()=>{
        const cartItems: any = localStorage.getItem('FrameOfFameCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setcartProducts(cProducts)
    },[]);

    useEffect(()=> {
        const getTotals = () =>{
            if(cartProducts){
                const {total} =cartProducts?.reduce((acc,item)=>{
                    const itemTotal = item.price
        
                    acc.total += itemTotal 
                    return acc
        
                },
                {
                    total: 0
                });
                setCartTotalAmount(total)
            }

        };
        getTotals()
    },[cartProducts])
    
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
            
            toast.success('Product added to cart');
            localStorage.setItem('FrameOfFameCartItems', JSON.stringify(updateCart));
            return updateCart;
        });
    },[]);

    const handleRemoveProductFromCart = useCallback((
        product:CartProductType)=>{
            if(cartProducts){
                const filteredProducts = cartProducts.filter((item)=>{
                    return item.id != product.id
                });
                setcartProducts(filteredProducts)
                toast.success('Product Removed');
                localStorage.setItem('FrameOfFameCartItems', JSON.stringify(filteredProducts));
            }
        },
        [cartProducts]
    );
    
    
    const handleClearCart = useCallback(()=> {
        setcartProducts(null)
        localStorage.setItem('FrameOfFameCartItems', JSON.stringify(null));

    },[cartProducts])


    const value={
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleClearCart,
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
