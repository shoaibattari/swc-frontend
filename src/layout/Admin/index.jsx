import { CommonButton } from "../../components";
import {
  AdminCoursesScreen,
  AdminDashboardScreen,
  AdminEventsScreen,
} from "../../components/admin";
import { useAuthContext } from "../../context/AuthContext";

import { Link, Route, Routes } from "react-router-dom";
import { AdminCampusScreen } from "../../views/admin";

const AdminLayout = () => {
  const { logout } = useAuthContext();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Dashbaord</h2>

        <nav className="space-y-2">
          <Link to="/admin" className="block hover:underline">
            Dashboard
          </Link>
          <Link to="/admin/campus" className="block hover:underline">
            Campus
          </Link>
          <Link to="/admin/courses" className="block hover:underline">
            Courses
          </Link>
          <Link to="/admin/events" className="block hover:underline">
            Events
          </Link>
        </nav>
        <div className="mt-6">
          <CommonButton onClick={logout}>Logout</CommonButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/*" element={<AdminDashboardScreen />} />
          <Route path="/courses" element={<AdminCoursesScreen />} />
          <Route path="/events" element={<AdminEventsScreen />} />
          <Route path="/campus" element={<AdminCampusScreen />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
