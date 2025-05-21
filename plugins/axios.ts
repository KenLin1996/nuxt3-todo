import axios from "axios";
import { useUserStore } from "../stores/user";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "https://fastapi-todo-backend-wzda.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const apiAuth = axios.create({
    baseURL: "https://fastapi-todo-backend-wzda.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiAuth.interceptors.request.use((config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  });

  // 回應攔截器
  apiAuth.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized access - redirecting to login");
      }
      return Promise.reject(error);
    }
  );

  // 使用 `nuxtApp` 提供 API
  nuxtApp.provide("api", api);
  nuxtApp.provide("apiAuth", apiAuth);
});
