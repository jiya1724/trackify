import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  FaBars,
  FaHome,
  FaMapMarkerAlt,
  FaKey,
  FaCheckCircle,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "../assets/Images/Logo.svg";
import TrianglesBG from "../assets/Images/TrianglesBG.png";

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Replace these with the actual coordinates for "Gail India Ltd SV 25 Mankhurd"
const initialPosition = {
  lat: 19.0782, // Example latitude for Gail India Ltd SV 25 Mankhurd
  lng: 72.9142, // Example longitude for Gail India Ltd SV 25 Mankhurd
};

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
    dragend(e) {
      setPosition(e.target.getLatLng());
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          setPosition(e.target.getLatLng());
        },
      }}
    />
  );
};

const Locations = () => {
  const [position, setPosition] = useState(initialPosition);
  const [locationName, setLocationName] = useState("");
  const [locations, setLocations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("locations");

  useEffect(() => {
    // Set the position to the initial location
    setPosition(initialPosition);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addLocation = () => {
    if (position && locationName) {
      setLocations([...locations, { name: locationName, ...position }]);
      setLocationName(""); // Clear the location name input after adding
    }
  };

  return (
    <div>
      <div className="desk">
        <div className="relative flex h-screen">
          {/* Sidebar */}
          <nav
            className={`fixed top-0 left-0 h-full w-64 bg-[#121212] text-white transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } z-40`}
            style={{
              backgroundImage: `url(${TrianglesBG})`,
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar items */}
              <div className="flex-1 pt-16">
                <ul className="space-y-4 px-4">
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "home"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("home")}
                  >
                    <FaHome size={20} />
                    <span className="text-lg">Home</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "locations"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("locations")}
                  >
                    <FaMapMarkerAlt size={20} />
                    <span className="text-lg">Locations</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "credentials"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("credentials")}
                  >
                    <FaKey size={20} />
                    <span className="text-lg">Credentials</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "attendance"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("attendance")}
                  >
                    <FaCheckCircle size={20} />
                    <span className="text-lg">Confirm Attendance</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "leaveRequests"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActivePage("leaveRequests")}
                  >
                    <FaEnvelope size={20} />
                    <span className="text-lg">Leave Requests</span>
                  </li>
                </ul>
              </div>
              {/* Logo */}
              <div className="flex justify-center items-end flex-shrink-0 p-4">
                <img src={Logo} alt="Logo" className="w-32" />
              </div>
            </div>
          </nav>

          {/* Hamburger Icon */}
          <button
            className="fixed top-4 left-4 z-50 text-gray-500 bg-white p-2 rounded-full shadow-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </button>

          {/* Main Content */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            } p-6 h-fit bg-[#121212] relative`}
          >
            {/* Watermark Logo */}
            <img
              src={Logo}
              alt="Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 opacity-20 pointer-events-none"
            />

            <h1 className="text-2xl font-bold text-gray-200 mb-6">Locations</h1>

            {/* Add Location Container */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Add New Location
              </h2>

              <div className="h-80 w-full mb-4">
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  <LocationMarker
                    position={position}
                    setPosition={setPosition}
                  />
                </MapContainer>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Enter location name"
                  className="p-2 rounded bg-gray-700 text-white w-full"
                />
              </div>

              {position && (
                <div className="text-white mb-4">
                  <p>Latitude: {position.lat}</p>
                  <p>Longitude: {position.lng}</p>
                </div>
              )}

              <button
                className="p-2 bg-blue-600 text-white rounded w-full"
                onClick={addLocation}
                disabled={!position || !locationName}
              >
                Add Location
              </button>
            </div>

            {/* Location Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-200 mb-4">
                Saved Locations
              </h2>
              {locations.length > 0 ? (
                locations.map((loc, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-800 rounded-lg text-white shadow-md"
                  >
                    <h3 className="text-lg font-bold">{loc.name}</h3>
                    <p>Latitude: {loc.lat}</p>
                    <p>Longitude: {loc.lng}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No locations added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mob">
        <div className="relative flex h-screen overflow-hidden">
          {/* Sidebar */}
          <nav
            className={`fixed top-0 left-0 h-full w-64 bg-[#121212] text-white transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } z-40 sm:translate-x-0 sm:relative sm:w-16 sm:translate-x-0`}
            style={{
              backgroundImage: `url(${TrianglesBG})`,
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 pt-16">
                <ul className="space-y-4 px-4 sm:space-y-2 sm:px-1">
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "home"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("home")}
                  >
                    <FaHome size={20} />
                    <span className="text-lg sm:hidden">Home</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "locations"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("locations")}
                  >
                    <FaMapMarkerAlt size={20} />
                    <span className="text-lg sm:hidden">Locations</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "credentials"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("credentials")}
                  >
                    <FaKey size={20} />
                    <span className="text-lg sm:hidden">Credentials</span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "attendance"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("attendance")}
                  >
                    <FaCheckCircle size={20} />
                    <span className="text-lg sm:hidden">
                      Confirm Attendance
                    </span>
                  </li>
                  <li
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                      activePage === "leaveRequests"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } sm:justify-center sm:space-x-0 sm:py-1 sm:px-0`}
                    onClick={() => setActivePage("leaveRequests")}
                  >
                    <FaEnvelope size={20} />
                    <span className="text-lg sm:hidden">Leave Requests</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-end flex-shrink-0 p-4 sm:justify-center sm:items-center sm:pt-4">
                <img src={Logo} alt="Logo" className="w-32 sm:w-16" />
              </div>
            </div>
          </nav>

          {/* Hamburger Icon */}
          <button
            className="fixed top-4 left-4 z-50 text-gray-500 bg-white p-2 rounded-full shadow-md focus:outline-none sm:hidden"
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </button>

          {/* Main Content */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            } sm:ml-16 p-6 bg-[#121212] relative`}
          >
            {/* Watermark Logo */}
            <img
              src={Logo}
              alt="Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 opacity-20 pointer-events-none"
            />

            <h1 className="text-2xl font-bold text-gray-200 mb-6 sm:text-xl">
              Locations
            </h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Add New Location
              </h2>

              <div className="h-80 w-full mb-4">
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  <LocationMarker
                    position={position}
                    setPosition={setPosition}
                  />
                </MapContainer>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Enter location name"
                  className="p-2 rounded bg-gray-700 text-white w-full"
                />
              </div>

              {position && (
                <div className="text-white mb-4">
                  <p>Latitude: {position.lat}</p>
                  <p>Longitude: {position.lng}</p>
                </div>
              )}

              <button
                className="p-2 bg-blue-600 text-white rounded w-full"
                onClick={addLocation}
                disabled={!position || !locationName}
              >
                Add Location
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-200 mb-4">
                Saved Locations
              </h2>
              {locations.length > 0 ? (
                locations.map((loc, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-800 rounded-lg text-white shadow-md"
                  >
                    <h3 className="text-lg font-bold">{loc.name}</h3>
                    <p>Latitude: {loc.lat}</p>
                    <p>Longitude: {loc.lng}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No locations added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
