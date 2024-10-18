import Container from "../Components/Container";
import FormWrap from "../Components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const CheckoutPage = () => {
    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckoutClient/>
                </FormWrap>
            </Container>
        </div>
    );
};

export default CheckoutPage;