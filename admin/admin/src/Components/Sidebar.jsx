import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaKey,
  FaCheckCircle,
  FaEnvelope,
  FaBars, // Import FaBars here
} from "react-icons/fa";
import Logo from "../assets/Images/Logo.svg";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  activePage,
  setActivePage,
}) => {
  return (
    <nav
      className={`fixed top-0 left-0 h-full w-64 bg-[#1e1e1e] text-white transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } z-40`}
      style={{
        backgroundImage: `url(${TrianglesBG})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 pt-16">
          <ul className="space-y-4 px-4">
            <li
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activePage === "home" ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
              onClick={() => setActivePage("home")}
            >
              <Link to="/home" className="flex items-center space-x-4">
                <FaHome size={20} />
                <span className="text-lg">Home</span>
              </Link>
            </li>
            <li
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activePage === "locations" ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
              onClick={() => setActivePage("locations")}
            >
              <Link to="/locations" className="flex items-center space-x-4">
                <FaMapMarkerAlt size={20} />
                <span className="text-lg">Locations</span>
              </Link>
            </li>
            <li
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activePage === "credentials"
                  ? "bg-gray-800"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setActivePage("credentials")}
            >
              <Link to="/credentials" className="flex items-center space-x-4">
                <FaKey size={20} />
                <span className="text-lg">Credentials</span>
              </Link>
            </li>
            <li
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activePage === "attendance"
                  ? "bg-gray-800"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setActivePage("attendance")}
            >
              <Link
                to="/confirmattendance"
                className="flex items-center space-x-4"
              >
                <FaCheckCircle size={20} />
                <span className="text-lg">Confirm Attendance</span>
              </Link>
            </li>
            <li
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activePage === "leaveRequests"
                  ? "bg-gray-800"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setActivePage("leaveRequests")}
            >
              <Link to="/leaverequests" className="flex items-center space-x-4">
                <FaEnvelope size={20} />
                <span className="text-lg">Leave Requests</span>
              </Link>
            </li>
            <li
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activePage === "blogs" ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
              onClick={() => setActivePage("blogs")}
            >
              
            </li>
          </ul>
        </div>
        {/* Logo */}
        <div className="flex justify-center items-end flex-shrink-0 p-4">
          <img src={Logo} alt="Logo" className="w-32" />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
