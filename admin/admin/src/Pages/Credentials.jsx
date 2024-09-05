import React, { useState } from "react";
import {
  FaBars,
  FaCheckCircle,
  FaTimesCircle,
  FaHome,
  FaMapMarkerAlt,
  FaKey,
  FaEnvelope,
  FaUpload,
  FaPaperPlane,
} from "react-icons/fa";
import Logo from "../assets/Images/Logo.svg";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

// Sample employees data
const sampleEmployees = [
  {
    id: 1,
    name: "Bhakti Lahane",
    username: "bhakti123",
    password: "pass123",
    email: "bhakti@example.com",
  },
  {
    id: 2,
    name: "Khushi Poojary",
    username: "khushi456",
    password: "pass456",
    email: "khushi@example.com",
  },
  {
    id: 3,
    name: "Jiya Trivedi",
    username: "jiya789",
    password: "pass789",
    email: "jiya@example.com",
  },
];

const Credentials = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("credentials");
  const [employees, setEmployees] = useState(sampleEmployees);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUpload = () => {
    // Logic to upload employee data (e.g., file upload, API call)
    console.log("Upload Employees");
  };

  const handleSendMail = () => {
    // Logic to send email to all employees
    console.log("Send Mail to Employees");
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
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  activePage === "home" ? "bg-gray-800" : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("home")}
              >
                <FaHome size={20} />
                <span className="text-lg">Home</span>
              </li>
              <li
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
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
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
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
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
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
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
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
        className="fixed top-4 left-4 z-50 text-gray-700 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none transition-all duration-300"
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

        <h1 className="text-3xl font-extrabold text-white mb-8">Credentials</h1>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 mb-4"
        >
          <FaUpload className="inline mr-2" /> Upload Employees
        </button>

        {/* Table Design */}
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Password</th>
              <th className="py-3 px-6">Email</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b hover:bg-gray-100 transition-all duration-300"
              >
                <td className="py-3 px-6">{employee.name}</td>
                <td className="py-3 px-6">{employee.username}</td>
                <td className="py-3 px-6">{employee.password}</td>
                <td className="py-3 px-6">{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Send Mail Button */}
        <button
          onClick={handleSendMail}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 mt-4"
        >
          <FaPaperPlane className="inline mr-2" /> Send Mail
        </button>
      </div>
    </div>
  );
};

export default Credentials;
