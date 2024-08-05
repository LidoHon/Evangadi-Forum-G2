import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const NavLinks = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/users/check", {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data?.msg || error.message
        );
      }
    };

    fetchUser();
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      setUsername(null);
      navigate("/");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data?.msg || error.message
      );
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Link
        to="/"
        className="text-sm font-medium mx-5 my-2 hover:text-gray-500"
      >
        Home
      </Link>
      <Link
        to="/"
        className="text-sm font-medium mx-5 my-2 hover:text-gray-500"
      >
        How it works
      </Link>
      {username ? (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-sm cursor-pointer px-4 py-2 rounded-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none"
          >
            {username}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-20">
              <Link
                to="/update-profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="text-sm cursor-pointer px-5 md:px-10 pt-2 mx-2 bg-blue-600 rounded-full text-white baseline hover:bg-blue-800"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default NavLinks;
