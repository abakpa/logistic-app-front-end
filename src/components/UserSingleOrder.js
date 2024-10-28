import { useDispatch,useSelector } from "react-redux";
import React, { useEffect,useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { createDispatchRequest,fetchDispatchByOrderIdRequest } from '../redux/slices/dispatchSlice';
import { fetchOrderByIdRequest} from '../redux/slices/orderSlice';
import FlashCard from "./FlashCard";
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')



const UserSingleOrder = () => {
    const {orderId} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [messageReceived, setMessageReceived] = useState('')
    const [showFlashCard, setShowFlashCard] = useState(false);
    const { order } = useSelector((state) => state.order);
    const {notification} = useSelector((state)=>state.notification)
    const { dispatches} = useSelector((state) => state.dispatch);
console.log('not????',notification)
useEffect(()=>{
    const data = { orderId, navigate };
    dispatch(fetchOrderByIdRequest(data))
    dispatch(fetchDispatchByOrderIdRequest(data))
},[dispatch,orderId,navigate])

useEffect(()=>{
    socket.on('recieve_message',(data)=>{
      setMessageReceived(data.message)
    })
  },[])

  const handlePickup = (orderId) => {
    setShowFlashCard(true);
    // Hide the flash card after 3 seconds
    setTimeout(() => {
      setShowFlashCard(false);
    }, 3000);
    const data = { orderId};
    dispatch(createDispatchRequest(data));
    
};
  const renderButton = (status) => {

    switch (status) {
        case 'order created':
            return 'Pending pick up';
        case 'waiting for pickup':
            return 'Waiting for pick up';
        case 'Item dispatched':
            return 'Confirm pick up';
        case 'Item delivered':
            return 'Confirm delivery';
        case 'Order completed':
            return 'Order completed';
        default:
            return <p>No valid status found</p>;
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-2 sm:px-4">
    {order ? (
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto transform transition-all hover:shadow-xl">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center border-b-2 pb-2 sm:pb-4">
          Order Summary
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 truncate">
              <span className="font-semibold">Order ID:</span> {order.orderId}
            </p>
          </div>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 truncate">
              <span className="font-semibold">User Email:</span> {order.user_email}
            </p>
          </div>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 truncate">
              <span className="font-semibold">Pick-up Address:</span> {order.pickup_address}
            </p>
          </div>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 truncate">
              <span className="font-semibold">Delivery Address:</span> {order.delivery_address}
            </p>
          </div>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 truncate">
              <span className="font-semibold">Status:</span> {order.status}
            </p>
          </div>
        </div>
  
        {/* Submit Button */}
        <div className="mt-6 sm:mt-8 text-center">
          <button
            className="bg-blue-500 text-sm sm:text-base mb-8 text-white py-2 px-3 sm:px-4 rounded hover:bg-blue-600 transition-colors"
            onClick={() => handlePickup(order._id)}
          >
            {renderButton(messageReceived ? messageReceived : order.status, dispatches)}
          </button>
          {showFlashCard && (
            <div className="absolute top-10 right-4">
              <FlashCard message={notification} />
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto text-center">
        <p className="text-sm sm:text-base text-gray-500">No order found.</p>
      </div>
    )}
  </div>
  
  );
};

//  // Check for the condition where order is created and dispatch is undefined
//  if (status.order === 'order created' && status.dispatch === undefined) {
//     return 'Pending pick up';
// }else if(status.order=== 'waiting for pickup' && status.dispatch === 'confirm pickup'){
//     return 'Waiting for pick up'
// }else if(status.order=== 'Item dispatched' && status.dispatch === 'confirm pickup'){
//     return 'Confirm pick up'
// }else if(status.order=== 'Item dispatched' && status.dispatch === 'Item dispatched'){
//     return 'Wait for delivery'
// }else if(status.order=== 'Item delivered' && status.dispatch === 'Item dispatched'){
//     return 'Confirm delivery'
// }else if(status.order=== 'Item delivered' && status.dispatch === 'Item delivered'){
//     return 'Completing order'
// }else if(status.order=== 'Order completed' && status.dispatch === 'Item delivered'){
//     return 'Order completed'
// }else if(status.order=== 'Order completed' && status.dispatch === 'Order completed'){
//     return 'Order completed'
// }else{
//     return'No valid status found'
// }

export default UserSingleOrder;
