export const revalidate=0; 

import Container from "@/app/components/Container";
import OrderClinent from "./OrderClient";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async () => {
  // Fetch the current user
  const currentUser = await getCurrentUser();
  // If no current user is found, display an error message
  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }

  // Fetch orders for the current user
  const orders = await getOrdersByUserId(currentUser.id);
  // If no orders are found for the current user, display a message indicating no orders
  if (!orders) {
    return <NullData title="No Orders yet..." />;
  }

  // Render the orders component with the fetched orders
  return (
    <div className="pt-8">
      <Container>
        <OrderClinent orders={orders} /> {/* Passed fetched orders as props to OrderClient component */}
      </Container>
    </div>
  );
};

export default Orders;
