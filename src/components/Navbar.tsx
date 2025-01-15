import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useState, useEffect } from "react";
import { logout } from "../slices/authSlice"; // Replace with your logout action
import axios from "axios";

const Navbar: React.FC = () => {
  const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/logout");

      if (res.status === 200) {
        dispatch(logout());
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Optional: Close dropdown on outside click
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <>
      <nav className="w-full border-b-2 py-3 bg-gray-100">
        <div className="max-w-screen-2xl mx-auto items-center px-4 lg:flex lg:px-8">
          <div className="flex w-full items-center justify-between">
            <Link to="/">
              <h1 className="ml-8 text-3xl font-bold text-primary cursor-pointer">
                Khabartalash Dashboard
              </h1>
            </Link>

            <div className="flex justify-center items-center gap-4">
              {adminInfo && (
                <div className="relative dropdown">
                  {/* Dropdown Trigger */}
                  <p
                    className="text-xl cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    Welcome, {adminInfo.firstName}
                  </p>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
