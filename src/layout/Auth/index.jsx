import React from "react";
import { Route, Routes } from "react-router-dom";
import { CourseFormScreen, LoginScreen } from "../../views/auth";
import { HeroSection } from "../../components";

const AuthLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/course-form" element={<CourseFormScreen />} />
      </Routes>
    </div>
  );
};

export default AuthLayout;
