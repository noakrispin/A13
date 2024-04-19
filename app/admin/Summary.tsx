'use client';

// Importing necessary modules and components
import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrices } from "@/Utils/formatPrices";
import { formatNumber } from "@/Utils/formatNumber";

// Define the props for the Summary component
interface SummaryProps{
    orders: Order[];
    products: Product[];
    users: User[]
}

// Define the type for summary data
type SummaryDataType = {
    [key: string]:{
        label: string;
        digit: number;
    };
}

// Define the Summary functional component
const Summary:React.FC<SummaryProps> = ({orders, products, users}) => {
    // State variable to store summary data
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale:{
            label: 'Total Sale',
            digit: 0
        },
        products:{
            label: 'Total Products',
            digit: 0
        },
        orders:{
            label: 'Total Orders',
            digit: 0
        },
        paidOrders:{
            label: 'Paid Orders',
            digit: 0
        },
        unpaidOrders:{
            label: 'Unpaid Orders',
            digit: 0
        },
        users:{
            label: 'Total Users',
            digit: 0
        },
    });

    // useEffect hook to update summary data when orders, products, or users change
    useEffect(()=>{
        setSummaryData((prev) => {
            let tempData = {...prev}

            // Calculate total sale
            const totalSale = orders.reduce((acc,item) =>{
                if(item.status === 'complete'){
                    return acc + item.amount
                }else return acc
            }, 0);

            // Filter paid and unpaid orders
            const paidOrders = orders.filter((order =>{
                return order.status === 'complete'
            }));

            const unpaidOrders = orders.filter((order =>{
                return order.status === 'pending'
            }));

            // Update summary data
            tempData.sale.digit = totalSale;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;           

            return tempData
        })
    },[orders, products, users]);

    // Extract keys from summaryData object
    const summaryKeys = Object.keys(summaryData);

    // Render the Summary component
    return ( <div className="max-w-[1150px] m-auto">
        <div className="mb-4 mt-8">
            <Heading title="Summary" center/>
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
            {
                summaryKeys && summaryKeys.map((key) =>{
                    return <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition ">
                        <div className="text-xl md:text-4xl font-bold ">
                            {/* Conditionally format the summary digit based on the label */}
                            {
                                summaryData[key].label === 'Total Sale' ? <>{formatPrices(summaryData[key].digit)}</> : <>{formatNumber(summaryData[key].digit)}</>
                            }
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                })
            }
        </div>
    </div> );
}
 
export default Summary;