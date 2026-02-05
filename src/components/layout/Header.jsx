import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth.api";

function Header() {
  const navigate = useNavigate();

  // state برای نگهداری اطلاعات کاربر
  const [user, setUser] = useState(null);

  // خواندن اطلاعات کاربر از localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("LOGOUT ERROR", error);
    }
  };

  return (
    <header
      className="
        h-16 bg-white
        flex items-center
        px-6
      "
    >
      {/* Right side - Welcome */}
      <h2 className="font-semibold text-slate-800">
        {user ? `${user.fullname} خوش آمدید!` : "پنل مدیریت هاویرکشت"}
      </h2>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Left side - Logout */}
      <button
        onClick={handleLogout}
        className="
          text-red-600 text-sm
          hover:underline
          transition
        "
      >
        خروج
      </button>
    </header>
  );
}

export default Header;
