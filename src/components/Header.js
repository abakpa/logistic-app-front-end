import image from '../image/logo.png'
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { logoutRequest } from '../redux/slices/authSlice'

const Header = () =>{
  const isLoggedIn = useSelector((state) => state.auth.token);
  const token = isLoggedIn || localStorage.getItem('authToken');
  const dispatch = useDispatch()
  const navigate = useNavigate()
const handleLogout =()=>{
dispatch(logoutRequest({navigate}))
}
const signUp=()=>{
  navigate('/newuser')
}
const login=()=>{
  navigate('/login')
}
return(
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 shadow-lg">
    <div className="container mx-auto md:px-32 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={image} // Replace with the logo path or URL
          alt="Logo"
          className="h-8 w-8"
        />
        <span className="font-bold text-xl">Rider</span>
      </div>

      {/* Menu Items */}
      <div className="hidden md:flex space-x-8">
        <a href="#home" className="hover:text-gray-300">Home</a>
        <a href="#about" className="hover:text-gray-300">About</a>
        <a href="#services" className="hover:text-gray-300">Services</a>
        <a href="#portfolio" className="hover:text-gray-300">Portfolio</a>
        <a href="#contact" className="hover:text-gray-300">Contact</a>
      </div>

      {/* Login/Sign-up Buttons */}
      <div className="flex items-center space-x-4">
        {
          !token &&
        <button onClick={login} className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition-colors">
          Login
        </button>
        }
        {
          token &&
        <button onClick={handleLogout} className="bg-red-500 border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition-colors">
          Logout
        </button>
        }
        {
      !token &&
        <button onClick={signUp} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Sign Up
        </button>
        }
      </div>
    </div>
  </nav>
)
}
export default Header