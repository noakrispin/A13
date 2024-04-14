export const revalidate=0; 

import Container from "@/app/components/Container";
import OrderClinent from "./OrderClient";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No Orders yet..." />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrderClinent orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
