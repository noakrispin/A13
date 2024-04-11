'use client';

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


const CheckoutClient = () => {

    const {cartProducts, paymentIntent,handleSetPaymentIntent} = useCart();
    const [loading, setLoading] = useState(false);
    const[error, setError]= useState(false);
    const router=useRouter();
    
    const[clientSecret, setClientSecret] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    console.log("paymentintnt",paymentIntent);
    console.log("clientSecret",clientSecret);

    useEffect(() => {
        if (cartProducts) {
            setLoading(true);
            setError(false);
    
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

    const options: StripeElementsOptions = {
        clientSecret,
        appearance:{
            theme: 'stripe',
            labels: 'floating',
        },
    };


    const handleSetPaymentSuccess = useCallback((value: boolean)=>{
        setPaymentSuccess(value);
    },[]);

    return (<div className="W-full ">
            {paymentIntent && clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <Container>
                        <CheckoutForm clientSecret={clientSecret}  handleSetPaymentSuccess={handleSetPaymentSuccess}/>
                    </Container>
                </Elements>
            )}

            {loading && <div className="text-center text-white">Loading Checkout...</div>}
            {error && <div className="text-center text-rose-600">Something went wrong</div>}

            {paymentSuccess && 
            <div className="flex items-center flex-col gap-4">
                <div className=" text-teal-500 text-center">Payment Success</div>
                <div className="max-w-[220px] w-full">
                    <Button label="View Your Order" onClick={()=> router.push('/order')}/>
                </div>
            </div>}
        </div>
    );
  
};

export default CheckoutClient;