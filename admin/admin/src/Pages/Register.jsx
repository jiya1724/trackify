import React, { useState } from "react";
import Logo from "../assets/Images/Logo.svg";
import pattern from "../assets/Images/bgPattern.png";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

const Register = () => {
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Check if all fields are filled
  const isFormValid =
    companyCode.trim() !== "" &&
    companyName.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  // Validate if password and confirm password match
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  return (
    <div>
      <div className="desk">
        <div
          className="h-screen flex items-center justify-center bg-bg"
          
        >
          
          <div className="w-full max-w-md bg-neutral-950 rounded-lg shadow-lg relative overflow-hidden">
            

            <div className="relative p-8">
              <div className="text-center mb-6">
                <img src={Logo} alt="Logo" className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-blue-700">Register</h1>
                <p className="text-gray-400">
                  Create an account to get started
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="companyCode"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Company Code
                  </label>
                  <input
                    type="text"
                    id="companyCode"
                    placeholder="Enter your company code"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="Enter your company name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
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
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {!passwordMatch && (
                    <p className="text-red-500 text-sm mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full bg-blue-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-800 ${
                    !isFormValid || !passwordMatch
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!isFormValid || !passwordMatch}
                >
                  Register
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Login here
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
          <div className="w-full max-w-md bg-neutral-950 rounded-lg shadow-lg relative overflow-hidden">
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
                  Register
                </h1>
                <p className="text-sm sm:text-base text-gray-400">
                  Create an account to get started
                </p>
              </div>

              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    htmlFor="companyCode"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Company Code
                  </label>
                  <input
                    type="text"
                    id="companyCode"
                    placeholder="Enter your company code"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="Enter your company name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
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
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-neutral-900 text-white"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {!passwordMatch && (
                    <p className="text-red-500 text-sm mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full bg-blue-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-800 ${
                    !isFormValid || !passwordMatch
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!isFormValid || !passwordMatch}
                >
                  Register
                </button>
              </form>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Login here
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

export default Register;
