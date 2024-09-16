import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Sidebar from '../Components/Sidebar.jsx';
import {
  FaBars,
  FaHome,
  FaMapMarkerAlt,
  FaKey,
  FaCheckCircle,
  FaEnvelope,
  FaTrashAlt,
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
  const [showModal, setShowModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);

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

  const openDeleteModal = (index) => {
    setLocationToDelete(index);
    setShowModal(true);
  };

  const confirmDeleteLocation = () => {
    setLocations(locations.filter((_, i) => i !== locationToDelete));
    setShowModal(false);
    setLocationToDelete(null);
  };

  return (
    <div>
      <div className="desk">
        <div className="relative flex h-screen">
          {/* Sidebar */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activePage={activePage}
            setActivePage={setActivePage}
          />

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
                  className="z-0"
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

            {/* Location Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-200 mb-4">
                Saved Locations
              </h2>
              {locations.length > 0 ? (
                <table className="table-auto w-full bg-gray-700 text-white rounded-lg">
                  <thead>
                    <tr className="text-center">
                      <th className="px-4 py-2">Location Name</th>
                      <th className="px-4 py-2">Latitude</th>
                      <th className="px-4 py-2">Longitude</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((location, index) => (
                      <tr key={index} className="bg-gray-800 text-center">
                        <td className="px-4 py-2 justify-center text-center">
                          {location.name}
                        </td>
                        <td className="px-4 py-2 justify-center text-center">
                          {location.lat}
                        </td>
                        <td className="px-4 py-2 justify-center text-center">
                          {location.lng}
                        </td>
                        <td className="px-4 py-2 justify-center text-center">
                          <button
                            onClick={() => openDeleteModal(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400">No locations added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-xl z-[1001] w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Confirm Delete
      </h2>
      <p className="mb-6 text-center text-gray-600">
        Are you sure you want to delete this location?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={confirmDeleteLocation}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Locations;
