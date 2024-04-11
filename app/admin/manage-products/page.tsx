export const revalidate=0; 

import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

// Define ManageProducts component
const ManageProducts = async() => {

  // Fetch products using getProducts function
  const products = await getProducts({category: null});

  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role!='ADMIN'){
    return <NullData title='Oops! Access denied'/>;
  }

  // Render ManageProducts component
  return (
  <div className="pt-8">
    <Container>
      {/* Render ManageProductsClient component with fetched products */}
      <ManageProductsClient products = {products}/>
    </Container>
  </div>);
};

export default ManageProducts; // Export ManageProducts component
