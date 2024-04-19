export const revalidate=0; 

// Importing necessary modules and components
import Container from "@/app/components/Container";
import ManageOrdersClient from "./ManageOrdersClient";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";

// Define the ManageOrders functional component
const ManageOrders = async () => {
  // Retrieve orders and current user
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  // If there is no current user or the current user is not an admin, render NullData component
  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  // Render ManageOrdersClient component with orders
  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

// Export the ManageOrders component
export default ManageOrders;
