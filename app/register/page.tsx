import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../Components/Container";
import FormWrap from "../Components/FormWrap";
import RegisterForm from "./RegisterForm";

const RegisterPage = async () => {
    const currentUser = await getCurrentUser();
    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={currentUser}/>
            </FormWrap>
        </Container>
    );
};

export default RegisterPage;