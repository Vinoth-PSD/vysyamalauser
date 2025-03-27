// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// interface RegistrationProtectedRouteProps {
//   redirectTo: string; // Type for the redirect URL
// }

// const RegistrationProtectedRoute: React.FC<RegistrationProtectedRouteProps> = ({
//   redirectTo,
// }) => {
//   const profileId = localStorage.getItem("profile_id");

//   // If user does not have profile_id_new, redirect to the specified route
//   if (!profileId) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   // If user has profile_id_new, render the protected component
//   return <Outlet />;
// };

// export default RegistrationProtectedRoute;





import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RegistrationProtectedRouteProps {
  redirectTo: string; // Redirect URL
}

const RegistrationProtectedRoute: React.FC<RegistrationProtectedRouteProps> = ({ redirectTo }) => {
  // Use localStorage instead of sessionStorage
  const [profileId, setProfileId] = useState<string | null>(
    localStorage.getItem("profile_id")
  );

  useEffect(() => {
    const checkProfileStatus = () => {
      setProfileId(localStorage.getItem("profile_id"));
    };

    // Listen for profile ID changes across tabs
    window.addEventListener("storage", checkProfileStatus);
    return () => window.removeEventListener("storage", checkProfileStatus);
  }, []);

  if (!profileId) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default RegistrationProtectedRoute;

