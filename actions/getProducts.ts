// Import Prisma for database interactio
import prisma from "@/libs/prismadb"; 

// Define interface for product parameters
export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

// Async function to retrieve products based on provided parameters
export default async function getProducts(params: IProductParams) {
  try {
    // Destructure category and searchTerm from params object
    const { category, searchTerm } = params;
    // Initialize searchString with searchTerm or empty string if not provided
    let searchString = searchTerm || '';

    if (!searchTerm) {
      searchString = "";
    }
    
    // Initialize query object for filtering products
    let query: any = {};

    // If category is provided, add it to the query object
    if (category) {
      query.category = category;
    }
    // Retrieve products from the database using Prisma's findMany method
    const products = await prisma.product.findMany({
      where: {
        // Filter products based on category and search string
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      // Include related reviews for each product
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createDate: "desc",
          },
        },
      },
    });

    // Return the retrieved products
    return products;
  } catch (error: any) {
    // Throw error if database operation fails
    throw new Error(error);
  }
}
