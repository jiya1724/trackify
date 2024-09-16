import React, { useState } from "react";
import { FaBars, FaUpload, FaPaperPlane } from "react-icons/fa";
import * as XLSX from "xlsx";
import Logo from "../assets/Images/Logo.svg";
import Sidebar from "../Components/Sidebar.jsx";

// Function to generate random username
const generateUsername = (name) => {
  const nameParts = name.split(" ");
  const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
  return (
    nameParts[0].toLowerCase() +
    (nameParts[1] ? nameParts[1][0].toLowerCase() : "") +
    randomNum
  );
};

// Function to generate random password
const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const Credentials = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("credentials");
  const [employees, setEmployees] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle file upload and generate username and password
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Extract employee data and generate username and password
      const uploadedEmployees = worksheet.map((row, index) => ({
        id: index + 1,
        name: row["Name"] || "",
        email: row["Email"] || "",
        username: generateUsername(row["Name"] || ""),
        password: generatePassword(),
      }));

      setEmployees(uploadedEmployees);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };



  const handleSendMail = async () => {
    (employees.map(async (employee) => {
      const response = await fetch("http://localhost:6000/mail/send-email", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:employee.name,
          email:employee.email,
          username:employee.username,
          password:employee.password

        }),
      });
      const data = await response.json();
      console.log(data)
    }))
    // try {
    //   const emailPromises = employees.map((employee) =>
    //     fetch("http://localhost:6000/mail/send-email", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         name: employee.name,
    //         email: employee.email,
    //         username: employee.username,
    //         password: employee.password,
    //       }),
    //     }),
    //   );

    //   const results = await Promise.all(emailPromises);
    //   results.forEach((response, index) => {
    //     if (response.ok) {
    //       console.log(`Email sent to ${employees[index].email}`);
    //     } else {
    //       console.error(`Failed to send email to ${employees[index].email}`);
    //     }
    //   });
    // } catch (error) {
    //   console.error("Error sending emails:", error);
    // }
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
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
          } p-8 bg-[#121212] relative`}
        style={{ minHeight: "100vh" }}
      >
        {/* Watermark Logo */}
      
        <h1 className="text-3xl font-extrabold text-white mb-8">Credentials</h1>

        {/* Custom File Upload Button */}
        <div className="mb-6">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 inline-flex items-center"
          >
            <FaUpload className="mr-2" />
            {selectedFile ? selectedFile : "Choose File"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Table Design */}
        <table className="min-w-full bg-darkGrey  mt-8 mb-4 shadow-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Password</th>
              <th className="py-3 px-6">Email</th>
            </tr>
          </thead>
          <tbody className="bg-darkBg text-white">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b hover:bg-gray-800 transition-all duration-300"
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
