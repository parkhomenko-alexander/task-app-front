import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import TasksPage from "../pages/TasksPage";

export const AppRoutes = () => {
  const auth = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={
        auth.user
          ? <Navigate to="/tasks" replace />
          : <Navigate to="/auth/login" replace />
      } />

      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/tasks" element={<TasksPage />} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
