import {
  loginService,
  logoutService,
  signupService,
  getCurrentUserService,
} from "@/service/AuthService";
import { createContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await getCurrentUserService();
        if (res.success) {
          setUser(res.user);
          setIsAuthenticated(true);
        } else {
          
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await loginService(credentials);

      if (res.success) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        toast.success("Login successful! Welcome back.");
      } else {
        toast.error(res.message || "Login failed. Please try again.");
      }

      return res;
    } catch (error) {
      console.log("Error occured: ", error);
      toast.error("An error occurred during login.");
      return { success: false, message: "An error occurred" };
    }
  };

  const signup = async (data) => {
    try {
      const res = await signupService(data);

      if (res.success) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        toast.success("Account created successfully! Welcome aboard.");
      } else {
        toast.error(res.message || "Signup failed. Please try again.");
      }

      return res;
    } catch (error) {
      console.log("Error occured: ", error);
      toast.error("An error occurred during signup.");
      return { success: false, message: "An error occurred" };
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setIsAuthenticated(false);
    toast.info("You have been logged out.");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
