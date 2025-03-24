import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RegistrationProtectedRouteProps {
  redirectTo: string; // Type for the redirect URL
}

const RegistrationProtectedRoute: React.FC<RegistrationProtectedRouteProps> = ({
  redirectTo,
}) => {
  const profileId = sessionStorage.getItem("profile_id");

  // If user does not have profile_id_new, redirect to the specified route
  if (!profileId) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user has profile_id_new, render the protected component
  return <Outlet />;
};

export default RegistrationProtectedRoute;
