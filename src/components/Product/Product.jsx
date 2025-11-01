import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {
    const {_id, title, price_max, price_min, image} = product;
    return (
        <div>
            <div className="card bg-base-100 shadow-sm">
            <figure className="p-4">
                <div className="rounded-lg overflow-hidden w-[425px] h-[275px]">
                    <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt="product"
                    />
                </div>
                </figure>
            <div className="card-body">
                <h2 className="card-title text-xl">{title}</h2>
                 <div className='text-md font-semibold'>
                    <p>Price: {price_min} - {price_max} </p>
                 </div>
                <div className="card-actions justify-center">
                <Link to={`/product-details/${_id}`} className="btn btn-primary w-full">View Details</Link>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Product;