import React from "react";
import Logo from "../assets/Images/Logo.svg";

const HomeDashboard = () => {
  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      {/* Left Navigation Bar */}
      <div className="w-64 bg-neutral-900 p-5">
        <div className="flex items-center mb-6">
          <img src={Logo} alt="Logo" className="h-12" />
          <span className="text-xl font-bold ml-4"></span>
        </div>
        <nav className="space-y-4">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-neutral-800">
            Dashboard
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-neutral-800">
            Employees
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-neutral-800">
            Company Code Generate
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-neutral-800">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Dashboard Summary Containers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Total Employees</h3>
            <p className="text-2xl">120</p>
          </div>
          <div className="bg-blue-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Total Off</h3>
            <p className="text-2xl">5</p>
          </div>
          <div className="bg-blue-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Total Leaves</h3>
            <p className="text-2xl">30</p>
          </div>
          <div className="bg-blue-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Total Permissions</h3>
            <p className="text-2xl">10</p>
          </div>
        </div>

        {/* List of Employees on Leave Today */}
        <div className="bg-neutral-900 p-6 rounded-lg">
          <h2 className="font-bold text-xl mb-4">On Leave Today</h2>
          <ul className="space-y-3">
            <li className="flex justify-between p-3 bg-neutral-800 rounded">
              <span>John Doe</span>
              <span>Leave Type: Sick Leave</span>
            </li>
            <li className="flex justify-between p-3 bg-neutral-800 rounded">
              <span>Jane Smith</span>
              <span>Leave Type: Personal Leave</span>
            </li>
            <li className="flex justify-between p-3 bg-neutral-800 rounded">
              <span>Michael Brown</span>
              <span>Leave Type: Vacation</span>
            </li>
          </ul>
          <button className="mt-4 w-full py-2 bg-blue-700 hover:bg-blue-800 rounded">
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
