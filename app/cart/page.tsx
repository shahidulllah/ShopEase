import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../Components/Container";
import CartClient from "./CartClient";


const CartPage = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div className="pt-8 min-h-screen">
            <Container>
                <CartClient currentUser={currentUser}/>
            </Container>
        </div>
    );
};

export default CartPage;