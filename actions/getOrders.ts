// Import Prisma for database interaction
import prisma from '@/libs/prismadb';

// Async function to retrieve orders from the database
export default async function getOrders() {
    try {
        // Retrieve orders from the database using Prisma's findMany method
        const orders = await prisma.order.findMany({
            // Include related user information for each order
            include: {
                user: true
            },
            // Order the orders by creation date in descending order
            orderBy: {
                createDate: 'desc'
            }
        });

        // Return the retrieved orders
        return orders;
    } catch (error: any) {
        // Throw an error if the database operation fails
        throw new Error(error);
    }
}
