import React from "react";
import Logo from "../assets/Images/Logo.svg";
import Cover from "../assets/Images/Cover.svg";
import pattern from "../assets/Images/bgPattern.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#121212] z-50">
        <div className="flex items-center justify-between p-4">
          <img src={Logo} alt="Logo" className="w-24" />
          <div className="flex space-x-2">
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Login As Admin
            </button>
            <button
              type="button"
              className="text-[#1E1E1E] bg-[#3085FE] hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Register Your Company
            </button>
          </div>
        </div>
        <hr />
      </header>

      {/* Main Content */}
      <main className="bg-[#121212] pt-24 pb-8 flex flex-col md:flex-row items-center justify-between relative">
        <img
          className="absolute -top-10 -left-20 md:top-0 md:left-0 md:translate-x-0 md:translate-y-0 w-full md:w-auto"
          src={pattern}
          alt="Background Pattern"
        />
        <div className="text-center md:text-left w-full md:w-[50vw] p-10">
          <h1 className="font-bold text-[#3085FE] text-3xl md:text-5xl">
            Stay Accurate With Our Attendance Management System
          </h1>
          <p className="text-white text-lg pt-10">
            Track and verify attendance seamlessly using geolocation technology,
            ensuring employees or students are present at the designated
            location. Our system provides accurate, real-time attendance data,
            enhancing accountability and operational efficiency.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-10">
            <Link to="/auth">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login As Admin
              </button>
            </Link>
            <button
              type="button"
              className="text-[#1E1E1E] bg-[#3085FE] hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Register Your Company
            </button>
          </div>
        </div>
        <img className="w-full md:w-auto" src={Cover} alt="Cover" />
      </main>

      {/* Subscription Section */}
      <section className="bg-[#121212] p-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <img src={Logo} alt="Logo" className="w-24" />
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 text-sm text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121212] text-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-4">Our Products</h2>
            <ul className="space-y-2">
              <li>HRMS All-in-one Software</li>
              <li>Mobile Attendance App</li>
              <li>Time Attendance Tracking</li>
              <li>Payroll Software</li>
              <li>Leave Management Software</li>
              <li>Claims Management Software</li>
              <li>Performance Appraisal Software</li>
              <li>Human Resource Software</li>
              <li>Employee Field Tracking Software</li>
              <li>Biometric Attendance Software</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Our Company</h2>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Why Choose Us?</li>
              <li>Awards and Recognitions</li>
              <li>Partners</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Clients & Stories</h2>
            <ul className="space-y-2">
              <li>Clients</li>
              <li>Success Stories</li>
              <li>Resources</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="flex w-full h-14 bg-black text-white border border-white rounded-xl items-center justify-center"
            >
              <div className="mr-3">
                <svg viewBox="0 0 384 512" width="30">
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs">Download on the</div>
                <div className="text-2xl font-semibold">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-full text-black bg-white rounded-lg h-14"
            >
              <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                  <path
                    fill="#FFD400"
                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                  />
                  <path
                    fill="#FF3333"
                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                  />
                  <path
                    fill="#48FF48"
                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                  />
                  <path
                    fill="#3BCCFF"
                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs">GET IT ON</div>
                <div className="text-xl font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
