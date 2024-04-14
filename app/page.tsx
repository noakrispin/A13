export const revalidate=0; 

import { useTheme } from 'next-themes'; // Import useTheme hook
import { products } from "@/Utils/products";
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import ProductsCard from "./components/products/ProductsCard";
import NavCategory from "./components/nav/CategoryNav";
import getProducts, { IProductParams } from '@/actions/getProducts';
import NullData from './components/NullData';


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pazfayer:23N3mw1XOtbtl3Ld@cluster0.uxbsomu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

interface HomeProps{
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

  if(products.length == 0){
    return <NullData title='Oops! No products found. Click "All" to clear filters' />
  }

  function shuffleArray(array: any){
    for(let i=array.length-1; i>0 ;i--){
      const j=Math.floor(Math.random()*(i+1));
      [array[i],array[j]=[array[j],array[i]]]
    }
    return array
  }

  const shuffledProducts = shuffleArray(products)
  
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        {/*Button for category */}
        <div>
          <NavCategory/>
        </div> 

        <div className="text-2xl border-b-[1px] border-violet-500 py-3 flex justify-between gap-4"> 
          Best of 2024 
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6">
          {shuffledProducts.map((product: any) => (
            <ProductsCard key={product.id} data={product} />
          ))}
        </div>

        {/* Add another grid for additional content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6">
          {/* Add content for the additional grid here */}
        </div>
      </Container>
    </div>
  );
}



