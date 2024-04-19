// layout.tsx
// Import React and necessary components and styles
import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import CartProvider from '@/providers/CartProvider';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './components/ThemeProvider';

// Define metadata for the application
export const metadata: Metadata = {
  title: 'Frame of Fame', // Application title
  description: 'Frame of Fame app', // Application description
};

// Define the RootLayout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Wrap the layout in an HTML document structure
    <html>
      <head>
        {/* Add any other meta tags, stylesheets, or scripts here */}
      </head>
      <body>
        {/* Wrap the <body> element with the 'use client' directive */}
        <ThemeProvider>
          <Toaster toastOptions={{ style: { background: 'rgb(51 65 85)', color: '#fff' } }} />
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}