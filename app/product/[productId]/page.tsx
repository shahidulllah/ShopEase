import Container from '@/app/Components/Container';
import { product } from '../../../../utils/procuct'
import ProductDetails from './ProductDetails';
import ListRatings from './ListRatings';

interface IPrams {
    productId?: string;
}

const page = ({params} : {params: IPrams}) => {
    console.log(params);

    return (
        <div className='p-8'>
           <Container>
            <ProductDetails product ={product}></ProductDetails>

            <div className='flex flex-col mt-20 gap-4'>
                <div>Add Ratings</div>
                <ListRatings product={product}></ListRatings>
            </div>
           </Container>
        </div>
    );
};

export default page;