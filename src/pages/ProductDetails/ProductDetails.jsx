import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';

const ProductDetails = () => {
    const {user} = use(AuthContext)
    const product = useLoaderData()
    const {_id: productId, image, description, title, price_min} = product;
    const bidModalRef = useRef(null)
    // console.log(product);
    
    const handleBidModalOpen = () => {
        bidModalRef.current.showModal()
    }
     
   const handleBidSubmit = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = parseInt(e.target.bid.value);
        

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            status: "pending"
        }

        // console.log(newBid);

        fetch("http://localhost:3000/bids", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then(data => {
            console.log('after bid =>', data);
        })

   }

    return (
        <div>
            {/* product details */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
                <div className='col-span-5 border'>

                    <img className='w-full' src={image} alt="" />
                    <p>{description}</p>
                </div>
                <div className='col-span-7 border p-4'>
                    <h3 className='text-3xl font-semibold my-3'>{title}</h3>
                    <p className='text-xl font-semibold my-3'>${price_min}</p>

                    <button onClick={handleBidModalOpen}  className='btn btn-secondary '>I want buy this product</button>


                    {/* modal  */}
                    
                        <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give Seller Your Offered Price!</h3>
                            {/* form for bid */}
                            <form onSubmit={handleBidSubmit}>
                                <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name='name' className="input" readOnly defaultValue={user?.displayName} />
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" readOnly defaultValue={user?.email} />
                                <label className="label">Bid</label>
                                <input type="text" name='bid' className="input" placeholder="Your Bid" />
                                
                                <button className="btn btn-neutral mt-4">Place Your Bid</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                            </div>
                        </div>
                        </dialog>


                     
                </div>
            </div>
            {/* bid details for this product */}
        </div>
    );
};

export default ProductDetails;