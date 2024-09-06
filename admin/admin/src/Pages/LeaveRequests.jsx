import React, { useState, useEffect, useCallback } from "react";
import { FaBars, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Sidebar from "../Components/Sidebar.jsx";

const LeaveRequests = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("leaveRequests");
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [userId, setuserId] = useState(null);
  console.log(userId)


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = (request) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const handleButtonClick = useCallback(async (id, status) => {
    try {

      // Update leave request status
      const response = await fetch(`http://localhost:5000/leave/updatestatus/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status:'approved' }),
      });

      if (response.ok) {
        const updatedLeave = await response.json();
        setRequests((prev) =>
          prev.map((req) => (req._id === id ? updatedLeave.leave : req))
        );
        setSelectedRequest(null); // Close modal
      } else {
        console.error("Error updating leave request status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/leave/getallLeaves", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setuserId(data[0].emp_id._id)
          setRequests(data);
        } else {
          console.error("Error fetching leave requests:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLeaveRequests(); // Fetch leave requests on component mount
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

        {requests.length === 0 ? (
          <p className="text-white">No leave requests found</p>
        ) : (
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
                <tr key={request._id} className="border-t">
                  <td className="py-3 px-6">{request.emp_id.name}</td> {/* Display employee name */}
                  <td className="py-3 px-6">
                    {request.dateFrom.day}/{request.dateFrom.month}/
                    {request.dateFrom.year}
                  </td>
                  <td className="py-3 px-6">
                    {request.dateTo.day}/{request.dateTo.month}/
                    {request.dateTo.year}
                  </td>
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
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleButtonClick(request._id, "accepted")}
                    >
                      <FaCheckCircle size={24} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-4"
                      onClick={() => handleButtonClick(request._id, "rejected")}
                    >
                      <FaTimesCircle size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal for Leave Details */}
        {selectedRequest && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Leave Request Details</h2>
              <p>Reason: {selectedRequest.reason}</p>
              <p>
                From: {selectedRequest.dateFrom.day}/
                {selectedRequest.dateFrom.month}/{selectedRequest.dateFrom.year}
              </p>
              <p>
                To: {selectedRequest.dateTo.day}/
                {selectedRequest.dateTo.month}/{selectedRequest.dateTo.year}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
