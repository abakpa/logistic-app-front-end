import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaClipboardList, FaPlus, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 focus:outline-none"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static z-10 w-48 bg-white text-gray-900 transition-transform duration-300 ease-in-out`}
      >

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-20 md:py-6 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-200">
                <FaHome className="text-sm" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/neworder" className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-200">
                <FaPlus className="text-sm" />
                <span>Create Order</span>
              </Link>
            </li>
            <li>
              <Link to="/orderforuser" className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-200">
                <FaClipboardList className="text-sm" />
                <span>Orders</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer Area in Sidebar */}
       
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
