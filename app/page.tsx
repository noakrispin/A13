export const revalidate=0; 

import { products } from "@/Utils/products";
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import { truncateText } from "@/Utils/truncateText";
import ProductsCard from "./components/products/ProductsCard";
import { category } from "@/Utils/category";
import Button from "./components/Button";
import NavCategory from "./components/nav/NavCategory";


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
        {/*Buttom for category */}
        <div>
          <NavCategory/>
        </div >

        <div className=" text-white text-2xl
         border-b-[1px] border-violet-500 py-3 flex justify-between gap-4"> 
          Best of 2024 
        </div>

        <div className="grid grid-cols-2
        sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        2xl:grid-cols-6 gap-8 mt-6">
        {products.map((products: any) => {
        return <ProductsCard key={products.id} data={products}/>;
        })}
        </div>

        <div className=" text-white text-2xl
         border-b-[1px] border-violet-500 py-3 flex justify-between gap-4"> 
          Best sellers 
        </div>

        <div className="grid grid-cols-2
        sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        2xl:grid-cols-6 gap-8 mt-6">
        {/* {products.map((products: ) => {
        return <ProductsCard key={products.id} data={products}/>;
        })} */}
        </div>
      </Container>
    </div>
  );
}



