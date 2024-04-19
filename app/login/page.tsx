export const revalidate=0; 

// Importing necessary modules and components
import getCurrentUser from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";


// Define the Login functional component
const Login = async () => {
  // Fetch current user information
  const currentUser = await getCurrentUser();
  // Render the Login component
  return ( 
  <Container>
    <FormWrap>
        <LoginForm currentUser={currentUser} />
    </FormWrap>
  </Container>
  );
}

export default Login; 