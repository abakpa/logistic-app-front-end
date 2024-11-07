import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderPaymentRequest, fetchPaymentRequest } from '../redux/slices/orderSlice';
import { useSelector, useDispatch } from 'react-redux';

const PaymentForOrder = () => {
  const { orderId } = useParams();  // Extract orderId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { order } = useSelector((state) => state.order); // Fetch order from Redux store

 

  const [formData, setFormData] = useState({
    id: '',
    orderId: '',
    user_email: '',
    total_cost: '',
    value: '',
    quantity: '',
    weight: '',
    insurance: '',
    shipping_cost: '',
    pickup_address: '',
    delivery_address: '',
  });

  const [loading, setLoading] = useState(false);

  // Update formData when order is fetched
  useEffect(() => {
    if (order) {
      setFormData({
        id: order._id,
        orderId: order.orderId,
        user_email: order.user_email,
        total_cost: order.total_cost,
        value: order.value,
        quantity: order.quantity,
        weight: order.weight,
        insurance: order.insurance,
        shipping_cost: order.shipping_cost,
        pickup_address: order.pickup_address,
        delivery_address: order.delivery_address,
      });
    }
  }, [order]);
  ;
  useEffect(() => {
    dispatch(fetchOrderPaymentRequest({orderId}));
  }, [dispatch, orderId])
  // Dynamically load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/payment', formData);
      const { reference } = response.data;
      const { user_email, total_cost, id } = formData;

      // Trigger Paystack payment
      const handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your Paystack public key
        email: user_email,
        amount: total_cost * 100, // Paystack requires amount in kobo
        currency: 'NGN',
        ref: reference, // Reference returned from backend
        callback: function (response) {
           const data = {
                reference:response.reference,
                id,
                navigate
            }
          dispatch(fetchPaymentRequest(data))
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment. Please try again.');
    }

    setLoading(false);
  };

 

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Invoice</h2>
          <p className="text-gray-500">Order Summary</p>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Order ID:</span>
            <input
              type="text"
              name="orderId"
              value={order.orderId}
              readOnly
              className="text-gray-600 border-none bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Email:</span>
            <input
              type="text"
              name="user_email"
              value={order.user_email}
              onChange={handleChange}
              readOnly
              className="text-gray-600 border-none bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Value:</span>
            <input
              type="text"
              name="value"
              value={order.value}
              readOnly
              className="text-gray-600 border-none bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Quantity:</span>
            <input
              type="text"
              name="quantity"
              value={order.quantity}
              readOnly
              className="text-gray-600 border-none bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Insurance:</span>
            <input
              type="text"
              name="shipping_cost"
              value={order.insurance}
              readOnly
              className="text-gray-600 border-none bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Shipping Cost:</span>
            <input
              type="text"
              name="shipping_cost"
              value={order.shipping_cost}
              readOnly
              className="text-gray-600 border-none bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Total Amount:</span>
            <input
              type="text"
              name="total_cost"
              value={order.total_cost}
              readOnly
              className="text-gray-600 border-none bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Thank you for your order!</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForOrder;
