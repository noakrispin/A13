export const revalidate=0; 

// Import necessary dependencies
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

// Define AddProducts component

const AddProducts = async () => {

  const currentUser = await getCurrentUser();
  
  if(!currentUser || currentUser.role!='ADMIN'){
    return <NullData title='Oops! Access denied'/>;
  }

  // Render AddProducts component
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          {/* Render AddProductForm component */}
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts; // Export AddProducts component
