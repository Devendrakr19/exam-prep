import authStore from "@/app/store/authStore";
import axios from "axios"; 

// Create axios instance
const RefreshToken = axios.create({
  baseURL: "/api",
  withCredentials: true, // sends HttpOnly refresh token cookie automatically
});

// Attach access token to every request
RefreshToken.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle expired access token automatically
RefreshToken.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint (refresh token sent via HttpOnly cookie)
        const refreshRes = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        const { accessToken } = refreshRes.data;

        // Save new access token
        localStorage.setItem("accessToken", accessToken);
        authStore.setState({ accessToken: accessToken });

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return RefreshToken(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout user
        authStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default RefreshToken;
