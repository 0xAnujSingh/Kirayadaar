import React from "react";
import Navbar from "./Navbar/Navbar";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = ({ user }) => {
  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="max-w-5xl mx-auto py-4">
      <Outlet context={{ user }} />
      </div>
    </div>
  );
};

export default PrivateRoutes;
