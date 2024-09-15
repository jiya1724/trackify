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
            <div className="pt-6 pb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-200 ">Home</h1>
            <img src={Logo} alt="" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-darkBg border border-solid border-lightGrey p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-400 mb-2">
                    Total Employees
                  </h2>
                  <p className="text-3xl font-bold text-blue-600">200</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUser size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="bg-darkBg border border-solid border-lightGrey p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-400 mb-2">
                    Employees on Leave Today
                  </h2>
                  <p className="text-3xl font-bold text-red-600">15</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FaCalendarAlt size={24} className="text-red-600" />
                </div>
              </div>
              <div className="bg-darkBg border border-solid border-lightGrey p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-400 mb-2">
                    Total Checked In
                  </h2>
                  <p className="text-3xl font-bold text-green-600">160</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaClock size={24} className="text-green-600" />
                </div>
              </div>
              <div className="bg-darkBg border border-solid border-lightGrey p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-400 mb-2">
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
            <div className="flex  justify-between w-full">
            <div className="mt-6 bg-darkBg  " style={{ height: "35vh", width: "45vw" }}>
              <DailyEmployeesChart />
         </div>
         <div className=" h-[57vh] w-[42%] rounded-lg border border-solid p-6 border-lightGrey mt-6">
 <div className="flex justify-between ">
 <div className="text-white text-lg font-semibold mb-4">Employees having battery low</div>
 <div className="hover:underline cursor-pointer font-medium text-blue-400 text-sm">See all</div>
 </div>
  <table className="w-full text-left table-auto">
    <thead>
      <tr className="bg-blue-300 bg-opacity-80 ">
        <th className="text-black p-3 text-xs text-center">Name</th>
        <th className="text-black p-3 text-xs text-center">Battery Status</th>
        <th className="text-black p-3 text-xs text-center">Checked In Status</th>
        <th className="text-black p-3 text-xs text-center">Handle CheckIn/Out </th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-gray-600 ">
        <td className="text-gray-200 p-2">
          <div className="flex items-center text-sm  justify-center">
            <div className="bg-gray-400 w-8 h-8 p-2   flex justify-center items-center rounded-full mr-2">
              <FaUser size={12} className="text-gray-800" />
            </div>
            Employee1
          </div>
        </td>
        <td className="text-gray-100 p-4 text-sm text-center">5%</td>
        <td className="text-gray-100 p-4 text-sm text-center">Checked In</td>
        <td className="text-gray-100 p-4 text-sm text-center">
          <button className="bg-transparent hover:bg-blue-500 text-white p-1 text-xs rounded-lg border-2 border-blue-500">
            Check Out
          </button>
        </td>
      </tr>
      <tr className="border-b border-gray-600 ">
        <td className="text-gray-200 p-2">
          <div className="flex items-center text-sm  justify-center">
            <div className="bg-gray-400 w-8 h-8 p-2   flex justify-center items-center rounded-full mr-2">
              <FaUser size={12} className="text-gray-800" />
            </div>
            Employee2
          </div>
        </td>
        <td className="text-gray-100 p-4 text-sm text-center">3%</td>
        <td className="text-gray-100 p-4 text-sm text-center">Checked Out</td>
        <td className="text-gray-100 p-4 text-sm text-center">
          <button className="bg-transparent hover:bg-red-500 text-white p-1 text-xs rounded-lg border-2 border-red-500">
            Check In
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
