export const revalidate=0; 
import { products } from "@/Utils/products";
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import ProductsCard from "./components/products/ProductsCard";
import NavCategory from "./components/nav/CategoryNav";


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

export default function Home() {
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

        <div className="text-white text-2xl border-b-[1px] border-violet-500 py-3 flex justify-between gap-4"> 
          Best of 2024 
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6">
          {products.map((product: any) => (
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



