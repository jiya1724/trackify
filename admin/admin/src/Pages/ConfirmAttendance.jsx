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
import Sidebar from '../Components/Sidebar.jsx';

// Sample data with date field
const sampleEmployees = [
  {
    id: 1,
    photo: "https://via.placeholder.com/50",
    name: "Employee1",
    code: "E123",
    location: "Gail India-Navi Mumbai",
    date: "2024-09-10",
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
        } p-8 bg-bg relative`}
        style={{ minHeight: "100vh" }}
      >
        {/* Watermark Logo */}
        

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
        <table className="min-w-full bg-darkGrey mt-9 shadow-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Code</th>
              <th className="py-3 px-6">Offsite Location</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="bg-darkBg text-white ">
            {filteredAttendance.map((employee) => (
              <tr
                key={employee.id}
                className="border-b hover:bg-gray-800 cursor-pointer transition-all duration-300"
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
                    <FaCheckCircle className="text-green-500" />
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
