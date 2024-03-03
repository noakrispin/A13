import { products } from "@/Utils/products";
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import { truncateText } from "@/Utils/truncateText";
import ProductsCard from "./components/products/ProductsCard";


export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className="grid grid-cols-2
        sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        2xl:grid-cols-6 gap-8">
          {products.map((products: any) => {
          return <ProductsCard key={products.id} data={products}/>;
        })}
        </div>
      </Container>
    </div>
  );

}

