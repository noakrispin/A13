export const revalidate=0; 

import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import ProductsCard from "./components/products/ProductsCard";
import getProducts, { IProductParams } from '@/actions/getProducts';
import NullData from './components/NullData';


interface HomeProps{
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

  if(products.length == 0){
    return <NullData title='Oops! No products found. Click "All" to clear filters' />
  }

  /*
  function shuffleArray(array: any){
    for(let i=array.length-1; i>0 ;i--){
      const j=Math.floor(Math.random()*(i+1));
      [array[i],array[j]=[array[j],array[i]]]
    }
    return array
  }

  const shuffledProducts = shuffleArray(products)
  */
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6">
          {products.map((product: any, index: number) => (
            <ProductsCard key={index} data={product} />
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



