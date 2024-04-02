'use client'

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const CheckoutClient = () => {

    const {cartProducts, paymentIntent,handleSetPaymentIntent} = useCart();
    const [loading, setLoading] = useState(false);
    const[error, setError]= useState(false);
    const router=useRouter();
    const[clientSecret, SetClientSecret] = useState();

    useEffect(()=> {
        //create a paymentintnt as soon as the page loads
        if(cartProducts){
            setLoading(true);
            setError(false);

            fetch('/api/creat-payment-intent',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                })
            }).then((res)=>{
                setLoading(false);
                if(res.status == 401){
                    return router.push('/login');
                }

                return res.json();

            }).then((data)=> {
                SetClientSecret(data.paymentIntent.clinet_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            }).catch((error)=>{
                setError(true);
                console.log("Error",error);
                toast.error('Something went wrong');
            });
        }

    },[cartProducts,paymentIntent])
  return (
    <div>CheckoutClient</div>
  )
}

export default CheckoutClient;