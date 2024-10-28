import React, { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrderRequest } from '../redux/slices/orderSlice';
import { createDispatchByDriverRequest } from '../redux/slices/dispatchSlice';

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrderRequest());
    }, [dispatch]);

    const handlePickup = (orderId) => {
        const data = { orderId, navigate };
        dispatch(createDispatchByDriverRequest(data));
        
    };

    const renderButton = (status) => {
        switch (status) {
            case 'order created':
                return 'Accept order';
            case 'waiting for pickup':
                return 'Waiting for pick up';
            case 'Item dispatched':
                return 'Item dispatched';
            case 'Item delivered':
                return 'Item delivered';
            default:
                return <p>No valid status found</p>;
        }
    };

    if (loading) return <p>Loading order...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen p-10 mb-5 bg-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 border-b">User Email</th>
                <th className="py-3 px-4 border-b">Pick Up Address</th>
                <th className="py-3 px-4 border-b">Delivery Address</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {order.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No orders available
                  </td>
                </tr>
              ) : (
                order.map((orders, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{orders.user_email}</td>
                    <td className="py-2 px-4 border-b">{orders.pickup_address}</td>
                    <td className="py-2 px-4 border-b">{orders.delivery_address}</td>
                    <td className="py-2 px-4 border-b">{orders.status}</td>
                    <td className="py-2 px-4 border-b">{orders.description}</td>
                    <td>
                    <button  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"onClick={() => handlePickup(orders._id)}>
                         {renderButton(orders.status)}
                        </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    );
};

export default Order;
