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

  

    if (loading) return <p>Loading order...</p>;
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
