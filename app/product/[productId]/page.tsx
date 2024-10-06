import Container from '@/app/Components/Container';
import { product } from '../../../../utils/procuct'
import ProductDetails from './ProductDetails';

interface IPrams {
    productId?: string;
}

const page = ({params} : {params: IPrams}) => {
    console.log(params);

    return (
        <div className='p-8'>
           <Container>
            <ProductDetails product ={product}></ProductDetails>
           </Container>
        </div>
    );
};

export default page;