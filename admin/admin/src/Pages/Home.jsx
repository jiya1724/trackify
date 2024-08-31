import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaMapMarkerAlt,
  FaKey,
  FaCheckCircle,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaExclamationCircle,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "../assets/Images/Logo.svg";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="desk">
        <div className="relative flex h-screen">
          {/* Sidebar */}
          <nav
            className={`fixed top-0 left-0 h-full w-64 bg-[#121212] text-white transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } z-40`}
            style={{
              backgroundImage: `url(${TrianglesBG})`,
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar items */}
              <div className="flex-1 pt-16">
                <ul className="space-y-4 px-4">
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "home"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("home")}
                  >
                    <FaHome size={20} />
                    <span className="text-lg">Home</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "locations"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("locations")}
                  >
                    <FaMapMarkerAlt size={20} />
                    <span className="text-lg">Locations</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "credentials"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("credentials")}
                  >
                    <FaKey size={20} />
                    <span className="text-lg">Credentials</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "attendance"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("attendance")}
                  >
                    <FaCheckCircle size={20} />
                    <span className="text-lg">Confirm Attendance</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "leaveRequests"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("leaveRequests")}
                  >
                    <FaEnvelope size={20} />
                    <span className="text-lg">Leave Requests</span>
                  </li>
                </ul>
              </div>
              {/* Logo */}
              <div className="flex justify-center items-end flex-shrink-0 p-4">
                <img src={Logo} alt="Logo" className="w-32" />
              </div>
            </div>
          </nav>

          {/* Hamburger Icon */}
          <button
            className="fixed top-4 left-4 z-50 text-gray-500 bg-white p-2 rounded-full shadow-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </button>

          {/* Main Content */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            } p-6 bg-[#121212] relative`}
          >
            {/* Watermark Logo */}
            <img
              src={Logo}
              alt="Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 opacity-20 pointer-events-none"
            />

            <h1 className="text-2xl font-bold text-gray-200 p-6 mb-6">Home</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Total Employees
                  </h2>
                  <p className="text-3xl font-bold text-blue-600">200</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUser size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Employees on Leave Today
                  </h2>
                  <p className="text-3xl font-bold text-red-600">15</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FaCalendarAlt size={24} className="text-red-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Total Checked In
                  </h2>
                  <p className="text-3xl font-bold text-green-600">160</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaClock size={24} className="text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Left for Check-In
                  </h2>
                  <p className="text-3xl font-bold text-orange-600">40</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaExclamationCircle size={24} className="text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mob">
        <div className="relative flex h-screen overflow-hidden">
          {/* Sidebar */}
          <nav
            className={`fixed top-0 left-0 h-full w-64 bg-[#121212] text-white transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } z-40 sm:translate-x-0 sm:relative sm:w-16 sm:translate-x-0`}
            style={{
              backgroundImage: `url(${TrianglesBG})`,
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar items */}
              <div className="flex-1 pt-16">
                <ul className="space-y-4 px-4 sm:space-y-2 sm:px-1">
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "home"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("home")}
                  >
                    <FaHome size={20} />
                    <span className={`text-lg sm:hidden`}>Home</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "locations"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("locations")}
                  >
                    <FaMapMarkerAlt size={20} />
                    <span className={`text-lg sm:hidden`}>Locations</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "credentials"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("credentials")}
                  >
                    <FaKey size={20} />
                    <span className={`text-lg sm:hidden`}>Credentials</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "attendance"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("attendance")}
                  >
                    <FaCheckCircle size={20} />
                    <span className={`text-lg sm:hidden`}>
                      Confirm Attendance
                    </span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "leaveRequests"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("leaveRequests")}
                  >
                    <FaEnvelope size={20} />
                    <span className={`text-lg sm:hidden`}>Leave Requests</span>
                  </li>
                </ul>
              </div>
              {/* Logo */}
              <div className="flex justify-center items-end flex-shrink-0 p-4 sm:justify-center sm:items-center sm:pt-4">
                <img src={Logo} alt="Logo" className="w-32 sm:w-16" />
              </div>
            </div>
          </nav>

          {/* Hamburger Icon */}
          <button
            className="fixed top-4 left-4 z-50 text-gray-500 bg-white p-2 rounded-full shadow-md focus:outline-none sm:hidden"
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </button>

          {/* Main Content */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            } sm:ml-16 p-6 bg-[#121212] relative`}
          >
            {/* Watermark Logo */}
            <img
              src={Logo}
              alt="Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 opacity-20 pointer-events-none"
            />

            <h1 className="text-2xl font-bold p-6 text-gray-200 mb-6 sm:text-xl">
              Home
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Total Employees
                  </h2>
                  <p className="text-3xl font-bold text-blue-600">200</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUser size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Employees on Leave Today
                  </h2>
                  <p className="text-3xl font-bold text-red-600">15</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FaCalendarAlt size={24} className="text-red-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Total Checked In
                  </h2>
                  <p className="text-3xl font-bold text-green-600">160</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaClock size={24} className="text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Left for Check-In
                  </h2>
                  <p className="text-3xl font-bold text-orange-600">40</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaExclamationCircle size={24} className="text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;