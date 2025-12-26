import { CommonButton } from "../../components";
import { useAuthContext } from "../../context/AuthContext";

import { Link, Route, Routes } from "react-router-dom";
import {
  AdminCampusScreen,
  AdminCourseScreen,
  AdminDashboardScreen,
  AdminEventScreen,
  AdminParticipantsScreen,
} from "../../views/admin";

const AdminLayout = () => {
  const { logout } = useAuthContext();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 hidden laptop-sm:block bg-gray-800 text-white p-4">
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
          <Link to="/admin/participants" className="block hover:underline">
            Participants
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
          <Route path="/courses" element={<AdminCourseScreen />} />
          <Route path="/campus" element={<AdminCampusScreen />} />
          <Route path="/events" element={<AdminEventScreen />} />
          <Route path="/participants" element={<AdminParticipantsScreen />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
