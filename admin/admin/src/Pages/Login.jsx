import React from "react";
import Logo from "../assets/Images/Logo.svg";
import pattern from "../assets/Images/bgPattern.png";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

const Login = () => {
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${TrianglesBG})` }} // Background image for the whole page
    >
      
      <div className="w-full max-w-md bg-neutral-950 rounded-lg shadow-lg relative overflow-hidden">
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
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-800"
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
  );
};

export default Login;
