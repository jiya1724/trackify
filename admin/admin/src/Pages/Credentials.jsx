import React, { useState } from "react";

import { FaBars, FaUpload, FaPaperPlane } from "react-icons/fa";
import Logo from "../assets/Images/Logo.svg";
import Sidebar from "../Components/Sidebar.jsx";
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
    console.log("Upload Employees");
  };

  const handleSendMail = () => {
    console.log("Send Mail to Employees");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activePage={activePage}
        setActivePage={setActivePage}
      />

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
            <tr className="text-left bg-[#CADCF5]">
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
      <div></div>
    </div>
  );
};

export default Credentials;
