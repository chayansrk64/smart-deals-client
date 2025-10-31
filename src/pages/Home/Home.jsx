import React, { Suspense } from 'react';
import LatestProducts from '../../components/LatestProducts/LatestProducts';

const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json())

const Home = () => {
    return (
        <div className='bg-primary'>

            <Suspense fallback={<p>LOADING LATEST PRODUCTS...</p>}>
             <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            </Suspense>
            
        </div>
    );
};

export default Home;