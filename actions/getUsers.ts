// Importing Prisma for database operations
import prisma from '@/libs/prismadb';

// Function to retrieve all users from the database
export default async function getUsers() {
    try {
        // Retrieving all users from the database using Prisma
        const users = await prisma.user.findMany();
        // Returning the retrieved users
        return users;
    } catch (error: any) {
        // If an error occurs, throw an error
        throw new Error(error);
    }
}
