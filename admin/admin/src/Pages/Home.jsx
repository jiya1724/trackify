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
import DailyEmployeesChart from "../Components/DailyEmployeesChart";
import Sidebar from "../Components/Sidebar.jsx";

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
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activePage={activePage}
            setActivePage={setActivePage}
          />

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
            <h1 className="text-2xl font-bold text-gray-200 p-6 mb-6">Home</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#E7ECF2] p-6 rounded-lg shadow-md flex items-center justify-between">
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
              <div className="bg-[#E7ECF2] p-6 rounded-lg shadow-md flex items-center justify-between">
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
              <div className="bg-[#E7ECF2] p-6 rounded-lg shadow-md flex items-center justify-between">
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
              <div className="bg-[#E7ECF2] p-6 rounded-lg shadow-md flex items-center justify-between">
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

            {/* Add the Daily Employees Chart */}
            <div className="mt-6 bg-[#E7ECF2]" style={{ height: "35vh", width: "45vw" }}>
              <DailyEmployeesChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
