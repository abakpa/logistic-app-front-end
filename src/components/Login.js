import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {loginRequest} from '../redux/slices/authSlice'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error} = useSelector((state)=>state.auth)
    const [credentials,setCredentials] = useState({email:'',password:''})

    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data ={credentials,navigate}
        dispatch(loginRequest(data))
    }
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-0">
  <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email input */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password input */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Login Button */}
      <button
        type="submit"
        className="w-full p-2 sm:p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </form>
  </div>
</div>

       
    )
}

export default Login