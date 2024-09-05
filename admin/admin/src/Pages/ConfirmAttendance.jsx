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

// Sample data with date field
const sampleEmployees = [
  {
    id: 1,
    photo: "https://via.placeholder.com/50",
    name: "Bhakti Lahane",
    code: "E123",
    location: "Office A",
    date: "2024-09-01",
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/50",
    name: "Khushi Poojary",
    code: "E456",
    location: "Office B",
    date: "2024-09-02",
  },
  {
    id: 3,
    photo: "https://via.placeholder.com/50",
    name: "Jiya Trivedi",
    code: "E789",
    location: "Office C",
    date: "2024-09-01",
  },
];

const ConfirmAttendance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("attendance");
  const [attendance, setAttendance] = useState(
    sampleEmployees.map((employee) => ({
      ...employee,
      status: null,
    }))
  );
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDecision = (status) => {
    setAttendance((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, status } : emp
      )
    );
    setShowModal(false);
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredAttendance = attendance
    .filter((employee) => (filterDate ? employee.date === filterDate : true))
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

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

        <h1 className="text-3xl font-extrabold text-white mb-8">
          Confirm Attendance
        </h1>

        {/* Date Filter and Sort */}
        <div className="mb-4 flex items-center space-x-4">
          <input
            type="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300"
          />
          <button
            onClick={handleSortChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        {/* Table Design */}
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Code</th>
              <th className="py-3 px-6">Offsite Location</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {filteredAttendance.map((employee) => (
              <tr
                key={employee.id}
                className="border-b hover:bg-gray-100 cursor-pointer transition-all duration-300"
                onClick={() => openModal(employee)}
              >
                <td className="py-3 px-6">{employee.name}</td>
                <td className="py-3 px-6">{employee.code}</td>
                <td className="py-3 px-6">{employee.location}</td>
                <td className="py-3 px-6">{employee.date}</td>
                <td className="py-3 px-6 flex items-center">
                  {employee.status === "accepted" ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : employee.status === "rejected" ? (
                    <FaTimesCircle className="text-red-500" />
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-lg relative transition-all transform scale-100 opacity-100 duration-300">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Confirm Attendance for {selectedEmployee.name}
              </h2>
              <p className="mb-4 text-gray-600">
                Are you sure you want to accept or reject the attendance for{" "}
                <strong>{selectedEmployee.name}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-green-600 transition-all duration-300"
                  onClick={() => handleDecision("accepted")}
                >
                  <FaCheckCircle className="mr-2" /> Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-red-600 transition-all duration-300"
                  onClick={() => handleDecision("rejected")}
                >
                  <FaTimesCircle className="mr-2" /> Reject
                </button>
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmAttendance;
