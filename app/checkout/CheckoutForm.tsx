'use client'

import { formatPrices } from "@/Utils/formatPrices";
import { useCart } from "@/hooks/useCart"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import { layouts } from "chart.js";
import Button from "../components/Button";



interface CheckoutFormProps{
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret,handleSetPaymentSuccess}) => {

    const {cartTotalAmount,handleClearCart, handleSetPaymentIntent} = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setisLoading]=useState(false);
    const formattedPrice = formatPrices(cartTotalAmount);

    useEffect(() => {
        if (!stripe) {
            return;
        }
        if (!clientSecret) {
            return;
        }
        handleSetPaymentSuccess(false);
    }, [stripe, clientSecret, handleSetPaymentSuccess]); //

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!stripe || !elements){
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setisLoading(true);

        stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        }).then((result) => {
            if(!result.error){
                toast.success('Checkout Success');

                handleClearCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            }

            setisLoading(false);
            });
    };
    return (
        <form onSubmit={handleSubmit} id="patment-form">
            <div className="mb-6">
                <Heading title="Enter your details to complete checkout" />
            </div>
            <h2 className="font-semibold mb-2 text-white">
                Address Information
            </h2>
            <AddressElement 
                options={{
                    mode: 'shipping',
                    allowedCountries: ['Israel', 'USA'],
                }}
            />
            <h2 className="font-semibold mt-4 mb-2 text-white">Payment Information</h2>
            <PaymentElement id='payment-element' options={{layout: 'tabs'}}/>
            <div className="py-4 text-center text-2xl font-bold text-white">
                Total: {formattedPrice}
            </div>
            <Button label={isLoading ? 'Processing' : 'Pay now'} 
            disabled={isLoading || !stripe || !elements} 
            onClick={()=>{}}/>
        </form>
    );
};

export default CheckoutForm;
