import React, { useEffect,useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrderByIdRequest, fetchOrderByUserRequest } from '../redux/slices/orderSlice';
import FlashCard from "./FlashCard";
import OrderTable from "./OrderTable";


const OrderForUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order, loading, error } = useSelector((state) => state.order);
    const [showFlashCard, setShowFlashCard] = useState(false);


    useEffect(() => {
        setShowFlashCard(true);
        // Hide the flash card after 3 seconds
        setTimeout(() => {
          setShowFlashCard(false);
        }, 3000);
        dispatch(fetchOrderByUserRequest());
    }, [dispatch]);

  
    const handleOrder=(orderId)=>{
        const data = { orderId, navigate };
        dispatch(fetchOrderByIdRequest(data))
    }

  

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <svg
                className="animate-spin h-10 w-10 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Loading"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                />
                <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    className="opacity-75"
                />
            </svg>
            <p className="text-blue-500 ml-4">Loading order...</p>
        </div>
    );
}
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="min-h-screen p-10 md:pl-60 md:pr-20 md:py-20 mb-5 bg-gray-100">
      <h2 className="text-base md:text-lg font-semibold mb-4 text-center">Orders</h2> {/* Reduced heading text */}
      <div>
                <OrderTable orders={order} handleOrder={handleOrder}/>
        {showFlashCard && (
          <div className="absolute top-10 right-4">
            <FlashCard message="Order created successfully!" />
          </div>
        )}
      </div>
    </div>
    
    
    );
};

export default OrderForUser;
