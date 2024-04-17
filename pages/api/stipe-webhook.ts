import { buffer } from "micro"
import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

// Disable body parsing for the API route
export const config={
    api:{
        bodyparser: false
    }
}

// Initialize the Stripe client with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
 apiVersion: '2023-10-16'    // Specify the Stripe API version
});

// Define the API route handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Extract the Stripe signature from request headers
    const sig = req.headers['stripe-signature'];

    // If signature is missing, return a 400 error
    if(!sig){
        return res.status(400).send('Missing the stripe signature');
    }
    let event: Stripe.Event;

    try {

        // Read the raw request body
        const rawBody = await buffer(req);

        // Verify the Stripe signature and construct the event
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        // If an error occurs during webhook verification, return a 400 error
        return res.status(400).send("Webhook error"+ err);
    }

    // Handle different types of Stripe webhook events
    switch (event.type) {
        case 'charge.succeeded':
            // If a charge succeeds, update the corresponding order status
            const charge: any = event.data.object as Stripe.Charge

            // Check if the payment intent is a string
            if(typeof charge.payment_intent == 'string'){
                // Update the order status to 'complete' and set the shipping address
                await prisma?.order.update({
                    where: {paymentIntentId: charge.payment_intent},
                    data: {status: 'complete', address: charge.shipping?.address},
                })
            }
            break;
    
        default:
            console.log('Unhandled event type:' + event.type);
    }

    // Return a JSON response indicating successful receipt of the webhook event
    res.json({received: true});
}