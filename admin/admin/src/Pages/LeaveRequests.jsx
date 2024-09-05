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
import Sidebar from "../Components/Sidebar.jsx";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

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
    }))
  );
  const [selectedRequest, setSelectedRequest] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (id, status) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
    setSelectedRequest(null); // Close modal
  };

  const openModal = (request) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activePage={activePage}
        setActivePage={setActivePage}
      />

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
      >
        <h1 className="text-3xl font-extrabold text-white mb-8">
          Leave Requests
        </h1>

        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Leave From
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Leave To
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t">
                <td className="py-3 px-6">{request.name}</td>
                <td className="py-3 px-6">{request.leaveFrom}</td>
                <td className="py-3 px-6">{request.leaveTo}</td>
                <td className="py-3 px-6">
                  {request.status ? (
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        request.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  ) : (
                    "Pending"
                  )}
                </td>
                <td className="py-3 px-6">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openModal(request)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-semibold mb-4">
                Leave Request from {selectedRequest.name}
              </h2>
              <p className="text-sm mb-2">
                Leave From: {selectedRequest.leaveFrom}
              </p>
              <p className="text-sm mb-2">
                Leave To: {selectedRequest.leaveTo}
              </p>
              <p className="text-sm mb-4">Reason: {selectedRequest.reason}</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={() =>
                    handleButtonClick(selectedRequest.id, "accepted")
                  }
                >
                  <FaCheckCircle className="mr-2" /> Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={() =>
                    handleButtonClick(selectedRequest.id, "rejected")
                  }
                >
                  <FaTimesCircle className="mr-2" /> Reject
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={closeModal}
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

export default LeaveRequests;
