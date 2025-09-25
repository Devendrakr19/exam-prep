import { create } from "zustand";
import axios from "axios"; 

const authStore = create((set) => ({
  user: null,
  accessToken: null,
  loading: false,
  error: null,

  login: async (formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("/api/auth/login", formData);
      const { user, accessToken } = res.data;

      set({ user, accessToken, loading: false });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Login failed",
        loading: false,
      });
    }
  },

  signup: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/api/auth/signup", formData);
      set({ loading: false });
      console.log("singup ", res);
    } catch (error) {
      set({
        error: error.response?.data?.error || "Signup failed",
        loading: false,
      });
    }
  },
  
  logout: async () => {
    set({ user: null, token: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    await axios.post("/api/auth/logout");
  },
}));

export default authStore;
