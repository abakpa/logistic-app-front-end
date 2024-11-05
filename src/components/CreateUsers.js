import React, {useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createUserRequest } from '../redux/slices/userSlice'

const CreateUsers = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading} = useSelector(state=>state.user)
    const [details,setDetails] = useState({name:'',phone:'',address:'',email:'',password:''})

    const handleChange = (e)=>{
        setDetails({...details, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data ={details,navigate}
        dispatch(createUserRequest(data))
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={details.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={details.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={details.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Password Input */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={details.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Phone Input */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={details.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Error Message */}
            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
  
            {/* Sign-Up Button */}
            {loading ? (
                        <button type="button" className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center" disabled>
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
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
                            Processing...
                        </button>
                    ) : (
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
                    )}
          </form>
        </div>
      </div>
    )
}
export default CreateUsers