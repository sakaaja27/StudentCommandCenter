import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBookOpen,
  FiTarget,
  FiBarChart2,
  FiMenu,
  FiX,
} from "react-icons/fi";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/study-planner", label: "Study Planner", icon: <FiBookOpen /> },
  { to: "/Focus-Mode", label: "Focus Mode", icon: <FiTarget /> },
  { to: "/Analytics-Mode", label: "Analytics", icon: <FiBarChart2 /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-64 h-screen bg-white shadow-lg transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block md:h-auto md:min-h-full`}
      >
        <div className="p-6 text-xl font-bold text-gray-800 border-b">
          Command Center
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-150
                     ${
                       isActive
                         ? "bg-blue-100 text-blue-600"
                         : "text-gray-700 hover:bg-gray-100"
                     }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
