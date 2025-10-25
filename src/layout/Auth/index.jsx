import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "../../views/auth";
import { HeroSection } from "../../components";

const AuthLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </div>
  );
};

export default AuthLayout;
