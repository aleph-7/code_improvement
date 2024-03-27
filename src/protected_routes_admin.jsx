import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth"; // Replace with your auth hook

const ProtectedRoute_Admin = () => {
  const { isAuthenticated } = useAuth();
  var category = localStorage.getItem("category");
  console.log("category", category);

  if (isAuthenticated === null) {
    return null; // or a loading spinner or any other placeholder
  }

  if (category != "6") {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute_Admin;
