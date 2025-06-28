import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../api/AuthService";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const register = async (
    username: string,
    email: string,
    phone: string,
    timezone: string,
    password: string,
    confirmPassword: string
  ) => {
    await AuthService.register(username, email, phone, timezone, password, confirmPassword);
    navigate("/auth/login");
  };

  const login = async (username: string, password: string) => {
    const data = await AuthService.login(username, password);
    localStorage.setItem("access_token", data.access_token);
    setUser(data);
    navigate("/tasks");
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};
