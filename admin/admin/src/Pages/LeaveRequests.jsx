import React, { useState, useEffect, useCallback } from "react";
import { FaBars, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Sidebar from "../Components/Sidebar.jsx";

// Sample leave request data (for testing purposes, remove when backend is connected)
const sampleRequests = [
  {
    _id: "1",
    emp_id: { name: "John Doe", _id: "123" },
    dateFrom: { day: 1, month: 9, year: 2024 },
    dateTo: { day: 5, month: 9, year: 2024 },
    status: "accepted",
    reason: "Medical",
  },
  {
    _id: "2",
    emp_id: { name: "Jane Smith", _id: "456" },
    dateFrom: { day: 3, month: 9, year: 2024 },
    dateTo: { day: 8, month: 9, year: 2024 },
    status: "pending",
    reason: "Vacation",
  },
];

const LeaveRequests = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("leaveRequests");
  const [requests, setRequests] = useState(sampleRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = (request) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const handleButtonClick = useCallback((id, status) => {
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status } : req))
    );
    setSelectedRequest(null);
  }, []);

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
        className="fixed top-4 left-4 z-50 text-gray-700 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
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

        {requests.length === 0 ? (
          <p className="text-white">No leave requests found</p>
        ) : (
          <table className="min-w-full bg-darkGrey mt-9 shadow-lg overflow-hidden rounded-lg">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Leave From</th>
                <th className="py-3 px-6">Leave To</th>
                <th className="py-3 px-6">Reason</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="bg-darkBg text-white">
              {requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b hover:bg-gray-800 cursor-pointer transition-all duration-300"
                  onClick={() => openModal(request)}
                >
                  <td className="py-3 px-6">{request.emp_id.name}</td>
                  <td className="py-3 px-6">
                    {request.dateFrom.day}/{request.dateFrom.month}/
                    {request.dateFrom.year}
                  </td>
                  <td className="py-3 px-6">
                    {request.dateTo.day}/{request.dateTo.month}/
                    {request.dateTo.year}
                  </td>
                  <td className="py-3 px-6">{request.reason}</td>
                  <td className="py-3 px-6">
                    {request.status === "accepted" ? (
                      <span className="px-2 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        Accepted
                      </span>
                    ) : request.status === "rejected" ? (
                      <span className="px-2 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                        Rejected
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Leave Request Details
              </h2>
              <p className="mb-4">
                <strong>Reason:</strong> {selectedRequest.reason}
              </p>
              <p className="mb-4">
                <strong>From:</strong> {selectedRequest.dateFrom.day}/
                {selectedRequest.dateFrom.month}/{selectedRequest.dateFrom.year}
              </p>
              <p className="mb-4">
                <strong>To:</strong> {selectedRequest.dateTo.day}/
                {selectedRequest.dateTo.month}/{selectedRequest.dateTo.year}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
                  onClick={() =>
                    handleButtonClick(selectedRequest._id, "accepted")
                  }
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                  onClick={() =>
                    handleButtonClick(selectedRequest._id, "rejected")
                  }
                >
                  Reject
                </button>
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
                  onClick={closeModal}
                >
                  Close
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
