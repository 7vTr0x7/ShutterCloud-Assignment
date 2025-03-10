import { FaChevronRight } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-4 py-4 px-6 shadow-sm border-b">
      <button className="flex items-center gap-1 text-gray-700 text-sm">
        Dashboard
      </button>

      <FaChevronRight className="text-gray-400 text-xs" />

      <button className="text-gray-700 text-sm">Project</button>

      <FaChevronRight className="text-gray-400 text-xs" />

      <button className="text-gray-700 text-sm">Edit</button>
      <FaChevronRight className="text-gray-400 text-xs" />

      <div className="text-gray-500 text-sm ml-2">e7b47ae0ae57557a7de3c7a7</div>

      <div className="ml-auto">
        <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-700 font-medium">
          A
        </button>
      </div>
    </nav>
  );
}
