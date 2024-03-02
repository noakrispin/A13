
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/Utils/product";

interface IParams {
    productId?: string;
}

export const Product = ({ params }: { params: IParams }) => {
    console.log('params', params);
    return (
        <div>
            <Container>
                <ProductDetails product={product}/>
            </Container>
        </div>

    );
};

export default Product;
