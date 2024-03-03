import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import CartProvider from '@/providers/CartProvider';

const poppins = Poppins({ subsets: ['latin'], weight:
 ['400','700'] });


export const metadata: Metadata = {
  title: 'Frame of Fame',
  description: 'Frame of Fame app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
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

