"use client";

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

interface ManageOrdersClientProps {
    orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
    user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
    const router = useRouter();
    let rows: any = [];

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

    const handleDispatch = useCallback((id: any) => {
        axios
            .put("/api/order", {
                id,
                deliveryStatus: "dispatched",
            })
            .then(() => {
                toast.success("Order Dispatched");
                router.refresh();
            })
            .catch((err) => {
                toast.error("Oops! Something went wrong");
                console.error(err);
            });
    }, [router]);

    const handleDeliver = useCallback((id: any) => {
        axios
            .put("/api/order", {
                id,
                deliveryStatus: "delivered",
            })
            .then(() => {
                toast.success("Order Delivered");
                router.refresh();
            })
            .catch((err) => {
                toast.error("Oops! Something went wrong");
                console.error(err);
            });
    }, [router]);

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

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8 ">
                <Heading title="Manage Orders" center />
            </div>
            <div style={{ height: 600, width: "100%"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    style={{ color: 'white' }} // Make all text in DataGrid white
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
                            color: 'white', // Make all row text white
                        },
                        '& .MuiDataGrid-columnHeader': {
                            color: 'white', // Make all column header text white
                        },
                        '& .MuiDataGrid-footerContainer, & .MuiTablePagination-toolbar': {
                         color: 'white',
                     },
                     // Apply white color to the selected row count footer text
                     '& .Mui-selected': {
                         color: 'white',
                     },
                     // Apply white color to pagination controls and rows per page text
                     '& .MuiTablePagination-select, & .MuiTablePagination-selectLabel': {
                         color: 'white',
                     },
                    }}
                />
            </div>
        </div>
    );
};

export default ManageOrdersClient;
