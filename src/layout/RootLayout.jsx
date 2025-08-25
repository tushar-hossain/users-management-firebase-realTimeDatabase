import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
