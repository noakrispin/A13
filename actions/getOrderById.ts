// Importing Prisma for database operations
import prisma from "@/libs/prismadb";

// Defining interface for function parameters
interface IParams {
  orderId?: string; // Optional parameter: orderId
}

// Function to retrieve an order by its ID
export default async function getOrderById(params: IParams) {
  try {
    // Destructuring orderId from params
    const { orderId } = params;
    // Retrieving the order from the database using Prisma
    const order = await prisma.order.findUnique({
      where: {
        id: orderId, // Searching for the order by its ID
      },
    });

    // If the order is not found, return null
    if (!order) return null;
    // If the order is found, return it
    return order;
  } catch (error: any) {
    // If an error occurs, throw an error
    throw new Error(error);
  }
}
