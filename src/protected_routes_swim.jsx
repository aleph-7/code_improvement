import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth"; // Replace with your auth hook

const ProtectedRoute_Swimming = () => {
  const { isAuthenticated } = useAuth();
  var category = localStorage.getItem("category");
  var type = localStorage.getItem("type_of_sport");
  console.log("category", category);

  if (isAuthenticated === null) {
    return null; // or a loading spinner or any other placeholder
  }

  if (category != "5" || type != "swimming") {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute_Swimming;
