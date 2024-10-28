import React, { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDriverOrderRequest } from '../redux/slices/orderSlice';
import { fetchDispatchByDriverRequest } from '../redux/slices/dispatchSlice';
import { createDispatchByDriverRequest } from '../redux/slices/dispatchSlice';

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order, loading, error } = useSelector((state) => state.order);
    const { dispatches} = useSelector((state) => state.dispatch);

    useEffect(() => {
        dispatch(fetchDriverOrderRequest());
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchDispatchByDriverRequest());
    }, [dispatch]);

    const handlePickup = (orderId) => {
        const data = { orderId, navigate };
        dispatch(createDispatchByDriverRequest(data));
        
    };

    const renderButton = (status) => {
        switch (status) {
            case 'Order created':
                return 'Accept order';
            case 'confirm pickup':
                return 'Pick up';
            case 'Item dispatched':
                return 'Item delivered';
            case 'Item delivered':
                return 'Finish delivery';
            default:
                return <p>No valid status found</p>;
        }
    };

    if (loading) return <p>Loading order...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen p-6 md:py-24 md:pl-60 md:pr-40 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-center">Your Order</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Pick-Up Address</th>
                <th className="py-3 px-4 border-b text-left">Delivery Address</th>
                <th className="py-3 px-4 border-b text-left">Description</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {!order || !Array.isArray(order) || order.length === 0? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No orders available
                  </td>
                </tr>
              ) : (
                order.map((orders, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-left">{orders.user_email}</td>
                    <td className="py-2 px-4 border-b text-left">{orders.pickup_address}</td>
                    <td className="py-2 px-4 border-b text-left">{orders.delivery_address}</td>
                    <td className="py-2 px-4 border-b text-left">{orders.description}</td>
                    <td className="py-2 px-4 border-b text-left">{orders.status}</td>
                    <td className="py-2 px-4 border-b text-left">
                    <button  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600" onClick={() => handlePickup(orders._id)}>
                    {renderButton(dispatches.status)}
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
