import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { IoMdNotifications } from "react-icons/io";

import useAuth from "../../../../hooks/useAuth";
import { axiosInstance } from "../../../../services/api";

const NavBar = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const { userId } = useAuth();

  console.log(" run run");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get(`/api/user/${userId}/`);
      setUsername(response.data.username);
    };
    fetchUser();
  }, []);

  const handleClick = () => {
    localStorage.setItem("FINTECH_JWT_ACCESS_TOKEN", "");
    navigate("/");
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <Link to="/user" className="flex items-center">
            <img
              src="../../icon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Fintech"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              fintech
            </span>
          </Link>
          <div className="flex items-center">
            <Link
              href="tel:5541251234"
              className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline"
            >
              <IoMdNotifications className="text-2xl" />
            </Link>
            <Link
              href="tel:5541251234"
              className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline"
            >
              {username}
            </Link>
            <button
              onClick={handleClick}
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
