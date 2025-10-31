import React from 'react';

const Product = ({product}) => {
    const {title, price_max, price_min, image} = product;
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
                 <div className='flex justify-between text-md font-semibold'>
                    <span>$ {price_max}</span>
                    <span>$ {price_min}</span>
                 </div>
                <div className="card-actions justify-center">
                <button className="btn btn-primary w-full">View Details</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Product;