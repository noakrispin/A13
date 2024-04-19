// Importing necessary modules and configurations
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

// Function to retrieve the current session
export async function getSession() {
  return await getServerSession(authOptions); // Getting the server session using provided authentication options
}

// Default function to get the current user
export default async function getCurrentUser() {
  try {
     // Retrieving the current session
    const session = await getSession();
   
    // Checking if the user's email is present in the session
    if (!session?.user?.email) {
      return null;// If email is not present, return null
    }
    
    // Retrieving the current user from the database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email, // Finding the user by email
      },
      include:{orders:true}, // Including associated orders with the user
    });

     // If the current user is not found, return null
    if (!currentUser) {
      return null;
    }

    // Formatting and returning the current user data
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updateAt: currentUser.updateAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.log(error); // Logging any errors that occur
    return null;
  }
}
