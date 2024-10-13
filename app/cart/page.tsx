import Container from "../Components/Container";
import CartClient from "./CartClient";


const CartPage = () => {
    return (
        <div className="pt-8 min-h-screen">
            <Container>
                <CartClient/>
            </Container>
        </div>
    );
};

export default CartPage;