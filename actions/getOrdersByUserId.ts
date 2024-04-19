// Importing Prisma for database operations
import prisma from "@/libs/prismadb";

// Function to retrieve orders by user ID
export default async function getOrdersByUserId(userId: string) {
  try {
    // Retrieving orders associated with the given user ID from the database
    const orders = await prisma.order.findMany({
      include: {
        user: true, // Including associated user details with each order
      },
      orderBy: {
        createDate: "desc", // Ordering the results by create date in descending order
      },
      where: {
        userId: userId, // Filtering orders by the given user ID
      },
    });
     // Returning the retrieved orders
    return orders;
  } catch (error: any) {
    // If an error occurs, throw an error
    throw new Error(error);
  }
}
