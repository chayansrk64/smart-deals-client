import React, { use, useEffect, useRef, useState } from 'react';
import {  useLoaderData } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const [bids, setBids] = useState([])
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
            buyer_image: user?.photoURL,
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
            if(data.insertedId){
                bidModalRef.current.close()
                // add the new bid to the state
                newBid._id = data.insertedId;
                const newBids = [...bids, newBid]
                newBids.sort((a, b) => b.bid_price - a.bid_price)
                setBids(newBids)
                toast("Bid Successfull!");
            }
            console.log('after bid =>', data);
        })

   }

   useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`
          }
        })
        .then(res => res.json())
        .then(data => {
            setBids(data)
            console.log("bids for this product",data);
        })
   }, [productId, user])


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
                                <button className="btn">Cancel</button>
                            </form>
                            </div>
                        </div>
                        </dialog>


                     
                </div>
            </div>
            {/* bid details for this product */}
            <div>
                <h3 className='text-3xl py-4'>Bids for this product: {bids.length}</h3>

            <div>
                <div className="overflow-x-auto my-4">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
           SL No:
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
    {
        bids.map((bid, index) =>  <tr>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.buyer_name}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {bid.buyer_email}
          <br />
          
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">{bid.status}</button>
        </th>
      </tr>
     )
    }
      
    </tbody>
     
  </table>
</div>
            </div>

            </div>
        </div>
    );
};

export default ProductDetails;