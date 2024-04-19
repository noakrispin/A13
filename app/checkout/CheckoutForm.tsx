'use client';

// Importing necessary modules and components
import { formatPrices } from "@/Utils/formatPrices";
import { useCart } from "@/hooks/useCart"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import { layouts } from "chart.js";
import Button from "../components/Button";

// Define props for CheckoutForm component
interface CheckoutFormProps{
    clientSecret: string, // Client secret for Stripe payment
    handleSetPaymentSuccess: (value: boolean) => void; // Function to handle setting payment success
}

// Define the CheckoutForm functional component
const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret,handleSetPaymentSuccess}) => {
    // Destructuring variables and functions from useCart hook
    const {cartTotalAmount,handleClearCart, handleSetPaymentIntent} = useCart();
    const stripe = useStripe(); // Stripe instance
    const elements = useElements(); // Stripe elements
    const [isLoading, setisLoading]=useState(false); // State to track loading state
    const formattedPrice = formatPrices(cartTotalAmount);// Format total amount price

    // Effect to handle setting payment success when stripe or client secret changes
    useEffect(() => {
        if (!stripe || !clientSecret) return;
        handleSetPaymentSuccess(false);
    }, [stripe, clientSecret, handleSetPaymentSuccess]); //

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure stripe and elements are available
        if(!stripe || !elements){
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
         // Start loading state
        setisLoading(true);

        // Confirm payment with Stripe
        stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        }).then((result) => {
            if(!result.error){
                // Payment success
                toast.success('Checkout Success');

                handleClearCart();
                handleSetPaymentSuccess(true); // Set payment success
                handleSetPaymentIntent(null); // Reset payment intent
            }
            else{
                // Handle payment error
                if (result.error.message) {
                toast.error(result.error.message); // Display error message
                } else {
                toast.error('Payment failed'); // Display generic error message
                }
            }
            // End loading state
            setisLoading(false);
            });
    };
     // Render the CheckoutForm component
    return (
        <form onSubmit={handleSubmit} id="patment-form">
            <div className="mb-6">
                <Heading title="Enter your details to complete checkout" />
            </div>
            {/* Address Information */}
            <h2 className="font-semibold mb-2 ">
                Address Information
            </h2>
            <AddressElement 
                options={{
                    mode: 'shipping',
                    allowedCountries: ['Israel', 'USA'],
                }}
            />
            {/* Payment Information */}
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id='payment-element' options={{layout: 'tabs'}}/>
            <div className="py-4 text-center text-2xl font-bold ">
                Total: {formattedPrice}
            </div>
            <Button label={isLoading ? 'Processing' : 'Pay now'} 
            disabled={isLoading || !stripe || !elements} 
            onClick={()=>{}}/>
        </form>
    );
};

// Export the CheckoutForm component
export default CheckoutForm;
