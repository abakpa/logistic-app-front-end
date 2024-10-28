import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaClipboardList, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-48 h-screen bg-gray-100 text-gray-900 shadow-lg fixed flex flex-col">
      {/* Branding/Logo Area */}
      <div className="p-6 bg-gray-200">
        <h2 className="text-3xl font-bold text-center">MyApp</h2>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-4">
          <li>
            <Link to="/home" className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-200">
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/neworder" className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-200">
              <FaPlus className="text-xl" />
              <span>Create Order</span>
            </Link>
          </li>
          <li>
            <Link to="/orderforuser" className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-200">
              <FaClipboardList className="text-xl" />
              <span>Orders</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer Area in Sidebar */}
      <div className="px-4 py-6 bg-gray-200">
        <p className="text-sm text-center">© 2024 MyApp</p>
      </div>
    </div>
  );
};

export default Sidebar;
