import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../landing/components/NavBar";

const LandingLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default LandingLayout;
