export const revalidate=0; 

// Import statements for dependencies
import getCurrentUser from "@/actions/getCurrentUser";
import Container from "../components/Container";
import CartClient from "./CartClient";

// Defining an asynchronous function named Cart
const Cart =  async()=> { 

  // Asynchronously retrieving the current user
  const currentUser= await getCurrentUser();

  // Returning JSX for rendering
  return (
    <div
    className="pt-8">
      {/* Wrapping the CartClient component in a Container component */}
      <Container>
        {/* Passing the currentUser object as a prop to the CartClient component */}
        <CartClient currentUser={currentUser}/>
      </Container>
    </div>
  );
};

// Exporting the Cart function as the default export of this module
export default Cart;