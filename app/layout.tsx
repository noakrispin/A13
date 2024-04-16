import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import CartProvider from '@/providers/CartProvider';
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = { // Corrected casing
  title: 'Frame of Fame', // Corrected casing
  description: 'Fame Frame App', // Corrected casing
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className='dark'>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#fff',
          }
        }}/>
        <CartProvider> 
          <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <main className='flex-grow'>{children}</main>
            <Footer/>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

