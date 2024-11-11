import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import checkAuth from "./auth";
import Login from "./pages/Login/Login.js";
import Layout from "./Layout/Layout.js";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const token = checkAuth();
  console.log("dfghcvbnvbn", token);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Place new routes over this */}
        <Route path="/app/*" element={<Layout />} />

        <Route
          path="*"
          element={
            <Navigate to={token ? "/app/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
