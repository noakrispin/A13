import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


type CartContextType={
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product : CartProductType) => void;
    handleRemoveProductFromCart: (product : CartProductType) => void;
    handleClearCart: () => void;
    handleCartQtyIncrease: (product : CartProductType) => void;
    handleCartQtyDecrease: (product : CartProductType) => void;
    paymentIntent: string | null; 
    handleSetPaymentIntent: (val: string | null) => void;
};


export const CartContext = createContext<CartContextType | null> (null);

/*
interface Props{
    [propName: string] : any;

}*/

interface CartContextProviderProps {
    children: React.ReactNode;
}

//export const CartContextProvider = (props: Props) => {
export const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {


    const[cartTotalQty,setCartTotalQty]=useState<number>(0);
    const[cartTotalAmount, setCartTotalAmount]= useState<number>(0);
    const[cartProducts, setcartProducts] = useState<CartProductType[] | null>([]);

    const[paymentIntent, SetPaymentIntent] = useState <string | null> (null);


    useEffect(()=>{
        const cartItems: any = localStorage.getItem('FrameOfFameCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        const FrameOfFamePaymentIntent: any= localStorage.getItem('FrameOfFamePaymentIntent');
        const paymentIntent: string | null = JSON.parse(FrameOfFamePaymentIntent);

        setcartProducts(cProducts);
        SetPaymentIntent(paymentIntent);
    },[]);

    useEffect(()=> {
        const getTotals = () =>{
            if(cartProducts){
                const {total, qty} = cartProducts?.reduce((acc,item)=>{
                    const itemTotal = item.price;
        
                    acc.total += itemTotal ;
                    acc.qty += item.quantity;

                    return acc
                },
                {
                    total: 0,
                    qty:0
                }
                );
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }

        };

        getTotals();
    },[cartProducts]);
    
    //add product to the stat
    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        setcartProducts((prev)=>{
            let updateCart; 

            //prev can be null or value
            if(prev){
                updateCart=[...prev,product];
            }else{
                updateCart = [product];
            }
                
            toast.success('Product added to cart');
            localStorage.setItem('FrameOfFameCartItems', JSON.stringify(updateCart));
            return updateCart;
            });
        },[]);

    const handleRemoveProductFromCart = useCallback((product:CartProductType)=>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item)=> item.id !== product.id);
            /*{
                return item.id != product.id
            });*/
            setcartProducts(filteredProducts);
            toast.success('Product Removed');
            localStorage.setItem('FrameOfFameCartItems', JSON.stringify(filteredProducts));
        }
    },[cartProducts]);
    
    const handleCartQtyIncrease = useCallback((product:CartProductType)=>{
        let updateCart;
        if(cartProducts){
            updateCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex((item) => item.id == product.id);
            if(existingIndex >-1){
                updateCart[existingIndex].quantity= ++updateCart[existingIndex].quantity;
                //updateCart[existingIndex].quantity = updateCart[existingIndex].quantity?. > 0 ? --updateCart[existingIndex].quantity : 0;
            }

            setcartProducts(updateCart);
            localStorage.setItem('FrameOfFameCartItems', JSON.stringify(updateCart));
        }
        },[cartProducts]);

    const handleCartQtyDecrease = useCallback((product:CartProductType)=>{
        let updateCart;
        if(cartProducts){
            updateCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex((item) => item.id == product.id);
                if(existingIndex > -1){
                    updateCart[existingIndex].quantity= --updateCart[existingIndex].quantity;

                }

                setcartProducts(updateCart);
                localStorage.setItem('FrameOfFameCartItems', JSON.stringify(updateCart));
            }
        },[cartProducts]);
    
    const handleClearCart = useCallback(()=> {
        setcartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem('FrameOfFameCartItems', JSON.stringify(null));

        },[cartProducts]
    );

    
    const handleSetPaymentIntent = useCallback((val: string | null) => {
        SetPaymentIntent(val);
        localStorage.setItem('FrameOfFamePaymentIntent',JSON.stringify(val));
        },[paymentIntent]);
   
    /*const handleSetPaymentIntent = useCallback((val: string | null) => {
        SetPaymentIntent(val);
        localStorage.setItem('FrameOfFamePaymentIntent', JSON.stringify(val));
    }, []);     */
    
    const value={
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleClearCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        paymentIntent,
        handleSetPaymentIntent,
    };

    //return <CartContext.Provider value={value} {...props}/>
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

};

export const useCart = () => {
    const context = useContext(CartContext);
    
    if (!context){ //== null
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;

};

