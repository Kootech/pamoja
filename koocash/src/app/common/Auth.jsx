import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../main/main/components/NavBar";
// import useAuth from "../../hooks/useAuth";
// import { useState } from "react";

const Auth = () => {
  // const { userId } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Outlet />
      {/* {userId ? (
        <>
          <NavBar />
          <Outlet />
        </>
      ) : (
        navigate("/login")
      )} */}
    </>
  );
};

export default Auth;
