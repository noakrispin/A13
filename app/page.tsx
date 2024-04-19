
export const revalidate=0; 

// Import necessary components and functions
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import ProductsCard from "./components/products/ProductsCard";
import getProducts, { IProductParams } from '@/actions/getProducts';
import NullData from './components/NullData';

// Define the interface for the HomeProps
interface HomeProps {
  searchParams: IProductParams // Search parameters for fetching products
}

// Define the Home component as an asynchronous function
export default async function Home({ searchParams }: HomeProps) {
  // Fetch products based on the search parameters
  const products = await getProducts(searchParams)

  // If no products are found, display a message
  if (products.length === 0) {
    return <NullData title='Oops! No products found. Click "All" to clear filters' />
  }

  // Render the home page layout
  return (
    <div className="p-8">
      {/* Container component to provide layout structure */}
      <Container>
        <div>
          {/* Render the HomeBanner component */}
          <HomeBanner />
        </div>
        {/* Grid layout to display products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6">
          {/* Map through the products and render a ProductsCard component for each */}
          {products.map((product: any, index: number) => (
            <ProductsCard key={index} data={product} />
          ))}
        </div>
        {/* Additional grid section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6">
          {/* Add content for the additional grid here */}
        </div>
      </Container>
    </div>
  );
}
