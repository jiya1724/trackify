import React, { useState } from "react";
import Logo from "../assets/Images/Logo.svg";
import pattern from "../assets/Images/bgPattern.png";
import TrianglesBG from "../assets/Images/TrianglesBG.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    code: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          officeCode: formData.code,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem('token', data.token);
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Check if both fields are filled
  const isFormValid = formData.code.trim() !== "" && formData.password.trim() !== "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <div
          className="h-screen flex items-center justify-center bg-cover bg-center bg-bg"
        >
          <div className="w-full max-w-md bg-neutral-950 border border-Blue border-solid rounded-[20px] shadow-lg relative overflow-hidden">
            <div className="relative p-8">
              <div className="text-center mb-6">
                <img src={Logo} alt="Logo" className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-blue-700">Login</h1>
                <p className="text-gray-400">
                  Please enter your credentials to access the system
                </p>
              </div>
                
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Company Code 
                  </label>
                  <input
                    type="text"
                    id="code"
                    placeholder="Enter Company's Code"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="mt-1">
                    <label className="text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                        className="mr-2"
                      />
                      Show Password
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </div>
                </div>

                <Link to="/home"><button
                  type="submit"
                  className={`w-full bg-blue-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-800 ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isFormValid}
                >
                  Login
                </button></Link>
              </form>

              {errorMessage && (
                <div className="mt-4 text-red-500 text-center">
                  {errorMessage}
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mob"> ... */ }
    </div>
  );
};

export default Login;
