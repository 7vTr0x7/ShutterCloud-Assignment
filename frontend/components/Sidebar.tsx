"use client";

import { useState, ReactNode } from "react";
import {
  FaChartBar,
  FaUserShield,
  FaUserTie,
  FaUsers,
  FaCity,
  FaFolderOpen,
  FaHome,
  FaListUl,
  FaUserTag,
  FaChartLine,
  FaDollarSign,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  icon,
  label,
  hasDropdown = false,
  isActive = false,
  isOpen = false,
  onClick = () => {},
}: NavItemProps) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-2.5 text-sm ${
        isActive ? "text-pink-600 font-medium" : "text-gray-700"
      } hover:bg-gray-100`}>
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
      {hasDropdown && (
        <span className="ml-auto">
          {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </span>
      )}
    </button>
  </li>
);

export default function Sidebar() {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    project: false,
  });

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4  border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md bg-pink-600 flex items-center justify-center text-white font-bold mr-3"></div>
          <div>
            <h1 className="font-medium text-pink-600">Housing Mantra</h1>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1">
          {[
            { icon: <FaChartBar size={18} />, label: "Stats" },
            { icon: <FaUserShield size={18} />, label: "Admin" },
            { icon: <FaUserTie size={18} />, label: "Agent" },
            { icon: <FaUsers size={18} />, label: "Owner" },
            { icon: <FaCity size={18} />, label: "Developer" },
            {
              icon: <FaFolderOpen size={18} />,
              label: "Project",
              hasDropdown: true,
              isOpen: openDropdowns.project,
              onClick: () => toggleDropdown("project"),
            },
            { icon: <FaHome size={18} />, label: "Property" },
            { icon: <FaListUl size={18} />, label: "Listing" },
            { icon: <FaUserTag size={18} />, label: "Leads" },
            { icon: <FaUsers size={18} />, label: "Customer" },
            { icon: <FaChartLine size={18} />, label: "Analytics" },
            { icon: <FaDollarSign size={18} />, label: "Sales" },
            { icon: <FaMoneyBillWave size={18} />, label: "Income Generated" },
            { icon: <FaMapMarkerAlt size={18} />, label: "Site Visit" },
            { icon: <FaCalendarCheck size={18} />, label: "Booking" },
          ].map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
