import React, { useState } from "react";
import {
  FaBars,
  FaCheckCircle,
  FaTimesCircle,
  FaHome,
  FaMapMarkerAlt,
  FaKey,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import Logo from "../assets/Images/Logo.svg";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

// Sample data for leave requests
const sampleLeaveRequests = [
  {
    id: 1,
    photo: "https://via.placeholder.com/50",
    name: "Bhakti Lahane",
    leaveFrom: "2024-09-01",
    leaveTo: "2024-09-05",
    reason: "Medical appointment",
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/50",
    name: "Khushi Poojary",
    leaveFrom: "2024-09-10",
    leaveTo: "2024-09-12",
    reason: "Family event",
  },
  {
    id: 3,
    photo: "https://via.placeholder.com/50",
    name: "Jiya Trivedi",
    leaveFrom: "2024-09-15",
    leaveTo: "2024-09-20",
    reason: "Vacation",
  },
];

const LeaveRequests = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("leaveRequests");
  const [requests, setRequests] = useState(
    sampleLeaveRequests.map((request) => ({
      ...request,
      status: null,
      showStatus: false,
    }))
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (id, status) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: status, showStatus: true } : req
      )
    );
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: null, showStatus: false } : req
        )
      );
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activePage === "home" ? "bg-gray-800" : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("home")}
              >
                <FaHome size={20} />
                <span className="text-lg">Home</span>
              </li>
              <li
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activePage === "locations"
                    ? "bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("locations")}
              >
                <FaMapMarkerAlt size={20} />
                <span className="text-lg">Locations</span>
              </li>
              <li
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activePage === "credentials"
                    ? "bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("credentials")}
              >
                <FaKey size={20} />
                <span className="text-lg">Credentials</span>
              </li>
              <li
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activePage === "attendance"
                    ? "bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("attendance")}
              >
                <FaCheckCircle size={20} />
                <span className="text-lg">Confirm Attendance</span>
              </li>
              <li
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activePage === "leaveRequests"
                    ? "bg-gray-800"
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
        className="fixed top-4 left-4 z-50 text-gray-700 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none transition-colors duration-200"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } p-8 bg-[#121212] relative`}
        style={{ minHeight: "100vh" }}
      >
        {/* Watermark Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 opacity-10 pointer-events-none"
        />

        <h1 className="text-3xl font-extrabold text-white mb-8">
          Leave Requests
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform duration-300 ${
                request.showStatus
                  ? request.status === "accepted"
                    ? "bg-green-100"
                    : "bg-red-100"
                  : ""
              }`}
              style={{ transition: "background-color 1s" }}
            >
              <img
                src={request.photo}
                alt={`${request.name} photo`}
                className="w-20 h-20 rounded-full mb-4 border-2 border-gray-300"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {request.name}
              </h2>
              <p className="text-sm text-gray-600">
                Leave From: {request.leaveFrom}
              </p>
              <p className="text-sm text-gray-600">
                Leave To: {request.leaveTo}
              </p>
              <p className="text-sm text-gray-600">Reason: {request.reason}</p>
              <div className="mt-4 flex space-x-4">
                {!request.showStatus ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-5 py-2 rounded-lg flex items-center transition-transform transform hover:scale-105"
                      onClick={() => handleButtonClick(request.id, "accepted")}
                    >
                      <FaCheckCircle className="mr-2" /> Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-5 py-2 rounded-lg flex items-center transition-transform transform hover:scale-105"
                      onClick={() => handleButtonClick(request.id, "rejected")}
                    >
                      <FaTimesCircle className="mr-2" /> Reject
                    </button>
                  </>
                ) : (
                  <p
                    className={`text-lg font-semibold ${
                      request.status === "accepted"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {request.status === "accepted" ? "Accepted" : "Rejected"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
