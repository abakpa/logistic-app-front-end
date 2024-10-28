import React, { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrderForPickupRequest } from '../redux/slices/orderSlice';
import { createDispatchRequest } from '../redux/slices/dispatchSlice';

const OrderForPickup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrderForPickupRequest());
    }, [dispatch]);

    const handlePickup = (orderId) => {
        const data = { orderId, navigate };
        dispatch(createDispatchRequest(data));
        
    };

    if (loading) return <p>Loading order...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
        <h2>Orders</h2>
        {!order || !Array.isArray(order) || order.length === 0 ? (
            <p>{order}</p>
        ) : (
            <ul>
                {order.map((orders) => (
                    <li key={orders._id}>
                        {orders.pickup_address}
                        <button onClick={() => handlePickup(orders._id)}>
                            Pick up
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};

export default OrderForPickup;
