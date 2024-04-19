export const revalidate=0; 
// Importing necessary modules and components
import React from 'react';
import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from '@/actions/getOrderById';
import NullData from '@/app/components/NullData';


interface IParams {
    orderId?: string;
};
// Define the Order functional component
const Order = async ({ params }: { params: IParams }) => {
    // Fetching order data based on the orderId from the params
    const order = await getOrderById(params); 

    // If no order is found, display a message
    if (!order) {
        return <NullData title='No order'></NullData>
    }
    return (
        <div className="p-16"> {/* Adjusted padding */}
            <Container>
                 {/* Render orderDetails if order is found, otherwise show a message */}
                <OrderDetails order={order} />
            </Container>
        </div>
    );
};

export default Order;
