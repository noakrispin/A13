'use client';

// Importing necessary modules and components
import { formatPrices } from "@/Utils/formatPrices";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { Order } from "@prisma/client"
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

// Define the OrderDetails functional component
interface OrderDetailsProps{
    order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {

    //const router= useRouter();
    return (
        <div className="max-w-[1150px] m-auto flex flex-col gap-2">
            {/* Heading for order details */}
            <div className="mt-8"> 
                <Heading title="Order Details"/>
            </div>
            {/* Order ID */}
            <div> Order ID: {order.id}</div>
            {/* Total Amount */}
            <div> Total Amount: {" "}
                <span className="font-bold">{formatPrices(order.amount)}</span>
            </div>
            <div className=" flex gap-2 items-center">
                {/* Payment Status */}
                <div>Payments Status:</div>
                <div>
                    {/* Displaying payment status based on order status */}
                    {order.status == 'pending'? (<Status 
                    text='pending'
                    icon={MdAccessTimeFilled}
                    bg="bg-slate-200"
                    color="text-slate-700" ///
                    />
                    ): order.status == 'complete' ? (<Status 
                    text='completed'
                    icon={MdDone}
                    bg="bg-green-200"
                    color="text-slate-700" ///
                    />
                    ): <></>}
                </div>
            </div>
            {/* Delivery Status */}
            <div className=" flex gap-2 items-center">
                <div>Delivery Status:</div>
                <div>
                    {/* Displaying delivery status based on order deliveryStatus */}
                    {order.deliveryStatus == 'pending'? (<Status 
                    text='pending'
                    icon={MdAccessTimeFilled}
                    bg="bg-slate-200"
                    color="text-slate-700" ///
                    />
                    ): order.deliveryStatus == 'dispatched' ? (<Status 
                    text='dispatched'
                    icon={MdDeliveryDining}
                    bg="bg-purple-200"
                    color="text-slate-700" ///
                    />
                    ) : order.deliveryStatus == 'delivered' ? (<Status 
                        text='delivered'
                        icon={MdDone}
                        bg="bg-green-200"
                        color="text-slate-700" ///
                        />
                        ) : (
                        <></>)}
                </div>
            </div>
            {/* Date */}
            <div> Date: {moment (order.createDate).fromNow()}</div>
            <div>
                {/* Products ordered */}
                <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
                {/* Table headers */}
                <div className=" grid grid-cols-4 text-xs gap-4 pb-2 items-center">
                    <div className=" col-span-2 justify-self-start">PRODUCT</div>
                    <div className=" justify-self-center">PRICE</div>
                    <div className=" justify-self-end">TOTAL</div>
                </div>
                {/* Mapping through order products and rendering OrderItem component */}
                {order.products && order.products.map(item =>{
                    return <OrderItem key={item.id} item={item}></OrderItem>
                })}
            </div>


        </div>
    );
};

export default OrderDetails;