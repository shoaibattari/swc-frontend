import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import UserLayout from "../../layout/User";
import AuthLayout from "../../layout/Auth";
import AdminLayout from "../../layout/Admin";
import logo from "/logo.png";

const Root = () => {
  const { isAuthenticated, role, splashLoading } = useAuthContext();

  return (
    <div className="relative min-h-screen bg-white font-outfit">
      {splashLoading ? (
        /* --- ELITE SPLASH SCREEN --- */
        <div className="h-screen flex flex-col items-center justify-center bg-white w-full relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green/10 rounded-full blur-[80px]" />

          <div className="relative flex flex-col items-center animate-fade-in-scale">
            <img
              src={logo}
              className="h-32 md:h-40 mb-8 animate-pulse grayscale-[0.2]"
              alt="OMJ Logo"
            />

            <div className="flex flex-col items-center gap-3">
              <h1 className="text-2xl font-black text-grey tracking-tight">
                OKHAI MEMON JAMAT
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-green rounded-full animate-bounce" />
                <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                  Social Welfare Committee
                </span>
                <div className="h-1 w-12 bg-green rounded-full animate-bounce delay-100" />
              </div>
            </div>
          </div>

          {/* Loading Progress Bar Style */}
          <div className="absolute bottom-20 w-48 h-1 bg-lightGray rounded-full overflow-hidden">
            <div className="h-full bg-green animate-[loading_2s_ease-in-out_infinite] w-1/2" />
          </div>
        </div>
      ) : (
        <>
          <main className="">
            <Routes>
              <Route
                path="/*"
                element={
                  isAuthenticated && role === "user" ? (
                    <Navigate to="/user/students" replace />
                  ) : isAuthenticated && role === "admin" ? (
                    <Navigate to="/admin/students" replace />
                  ) : (
                    <AuthLayout />
                  )
                }
              />
              <Route
                path="/auth/*"
                element={
                  isAuthenticated ? (
                    <Navigate to="/user" replace />
                  ) : (
                    <AuthLayout />
                  )
                }
              />
              <Route
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
          </main>

          <footer className="w-full bg-grey text-white py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8 mb-10 text-center md:text-left border-b border-white/10 pb-10">
                {/* Brand Column */}
                <div className="flex flex-col items-center md:items-start">
                  <img src={logo} className="h-16 mb-4" alt="OMJ Logo" />
                  <p className="text-light-grey text-sm leading-relaxed max-w-xs">
                    Empowering the community through digital innovation and
                    social welfare initiatives since our foundation.
                  </p>
                </div>

                {/* Developer Column */}
                <div className="flex flex-col items-center">
                  <h4 className="text-green font-bold mb-4 uppercase tracking-widest text-xs">
                    Developed By
                  </h4>
                  <a
                    className="group flex flex-col items-center transition-all"
                    href="https://wa.me/+923313416850"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-lg font-bold group-hover:text-green">
                      Shoaib Abdul Sattar Khosa
                    </span>
                    <span className="text-light-grey text-xs group-hover:underline">
                      Vice Chairman (OMJ IT Committee)
                    </span>
                    <span className="text-light-grey text-xs group-hover:underline">
                      Seceratory (OMJ Social Welfare Committee)
                    </span>
                  </a>
                </div>

                {/* Committee Column */}
                <div className="flex flex-col items-center md:items-end">
                  <h4 className="text-blue font-bold mb-4 uppercase tracking-widest text-xs">
                    Organization
                  </h4>
                  <p className="font-bold">Okhai Memon Jamat</p>
                  <p className="text-sm text-light-grey">
                    Social Welfare Committee
                  </p>
                </div>
              </div>

              {/* Copyright Row */}
              <div className="flex flex-col md:flex-row justify-between w-full items-center gap-4">
                <p className="text-mediumGray text-xs">
                  © {new Date().getFullYear()} OMJ Social Welfare. All Rights
                  Reserved.
                </p>
                <div className="flex gap-6">
                  <span className="text-[10px] text-mediumGray uppercase tracking-widest font-bold">
                    Privacy Policy
                  </span>
                  <span className="text-[10px] text-mediumGray uppercase tracking-widest font-bold">
                    Terms of Service
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Root;
