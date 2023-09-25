import React from "react";
import { useContext } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContext } from "contexts/AuthContext";

import AdminLayout from "layouts/Admin/Admin.js";
import Login from "layouts/Login/Login";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div>
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Routes>
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />{" "}
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    </div>
  );
}

export default App;
