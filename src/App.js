import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Login from './components/Login'
import Users from './components/Users'
import CreateUsers from './components/CreateUsers'
import Vehicles from "./components/Vehicle";
import CreateVehicles from "./components/CreateVehicles";
import Drivers from './components/Driver'
import CreateDrivers from "./components/CreateDrivers";
import Order from "./components/Order";
import OrderByDriver from "./components/OrderByDriver";
import CreateOrders from "./components/CreateOders";
import Dispatch from "./components/Dispatches";
import OrderForPickup from "./components/OrderForPickup";
import OrderForUser from "./components/OrderForUser";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import UserSingleOrder from "./components/UserSingleOrder";
import PaymentForOrder from "./components/PaymentForOrder";
import PaymentForOrderReciept from "./components/PaymentForOrderReciept";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.token);
  const token = isLoggedIn || localStorage.getItem('authToken');
  return (
    <Router>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
        {token && <Sidebar />}
          </div>
        <div className="flex-1">
          <Header />
          <div className="p-4"></div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/newuser" element={<CreateUsers />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/newvehicle" element={<CreateVehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/newdrivers" element={<CreateDrivers />} />
            <Route path="/order" element={<Order />} />
            <Route path="/paymentfororder/:orderId" element={<PaymentForOrder />} />
            <Route path="/receipt/:id" element={<PaymentForOrderReciept />} />
            <Route path="/orderbydriver" element={<OrderByDriver />} />
            <Route path="/orderforpickup" element={<OrderForPickup />} />
            <Route path="/orderforuser" element={<OrderForUser />} />
            <Route path="/neworder" element={<CreateOrders />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/usersingleorder/:orderId" element={<UserSingleOrder />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

// import { useMediaQuery } from "react-responsive";

// const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const isDesktop = useMediaQuery({ minWidth: 1024 });
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
//   const isMobile = useMediaQuery({ maxWidth: 767 });

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="dashboard">
//       {isDesktop && <Sidebar />}
//       {isTablet && <Sidebar />}
//       {isMobile && sidebarOpen && <Sidebar mobile onClose={toggleSidebar} />}

//       <div className="main-content">
//         <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />
//         <Content isMobile={isMobile}/>
//       </div>
//     </div>
//   );
// };

// export default App