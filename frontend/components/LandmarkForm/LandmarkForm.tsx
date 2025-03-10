"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { IoClose } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { LatLngExpression } from "leaflet";

// Dynamically import Leaflet components (Fixes SSR issue)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
);

const landmarks = [
  { id: 1, name: "Yellowstone National Park" },
  { id: 2, name: "Grand Canyon National Park" },
  { id: 3, name: "Yosemite National Park" },
  { id: 4, name: "Zion National Park" },
  { id: 5, name: "Acadia National Park" },
];

type LandmarkData = {
  landmarkId: number;
  distance: string;
  description: string;
  latitude: number;
  longitude: number;
};

type LandmarkFormProps = {
  formData: LandmarkData;
  setFormData: React.Dispatch<React.SetStateAction<LandmarkData>>;
};

type LocationMarkerProps = {
  setLocation: (lat: number, lng: number) => void;
};

const LocationMarker: React.FC<LocationMarkerProps> = ({ setLocation }) => {
  const map = useMapEvents({
    click: (e) => setLocation(e.latlng.lat, e.latlng.lng),
  });
  return null;
};

const LandmarkForm: React.FC<LandmarkFormProps> = ({
  formData,
  setFormData,
}) => {
  const [showMap, setShowMap] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "landmarkId" ? parseInt(value, 10) : value,
    }));
  };

  const toggleMapPopup = () => setShowMap((prev) => !prev);

  const setLocation = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  return (
    <div className="my-8 border border-gray-200 bg-white p-6 rounded shadow-md">
      <div className="space-y-4">
        {/* Landmark & Distance Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Landmark</label>
            <select
              name="landmarkId"
              value={formData.landmarkId}
              onChange={handleChange}
              className="w-full p-2 border rounded h-10 bg-white">
              {landmarks.map((landmark) => (
                <option key={landmark.id} value={landmark.id}>
                  {landmark.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Distance (km)
            </label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              className="w-full p-2 border rounded h-10"
            />
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
          />
        </div>

        {/* Latitude & Longitude */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              readOnly
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow">
              <label className="block text-sm font-medium mb-1">
                Longitude
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                readOnly
                className="w-full p-2 border rounded bg-gray-50 pr-14"
              />
            </div>
            <button
              type="button"
              onClick={toggleMapPopup}
              className="ml-2 w-12 h-10 mt-5 flex items-center justify-center border border-gray-300 rounded bg-gray-100 hover:bg-gray-200">
              <SlLocationPin size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Popup */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md relative">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Pick Location</h2>
              <button
                onClick={toggleMapPopup}
                className="text-gray-500 hover:text-gray-700">
                <IoClose size={20} />
              </button>
            </div>
            <MapContainer
              center={
                [formData.latitude, formData.longitude] as LatLngExpression
              }
              zoom={13}
              className="h-72 w-full mb-3 rounded">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={
                  [formData.latitude, formData.longitude] as LatLngExpression
                }
              />
              <LocationMarker setLocation={setLocation} />
            </MapContainer>
            <button
              type="button"
              onClick={toggleMapPopup}
              className="w-full py-2 bg-red-500 text-white rounded font-medium mt-3">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandmarkForm;
