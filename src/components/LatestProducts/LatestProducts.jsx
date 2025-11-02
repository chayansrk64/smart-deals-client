import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({latestProductsPromise}) => {

    const latestProducts = use(latestProductsPromise)
    // console.log(latestProducts);

    return (
        <div className='w-11/12 mx-auto py-6'>
            <h3>Recent Products</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    latestProducts.map(product => <Product product={product} key={product._id}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;