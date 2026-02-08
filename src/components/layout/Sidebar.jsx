import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation();
  const [baseDataOpen, setBaseDataOpen] = useState(false);

  useEffect(() => {
    if (
      location.pathname.startsWith("/province") ||
      location.pathname.startsWith("/farmer")
    ) {
      setBaseDataOpen(true);
    }
  }, [location.pathname]);

  return (
    <aside
      className="
        w-64 bg-white border-l
        sticky top-0 h-screen
        flex flex-col
      "
    >
      {/* Brand */}
      <div
        className="
          h-16 flex items-center justify-center
          font-extrabold text-lg
          border-b text-emerald-600
        "
      >
        سامانه هاویر کشت
      </div>

      {/* Menu */}
      <nav className="p-4 text-sm space-y-1 flex-1 overflow-y-auto">
        <SidebarLink to="/">داشبورد</SidebarLink>

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

        {baseDataOpen && (
          <div className="mr-4 mt-1 space-y-1">
            <SidebarLink to="/province">استان‌ها</SidebarLink>
          </div>
        )}

        <SidebarLink to="/farmer">کشاورزان</SidebarLink>
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
        block px-4 py-2 rounded-lg transition
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
