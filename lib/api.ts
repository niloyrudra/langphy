import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE || "http://192.168.1.5/api", // "https://api.example.com", // your gateway / auth service
  timeout: 10000,
});

/**
 * Attach token to every request
 */
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Handle expired / invalid token
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("accessToken");
      // optionally trigger logout event
    }

    return Promise.reject(error);
  }
);

export default api;