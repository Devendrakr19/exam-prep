import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("/api/auth/login", formData);
      const { user, token } = res.data;
      set({ user, token, loading: false });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
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
        error: err.response?.data?.error || "Signup failed",
        loading: false,
      });
    }
  },
  
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
}));

export default authStore;
