import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });

      if (response.data.success) {
        console.log(response.data);
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Use error.message instead of response.data.message
    }
  };


      const statusHandler=async(event,orderId)=>{

        try {
          
            const response=await axios.post(backendUrl+"/api/order/status",{orderId, status:event.target.value},{headers:{token}})
              if (response.data.success) {
                  await fetchAllOrders();
              }

        } catch (error) {
          console.log(error);
          toast.error(response.data.message)
          
         }

      }




  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-[0.50fr_2fr_1fr] lg:grid-cols-[0.50fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 " key={index}>
              <img src={assets.parcel_icon} alt='' />
              <div  >
                {order.items.map((item, itemIndex) => (
                  <p key={itemIndex}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                ))}
              </div>
              {/* Check if address exists before trying to access firstName and lastName */}
              {order.address ? (
               <div>
                <div>
                <p>{order.address.firstName+ " " +order.address.lastName}</p>
                <div>
                <p>{order.address.street}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode }</p>
                </div>
                 <p>{order.address.phone}</p> 
                 </div>
                 <div>
                  <p>items:{order.items.length}</p>
                  <p>Method:{order.paymentMethod}</p>
                  <p>payment:{order.payment?"done":"pending"}</p>
                  <p>date:{new Date(order.date).toDateString()}</p>
                 </div>
                    <p>${order.amount}</p>          

                    <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="p-2 text-semibold mt-6" >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Delivered">Delivered</option>

                    </select>       
                </div>
              ) : (
                <p>No address provided</p> // Optional: Handle missing address
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
