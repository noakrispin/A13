/*"use client";
export const revalidate=0; 

// Import necessary dependencies
import React, { useState, useEffect } from "react";
import getProducts, { IProductParams } from "@/actions/getProducts"; // Import getProducts function
import { useParams } from "next/navigation"; // Import useParams hook from next/navigation
import ProductsCard from "@/app/components/products/ProductsCard"; // Import ProductsCard component for displaying products
import { Product } from "@prisma/client";

// Define the CategoryPage functional component
const NftPage: React.FC = () => {
  
  const { category } = useParams<{ category: string }>();// Retrieve the category from the URL
  const [products, setProducts] = useState<Product[]>([]); // State to hold fetched products

  // Function to fetch products based on the current category
  const fetchProducts = async () => {
    try {
      // Call getProducts function with the current category
      const products = await getProducts({ category });
      // Update the products state with the fetched products
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Use useEffect to fetch products when the category changes
  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-violet-300">Products in Category: {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {/* Render ProductsCard for each product *//*}
        {products.map((product) => (
          <ProductsCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default NftPage; // Export the component*/
