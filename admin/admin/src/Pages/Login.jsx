import React, { useState } from "react";
import Logo from "../assets/Images/Logo.svg";
import pattern from "../assets/Images/bgPattern.png";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Check if both fields are filled
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="desk">
        <div
          className="h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${TrianglesBG})` }}
        >
          <div className="w-full max-w-md bg-neutral-950 rounded-[20px] shadow-lg relative overflow-hidden">
            <img
              className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-30"
              src={pattern}
              alt="Background Pattern"
            />

            <div className="relative p-8">
              <div className="text-center mb-6">
                <img src={Logo} alt="Logo" className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-blue-700">Login</h1>
                <p className="text-gray-400">
                  Please enter your credentials to access the system
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-blue-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-800 ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isFormValid}
                >
                  Login
                </button>
              </form>

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
      <div className="mob">
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-0"
          style={{ backgroundImage: `url(${TrianglesBG})` }}
        >
          <div className="w-full max-w-md bg-neutral-950 rounded-[20px] shadow-lg relative overflow-hidden">
            <img
              className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-30 hidden sm:block"
              src={pattern}
              alt="Background Pattern"
            />

            <div className="relative p-6 sm:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <img
                  src={Logo}
                  alt="Logo"
                  className="mx-auto mb-4 w-24 sm:w-32"
                />
                <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
                  Login
                </h1>
                <p className="text-sm sm:text-base text-gray-400">
                  Please enter your credentials to access the system
                </p>
              </div>

              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-blue-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-800 ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isFormValid}
                >
                  Login
                </button>
              </form>

              <div className="mt-4 sm:mt-6 text-center">
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
    </div>
  );
};

export default Login;
