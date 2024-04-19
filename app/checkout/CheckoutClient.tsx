'use client';

// Importing necessary modules and components
import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";
import Container from "../components/Container";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHBLE_KEY as string);

// Define the CheckoutClient functional component
const CheckoutClient = () => {
    // Destructuring variables and functions from useCart hook
    const {cartProducts, paymentIntent,handleSetPaymentIntent} = useCart();
    const [loading, setLoading] = useState(false); // State to track loading state
    const[error, setError]= useState(false); // State to track error state
    const router=useRouter(); // Router instance
    
    const[clientSecret, setClientSecret] = useState(""); // State for client secret
    const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success

    console.log("paymentintnt",paymentIntent);
    console.log("clientSecret",clientSecret);

    // Effect to fetch payment intent when cart products or payment intent changes
    useEffect(() => {
        if (cartProducts) {
            setLoading(true);
            setError(false);
    
            // Fetch payment intent from server
            fetch("/api/create-payment-intent", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                setLoading(false);
                if (res.status === 401) {
                    return router.push('/login');
                }
                //
                if (!res.ok) {
                    throw new Error('Failed to fetch payment intent');
                }
                return res.json();
    
            }).then((data) => {
                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            }).catch((error) => {
                setError(true);
                console.log("Error", error);
                toast.error('Failed to fetch payment intent');
            });
        }
    }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]); //

    // Options for Stripe Elements
    const options: StripeElementsOptions = {
        clientSecret,
        appearance:{
            theme: 'stripe',
            labels: 'floating',
        },
    };

    // Function to handle setting payment success
    const handleSetPaymentSuccess = useCallback((value: boolean)=>{
        setPaymentSuccess(value);
    },[]);

    // Render the CheckoutClient component
    return (<div className="W-full ">
        {/* Render CheckoutForm within Elements component */}
            {paymentIntent && clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <Container>
                        <CheckoutForm clientSecret={clientSecret}  handleSetPaymentSuccess={handleSetPaymentSuccess}/>
                    </Container>
                </Elements>
            )}

            {/* Loading indicator */}
            {loading && <div className="text-center ">Loading Checkout...</div>}
            {/* Error message */}
            {error && <div className="text-center text-rose-600">Something went wrong</div>}

            {/* Payment success message */}
            {paymentSuccess && 
            <div className="flex items-center flex-col gap-4">
                <div className=" text-teal-500 text-center">Payment Success</div>
                <div className="max-w-[220px] w-full">
                    <Button label="View Your Order" onClick={()=> router.push('/orders')}/>
                </div>
            </div>}
        </div>
    );
  
};

export default CheckoutClient;