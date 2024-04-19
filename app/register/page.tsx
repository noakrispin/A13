export const revalidate=0; 

import getCurrentUser from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterFrom from "./RegisterFrom";


const Register = async () => {
  // Fetch the current user
  const currentUser = await getCurrentUser(); 

  // Render the registration form component with the fetched current user data
  return ( 
  <Container>
    <FormWrap>
        <RegisterFrom currentUser={currentUser}/> {/* Passed currentUser as props to RegisterForm component */}

    </FormWrap>
  </Container>
  );
}

export default Register; 