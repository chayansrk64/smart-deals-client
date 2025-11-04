import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { toast } from 'react-toastify';

const MyBids = () => {
    const [bids, setBids] = useState([])
    const {user} = use(AuthContext);

    // console.log('token', user.accessToken);

    useEffect(() => {
        fetch(`http://localhost:3000/bids?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(data => {
            setBids(data)
            // console.log(data);
        })
    }, [user])

    // useEffect(() => {
    //     fetch(`http://localhost:3000/bids?email=${user?.email}`, {
    //       headers: {
    //         authorization: `Bearer ${localStorage.getItem('token')}`
    //       }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setBids(data)
    //         // console.log(data);
    //     })
    // }, [user])


    // const handleDeleteBid = (_id) => {
    //     console.log(_id);
    //     toast("delete Successfull");

    // }


    // Your delete handler
const handleDeleteBid = (_id) => {
  // Show a custom toast with confirmation buttons
  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete?</p>
        <button
          onClick={() => {
            // Proceed with deletion
            deleteItem(_id);
            toast.success("Delete successful");
            closeToast();
          }}
          style={{ marginRight: "10px", backgroundColor:"green", color:"white" }}
        >
          Confirm
        </button>
        <button className='text-white bg-red-500' onClick={closeToast}>Cancel</button>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    }
  );
};

// Simulated delete function
const deleteItem = (_id) => {
  console.log("Deleted item with ID:", _id);
  
    fetch(`http://localhost:3000/bids/${_id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        if(data.deletedCount){
            const remainingBids = bids.filter(bid => bid._id !== _id)
            setBids(remainingBids)
        }
    })

};



    return (
        <div>
            <h3 className='text-3xl font-semibold my-4'>My Bids: {bids.length}</h3>
            <div>
                <div className="overflow-x-auto my-4">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          
        </th>
        <th>Product</th>
        <th>Buyer</th>
        <th>Bid Price</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
     {
        bids.map((bid, index) =>   <tr key={bid._id}>
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
          <span className="badge badge-ghost badge-sm">Front-end management</span>
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <p className="">{bid.status}</p>
        </th>
        <th>
          <button onClick={() => handleDeleteBid(bid._id)} className="btn btn-outline btn-error">Delete</button>
        </th>
      </tr>)
     }
     
    </tbody>
    
  </table>
</div>
            </div>
        </div>
    );
};

export default MyBids;