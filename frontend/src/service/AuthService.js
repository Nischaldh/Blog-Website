import api from "../lib/api.js";

export const loginService = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data; 
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

export const signupService = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Signup failed",
    };
  }
};

export const getCurrentUserService = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch user data",
    };
  }
};


export const logoutService = () => {
  localStorage.removeItem("token");
};
