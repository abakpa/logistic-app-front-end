import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrderRequest } from '../redux/slices/orderSlice';

const CreateOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.order);
  const [details, setDetails] = useState({
    user_id: '',
    user_email: '',
    description: '',
    value: '',
    quantity: '',
    weight: '',
    pickup_address: '',
    delivery_address: ''
  });
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    details.user_id = userId;
    details.user_email = userEmail;
    dispatch(createOrderRequest({ details, navigate }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Create Order</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Hidden Fields for User Info */}
          <input type="hidden" name="user_id" value={userId} onChange={handleChange} />
          <input type="hidden" name="user_email" value={userEmail} onChange={handleChange} />

          {/* Input Fields */}
          {[
            { name: "description", type: "textarea", placeholder: "Order description" },
            { name: "value", type: "number", placeholder: "Value (e.g., 27000)" },
            { name: "quantity", type: "number", placeholder: "Quantity" },
            { name: "weight", type: "number", placeholder: "Weight (kg)" },
            { name: "pickup_address", type: "text", placeholder: "Pick Up Address" },
            { name: "delivery_address", type: "text", placeholder: "Delivery Address" }
          ].map(({ name, type, placeholder }) => (
            <div key={name}>
              <label className="text-xs font-medium text-gray-600 capitalize">{name.replace('_', ' ')}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={details[name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 text-xs border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={placeholder}
                  rows="2"
                  required
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={details[name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 text-xs border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={placeholder}
                  required
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div>
            {loading ? (
              <button
                type="button"
                className="w-full p-2 bg-blue-500 text-xs text-white rounded flex items-center justify-center"
                disabled
              >
                <svg className="animate-spin h-4 w-4 mr-1 text-white" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v3a4 4 0 00-4 4H4z" className="opacity-75" />
                </svg>
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full p-2 bg-indigo-600 text-xs text-white font-medium rounded hover:bg-indigo-700"
              >
                Create Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrders;
