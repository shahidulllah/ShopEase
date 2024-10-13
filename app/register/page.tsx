import Container from "../Components/Container";
import FormWrap from "../Components/FormWrap";
import RegisterForm from "./RegisterForm";

const page = () => {
    return (
        <Container>
            <FormWrap>
                <RegisterForm/>
            </FormWrap>
        </Container>
    );
};

export default page;