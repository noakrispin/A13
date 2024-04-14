export const revalidate=0; 

import React from 'react';
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { products } from "@/Utils/products";

interface IParams {
    productId?: string;
};

const Product = ({ params }: { params: IParams }) => {
    console.log('params', params);

    // Find the product by ID
    const product = params.productId ? products.find(item => item.id === params.productId) : undefined;

    return (
        <div className="p-16"> {/* Adjusted padding */}
            <Container>
                 {/* Render ProductDetails if product is found, otherwise show a message */}
                 {product ? (
                    <ProductDetails product={product} />
                ) : (
                    <p>Product not found.</p>
                )}
            </Container>
        </div>
    );
};

export default Product;
