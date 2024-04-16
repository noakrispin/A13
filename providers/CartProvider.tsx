'use client';

import { CartContextProvider } from "@/hooks/useCart";// Importing CartContextProvider from useCart hook

interface CartProviderProps{
    children: React.ReactNode // Define props interface with children as React.ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({children}) => { // Define CartProvider component with children as props
  return (
    <CartContextProvider>{children}</CartContextProvider> // Render CartContextProvider with children wrapped inside
  );
};

export default CartProvider; // Export CartProvider component