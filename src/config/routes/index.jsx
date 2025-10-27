import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import UserLayout from "../../layout/User";
import AuthLayout from "../../layout/Auth";
import AdminLayout from "../../layout/Admin";
import logo from "/logo.png";

const Root = () => {
  const { isAuthenticated, role, splashLoading } = useAuthContext();

  return (
    <div>
      {splashLoading ? (
        <div className="h-screen flex flex-col items-center justify-center text-white bg-black w-full">
          <img src={logo} className="animate-pulse " alt="" />
          <span className="text-secondary text-lg">
            Social Welfare Committee Loading....
          </span>
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
