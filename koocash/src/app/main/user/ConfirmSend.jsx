import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../services/api";
import jwt_decode from "jwt-decode";
import useAuth from "../../../hooks/useAuth";

import UserNav from "./components/UserNav";

const ConfirmSend = () => {
  const [user, setUser] = useState(null);

  const { userId } = useAuth();

  const { to, amount } = useParams();

  const navigate = useNavigate();

  const search = async (val) => {
    const res = await axiosInstance.get(`/api/username/${to}/`);

    setUser(res.data);
    console.log(user);
    console.log(user?.id);
  };

  useEffect(() => {
    search(to);
  }, [to]);

  const userToken = localStorage.getItem("FINTECH_JWT_ACCESS_TOKEN");

  // const decoded = jwt_decode(userToken);

  console.log("sender :" + decoded.user_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("account", userId);
    formData.append("to_user", user.id);
    formData.append("amount", amount);
    try {
      const response = await axiosInstance.post("/api/send/", formData);
      console.log(response.status);
      if (response.status == 201) {
        navigate("/user/success");
      }
    } catch (error) {
      console.log(error);
      navigate("/user/denied");
    }
  };

  return (
    <>
      <UserNav />
      <div className="text-center mt-4">
        <h1 className="text-xl">Confirm You Want to Send</h1>
        <h2> {amount} Ksh</h2>
        <h2>To</h2>
        {user && <h2 className="text-xl"> {user.username} </h2>}

        <form onSubmit={handleSubmit} className="mt-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ConfirmSend;
