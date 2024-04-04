import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";


const Checkout = () => {
  return (
    <div className="p-8 text-white">
        <Container>
            <FormWrap>
                <CheckoutClient/>
            </FormWrap>
        </Container>
    </div>
  )
}

export default Checkout;