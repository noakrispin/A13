export const revalidate=0; 

// Importing React and necessary components
import React from 'react';
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

// Define the Checkout functional component
const Checkout = () => {
  return (
    <div className="p-8">
        <Container>
          {/* Wrapping CheckoutClient component with FormWrap */}
            <FormWrap>
                <CheckoutClient/>
            </FormWrap>
        </Container>
    </div>
  );
};

export default Checkout;