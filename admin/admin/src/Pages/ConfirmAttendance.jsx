import React, { useState } from "react";
import {
  FaBars,
  FaCheckCircle,
  FaTimesCircle,
  FaHome,
  FaMapMarkerAlt,
  FaKey,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "../assets/Images/Logo.svg";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

// Sample data
const sampleEmployees = [
  {
    id: 1,
    photo: "https://via.placeholder.com/50",
    name: "John Doe",
    code: "E123",
    location: "Office A",
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/50",
    name: "Jane Smith",
    code: "E456",
    location: "Office B",
  },
  {
    id: 3,
    photo: "https://via.placeholder.com/50",
    name: "Alice Johnson",
    code: "E789",
    location: "Office C",
  },
  // Add more sample data as needed
];

const ConfirmAttendance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("attendance");
  const [attendance, setAttendance] = useState(
    sampleEmployees.map((employee) => ({
      ...employee,
      status: null,
      showStatus: false,
    }))
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (id, status) => {
    setAttendance((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, status: status, showStatus: true } : emp
      )
    );
    setTimeout(() => {
      setAttendance((prev) =>
        prev.map((emp) =>
          emp.id === id ? { ...emp, status: null, showStatus: false } : emp
        )
      );
    }, 1000);
  };

  return (
    <div className="flex">
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
        } p-8 h-fit bg-gray-900 relative`}
      >
        {/* Watermark Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 opacity-10 pointer-events-none"
        />

        <h1 className="text-3xl font-extrabold text-white mb-8">
          Confirm Attendance
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attendance.map((employee) => (
            <div
              key={employee.id}
              className={`bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform duration-300 ${
                employee.showStatus
                  ? employee.status === "accepted"
                    ? "bg-green-100"
                    : "bg-red-100"
                  : ""
              }`}
              style={{ transition: "background-color 1s" }}
            >
              <img
                src={employee.photo}
                alt={`${employee.name} photo`}
                className="w-20 h-20 rounded-full mb-4 border-2 border-gray-300"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {employee.name}
              </h2>
              <p className="text-sm text-gray-600">Code: {employee.code}</p>
              <p className="text-sm text-gray-600">Location: {employee.location}</p>
              <div className="mt-4 flex space-x-4">
                {!employee.showStatus ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-5 py-2 rounded-lg flex items-center transition-transform transform hover:scale-105"
                      onClick={() => handleButtonClick(employee.id, "accepted")}
                    >
                      <FaCheckCircle className="mr-2" /> Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-5 py-2 rounded-lg flex items-center transition-transform transform hover:scale-105"
                      onClick={() => handleButtonClick(employee.id, "rejected")}
                    >
                      <FaTimesCircle className="mr-2" /> Reject
                    </button>
                  </>
                ) : (
                  <p
                    className={`text-lg font-semibold ${
                      employee.status === "accepted"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {employee.status === "accepted" ? "Accepted" : "Rejected"}
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

export default ConfirmAttendance;
