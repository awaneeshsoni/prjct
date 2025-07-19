import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);

  const isPro = auth?.plan === "pro";

  const navItems = [
    { to: "/dashboard", label: "Analytics" },
    { to: "/messages", label: "Messages" },
    { to: "/pages", label: "Pages" },
    { to: "/links", label: "Links" },
  ];

  const activeClass = ({ isActive }) =>
    isActive
      ? "bg-gray-100 text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500";

  const NavItem = ({ to, label }) => (
    <NavLink to={to} className={activeClass}>
      <div className="p-2 rounded-lg bg-zinc-100 transition mt-2 hover:bg-gray-100 text-sm">{label}</div>
    </NavLink>
  );

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const UpgradeButton = () =>
    !isPro && (
      <button
        onClick={() => navigate("/pricing")}
        className="w-full bg-orange-500 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-orange-600 transition"
      >
        Upgrade to Pro
      </button>
    );

  return (
    <>
      <aside className="hidden md:flex w-60 h-screen bg-white shadow-xl flex-col justify-between fixed top-0 left-0 px-4 py-6 rounded-tr-3xl rounded-br-3xl">
        <div>
          <h2
            className="text-2xl font-bold text-orange-500 mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Prjct.in
          </h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>
        </div>

        {auth && (
          <div className="space-y-3 pt-6 border-t">
            <NavLink
              to={`/profile/${auth._id}`}
              className="flex items-center gap-2 p-2 text-sm rounded-lg hover:bg-gray-100 hover:text-orange-500"
            >
              <span>👤</span> Hi, <span>{auth.name}</span>
            </NavLink>

            <UpgradeButton />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-600 rounded-lg w-full text-left"
            >
              <span>🚪</span> <span>Logout</span>
            </button>
          </div>
        )}
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-3 flex justify-between items-center">
        <h2
          className="text-xl font-bold text-orange-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Prjct.in
        </h2>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white z-50 shadow-lg transition-transform transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2
            className="text-xl font-bold text-orange-500 cursor-pointer"
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
          >
            Prjct.in
          </h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={activeClass}
              onClick={() => setOpen(false)}
            >
              <div className="p-2 rounded-lg transition hover:bg-gray-100 text-sm">
                {item.label}
              </div>
            </NavLink>
          ))}

          {auth && (
            <>
              <NavLink
                to={`/profile/${auth._id}`}
                className="flex items-center gap-2 p-2 text-sm rounded-lg hover:bg-gray-100 hover:text-orange-500"
                onClick={() => setOpen(false)}
              >
                <span>👤</span>Hi, <span>{auth.name}</span>
              </NavLink>

              <UpgradeButton />

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-2 p-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-600 rounded-lg w-full text-left"
              >
                <span>🚪</span> <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
