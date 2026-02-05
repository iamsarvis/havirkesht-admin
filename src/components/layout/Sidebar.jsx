import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation();

  const [baseDataOpen, setBaseDataOpen] = useState(false);

  // اگر روی یکی از زیرمنوها بودیم، منو باز بماند
  useEffect(() => {
    if (
      location.pathname.startsWith("/province") ||
      location.pathname.startsWith("/city") ||
      location.pathname.startsWith("/village")
    ) {
      setBaseDataOpen(true);
    }
  }, [location.pathname]);

  return (
    <aside className="
      w-64 bg-white border-l min-h-screen
      flex flex-col border-e-green-600
    ">
      {/* Brand */}
      <div className="
        h-16 flex items-center justify-center
        font-extrabold text-lg
        border-b text-emerald-600
      ">
        سامانه هاویر کشت
      </div>

      {/* Menu */}
      <nav className="p-4 text-sm space-y-1">

        <SidebarLink to="/">داشبورد</SidebarLink>

        {/* Base Data Menu */}
        <button
          onClick={() => setBaseDataOpen(!baseDataOpen)}
          className="
            w-full flex items-center justify-between
            px-4 py-2 rounded-lg
            text-slate-700 hover:bg-slate-100
            transition
          "
        >
          <span>داده‌های اولیه</span>
          <span
            className={`transition-transform ${
              baseDataOpen ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {/* Submenu */}
        {baseDataOpen && (
          <div className="mr-4 mt-1 space-y-1">
            <SidebarLink to="/province">استان‌ها</SidebarLink>
            <SidebarLink to="/city">شهرها</SidebarLink>
            <SidebarLink to="/village">روستاها</SidebarLink>
          </div>
        )}

        <SidebarLink to="/users">کاربران</SidebarLink>

      </nav>
    </aside>
  );
}

function SidebarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        block px-4 py-2 rounded-lg
        transition
        ${
          isActive
            ? "bg-emerald-500 text-white"
            : "text-slate-700 hover:bg-slate-100"
        }
        `
      }
    >
      {children}
    </NavLink>
  );
}

export default Sidebar;
