import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8">MechRelay</h1>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className="px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/jobs"
          className="px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Jobs
        </NavLink>

        <NavLink
          to="/customers"
          className="px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Customers
        </NavLink>

        <NavLink
          to="/parts"
          className="px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Parts
        </NavLink>

        <NavLink
          to="/settings"
          className="px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Settings
        </NavLink>

        {/* The new page */}
        <NavLink
          to="/why"
          className="px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Why MechRelay
        </NavLink>
      </nav>
    </div>
  );
}
