import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <div className="content-wrap">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
