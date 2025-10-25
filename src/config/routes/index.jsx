import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import UserLayout from "../../layout/User";
import AuthLayout from "../../layout/Auth";
import AdminLayout from "../../layout/Admin";

const Root = () => {
  const { isAuthenticated, role, splashLoading } = useAuthContext();

  return (
    <div>
      {splashLoading ? (
        <div className="h-screen flex items-center justify-center text-white bg-black w-full">
          Loading....
        </div>
      ) : (
        <Routes>
          <Route
            exact
            path="/*"
            element={
              isAuthenticated && role === "user" ? (
                <Navigate to="/user" replace />
              ) : isAuthenticated && role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <AuthLayout />
              )
            }
          />
          <Route
            exact
            path="/auth/*"
            element={
              isAuthenticated ? <Navigate to="/user" replace /> : <AuthLayout />
            }
          />
          <Route
            exact
            path="/user/*"
            element={
              isAuthenticated && role === "user" ? (
                <UserLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            exact
            path="/admin/*"
            element={
              isAuthenticated && role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default Root;
