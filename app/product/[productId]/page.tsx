import Container from '@/app/Components/Container';
import ProductDetails from './ProductDetails';
import ListRatings from './ListRatings';
import { products } from '@/utils/products';

interface IPrams {
    productId?: string;
}

const page = ({params} : {params: IPrams}) => {
    console.log(params);

    const product = products.find((item) => item.id === params.productId)
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