import getCurrentUser from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterFrom from "./RegisterFrom";


const Register = async () => {

  const currentUser = await getCurrentUser(); 

  return ( 
  <Container>
    <FormWrap>
        <RegisterFrom currentUser={currentUser}/>

    </FormWrap>
  </Container>
  );
}

export default Register; 