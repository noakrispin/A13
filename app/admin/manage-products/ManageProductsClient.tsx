"use client";

// Import necessary modules and components
import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrices } from "@/Utils/formatPrices";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {MdCached,MdClose,MdDelete,MdDone,MdRemoveRedEye} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { JSX, useCallback, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";



// Define interface for props
interface ManageProductsClientProps {
  products: Product[]; // Array of products
}

// Functional component for managing products
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({products,}) => {
  const router = useRouter(); // Initialize useRouter hook
  const storage = getStorage(firebaseApp); // Initialize Firebase storage
  let rows: any = []; // Initialize rows variable for DataGrid

  let isDarkModeEnabled = false;
  let darkMode = false;

  if (typeof window !== 'undefined') {
      isDarkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode = isDarkModeEnabled ;
  }

   // Populate rows with product data
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrices(product.price),
        category: product.category,
        artistName: product.Artist_Name,
        inStock: product.inStock,
        image: product.images,
      };
    });
  }

  // Define columns for DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-violet-500'">{params.row.price}</div>
        );
      },

    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "artistName", headerName: "Artist Name", width: 100},
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-black"
              />
            ) : (
              <Status
                text="out of stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-black"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`); ///
              }}
            />
          </div>
        );
      },
    },
  ];

   // Function to handle toggling product stock status
  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put(`/api/product/${id}`, { ////
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! Something went wrong");
        console.log(err);
      });
  }, [router]); // Include router in the dependency array

  // Function to handle deleting a product
  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleting product, please wait!");

    // Function to handle deleting images associated with the product
    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("image deleted", item.image);
          }
        }
      } catch (error) {
        return console.log("Deleting images error", error);
      }
    };

    await handleImageDelete(); // Delete images associated with the product

    // Delete the product from the database
    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete product");
        console.log(err);
      });
  }, [router,storage]); // Include router and storage in the dependency array

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root {
        color: white;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  // Render the component
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ height: 600, width: "100%", backgroundColor: darkMode ? '#222' : '#a488bf' }}>
      <DataGrid
    rows={rows}
    columns={columns}
    style={{ color: 'white' }}
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

export default ManageProductsClient; // Export the component
