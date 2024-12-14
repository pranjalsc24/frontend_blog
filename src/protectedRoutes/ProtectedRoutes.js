import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let islogin = localStorage.getItem("BlogVerse-token");
  return <>{islogin ? <Outlet /> : <Navigate to="login" />}</>;
};

export default ProtectedRoutes;
