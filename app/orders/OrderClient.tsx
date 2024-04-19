"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrices } from "@/Utils/formatPrices";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { JSX, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

interface OrdersClientProps {
    orders: ExtendedOrder[];
}

// Define ExtendedOrder type to include both Order and User data
type ExtendedOrder = Order & {
    user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
    const router = useRouter();


    // Determine if dark mode is enabled based on the user's preference
    let isDarkModeEnabled = false;
    let darkMode = false;

    if (typeof window !== 'undefined') {
        isDarkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
        darkMode = isDarkModeEnabled ;
    }


    // Initialize rows array to store order data for the DataGrid component
    let rows: any = [];

    // Populate rows array with order data
    if (orders) {
        rows = orders.map((order) => ({
            id: order.id,
            customer: order.user.name,
            amount: formatPrices(order.amount / 100),
            paymentStatus: order.status,
            date: moment(order.createDate).fromNow(),
            deliveryStatus: order.deliveryStatus,
        }));
    }

    // Define columns for the DataGrid
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220},
        { field: "customer", headerName: "Customer Name", width: 130},
        // Define column for amount with custom rendering
        {
            field: "amount",
            headerName: "Amount (USD)",
            width: 130,
            renderCell: (params) => <div className="font-bold text-slate-800">{params.row.amount}</div>,
        },
         // Define column for payment status with custom rendering
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            width: 130,
            renderCell: (params) => {
                return(
                    <div>
                        {/* Render payment status based on order status */}
                        {params.row.paymentStatus === "pending" ? (
                            <Status
                                text="pending"
                                icon={MdAccessTimeFilled}
                                bg="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.paymentStatus === "complete" ? (
                            <Status
                                text="complete"
                                icon={MdDone}
                                bg="bg-green-200"
                                color="text-green-700"
                            />
                        ) : null}
                    </div>
                );
            },
        },
        // Define column for delivery status with custom rendering
        {
            field: "deliveryStatus",
            headerName: "Delivery Status",
            width: 130,
            renderCell: (params) => {
                return(
                    <div>
                        {/* Render delivery status based on order delivery status */}
                        {params.row.deliveryStatus === "pending" ? (
                            <Status
                                text="pending"
                                icon={MdAccessTimeFilled}
                                bg="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.deliveryStatus === "dispatched" ? (
                            <Status
                                text="dispatched"
                                icon={MdDeliveryDining}
                                bg="bg-purple-200"
                                color="text-purple-700"
                            />
                        ) : params.row.deliveryStatus === "delivered" ? (
                            <Status
                                text="delivered"
                                icon={MdDone}
                                bg="bg-green-200"
                                color="text-green-700"
                            />
                        ) : null}
                    </div>
                );
            },
        },
        {
            field: "date",
            headerName: "Date",
            width: 130,
        },
        // Define column for actions with custom rendering
        {
            field: "action",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <div className="flex justify-between gap-4 w-full">
                    <ActionBtn
                        icon={MdRemoveRedEye}
                        onClick={() => router.push(`/order/${params.row.id}`)}
                        
                    />
                </div>
            ),
        },
    ];

    // Custom checkbox component for the DataGrid
    const CustomWhiteCheckbox = (props: JSX.IntrinsicAttributes & CheckboxProps) => (
        <Checkbox
            {...props}
            sx={{
                color: 'black', // Checkbox color when not checked
                '&.Mui-checked': {
                    color: 'black', // Checkbox color when checked
                },
            }}
        />
    );

    return (
        <div className={`max-w-[1150px] m-auto text-xl `}>
            <div className="mb-4 mt-8">
                <Heading title="Manage Orders" center />
            </div>
            <div style={{ height: 600, width: "100%", backgroundColor: darkMode ? '#222' : '#a488bf' }}>
                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 9 },
                },
                }}
                pageSizeOptions={[9, 20]}
                checkboxSelection
                disableRowSelectionOnClick
                components={{
                    BaseCheckbox: CustomWhiteCheckbox,
                }}
                sx={{
                    '& .MuiDataGrid-row': {
                        color:  'black', // Set row text color based on mode
                    },
                    '& .MuiDataGrid-columnHeader': {
                        color: darkMode ? 'white' : 'black', // Set header text color based on mode
                        backgroundColor: darkMode ? '#222' : '#a488bf', // Adjust header background color
                    },
                    '& .MuiDataGrid-footerContainer, & .MuiTablePagination-toolbar': {
                        color:  'black',
                    },
                    '& .Mui-selected': {
                        color:'black',
                    },
                    '& .MuiTablePagination-select, & .MuiTablePagination-selectLabel': {
                        color:'black',
                    },
                }}
                />
            </div>
        </div>
    );
};

export default OrdersClient;
