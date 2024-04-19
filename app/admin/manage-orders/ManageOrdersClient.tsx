"use client";

// Importing necessary modules and components
import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrices } from "@/Utils/formatPrices";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { JSX, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

// Interface for props of ManageOrdersClient component
interface ManageOrdersClientProps {
    orders: ExtendedOrder[]; // Orders array with extended properties
}

// ExtendedOrder type extending Order type with additional user property
type ExtendedOrder = Order & {
    user: User;// User associated with the order
};

// Define the ManageOrdersClient functional component
const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
    const router = useRouter(); // Initialize useRouter hook from Next.js
    let rows: any = []; // Initialize rows variable

    let isDarkModeEnabled = false; // Initialize isDarkModeEnabled variable
    let darkMode = false; // Initialize darkMode variable

     // Check if window is available to determine if dark mode is enabled
    if (typeof window !== 'undefined') {
        isDarkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
        darkMode = isDarkModeEnabled ;// Set darkMode to isDarkModeEnabled
    } 

    // Map orders to rows array with required properties
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

    // Define columns for DataGrid
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "customer", headerName: "Customer Name", width: 130 },
        {
            field: "amount",
            headerName: "Amount (USD)",
            width: 130,
            renderCell: (params) => <div className="font-bold">{params.row.amount}</div>,
        },
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            width: 130,
            renderCell: (params) => (
                <div>
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
            ),
        },
        {
            field: "deliveryStatus",
            headerName: "Delivery Status",
            width: 130,
            renderCell: (params) => (
                <div>
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
            ),
        },
        {
            field: "date",
            headerName: "Date",
            width: 130,
        },
        {
            field: "action",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <div className="flex justify-between gap-4 w-full">
                    <ActionBtn
                        icon={MdDeliveryDining}
                        onClick={() => handleDispatch(params.row.id)}
                    />
                    <ActionBtn
                        icon={MdDone}
                        onClick={() => handleDeliver(params.row.id)}
                    />
                    <ActionBtn
                        icon={MdRemoveRedEye}
                        onClick={() => router.push(`/order/${params.row.id}`)}
                    />
                </div>
            ),
        },
    ];

     // Function to handle dispatching an order
    const handleDispatch = useCallback((id: any) => {
        axios
            .put("/api/order", {
                id,
                deliveryStatus: "dispatched",
            })
            .then(() => {
                toast.success("Order Dispatched");
                router.refresh(); // Refresh the page after dispatching the order
            })
            .catch((err) => {
                toast.error("Oops! Something went wrong"); // Display error toast if request fails
                console.error(err); // Log the error to console
            });
    }, [router]);

    // Function to handle delivering an order
    const handleDeliver = useCallback((id: any) => {
        axios
            .put("/api/order", {
                id,
                deliveryStatus: "delivered",
            })
            .then(() => {
                toast.success("Order Delivered"); // Display success toast if delivery is successful
                router.refresh(); // Refresh the page after delivering the order
            })
            .catch((err) => {
                toast.error("Oops! Something went wrong"); // Display error toast if request fails
                console.error(err); // Log the error to console
            });
    }, [router]);

    // Custom Checkbox component with white color
    const CustomWhiteCheckbox = (props: JSX.IntrinsicAttributes & CheckboxProps) => (
        <Checkbox
            {...props}
            sx={{
                color: 'white', // Checkbox color when not checked
                '&.Mui-checked': {
                    color: 'white', // Checkbox color when checked
                },
            }}
        />
    );

    // Render the ManageOrdersClient component
    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8 ">
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
// Export the ManageOrdersClient component
export default ManageOrdersClient;
