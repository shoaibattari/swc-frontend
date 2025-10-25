import React from "react";
import { CommonButton } from "../../components";
import { useAuthContext } from "../../context/AuthContext";
import { Link, Route, Routes } from "react-router-dom";
import { UserCoursesScreen, UserDashboardScreen } from "../../components/user";

const UserLayout = () => {
  const { logout } = useAuthContext();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Dashbaord</h2>

        <nav className="space-y-2">
          <Link to="/user" className="block hover:underline">
            Dashboard
          </Link>
          <Link to="/user/courses" className="block hover:underline">
            Courses
          </Link>
        </nav>
        <div className="mt-6">
          <CommonButton onClick={logout}>Logout</CommonButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/*" element={<UserDashboardScreen />} />
          <Route path="/courses" element={<UserCoursesScreen />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserLayout;
