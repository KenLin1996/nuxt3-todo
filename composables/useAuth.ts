// composables/useAuth.ts
// import axios from "axios";
import { useUserStore } from "../stores/user";

// const api = axios.create({
//   baseURL: "https://fastapi-todo-backend-wzda.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const useAuth = () => {
  const { $api } = useNuxtApp();

  const userStore = useUserStore();

  const login = async (email: string, password: string) => {
    try {
      // const res = await $api.post("/api/user/login", {
      const res = await $api.post("/login", {
        email,
        password,
      });

      userStore.setToken(res.data.access_token);
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await $api.post("api/user/register", {
        email,
        password,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    login,
    register,
  };
};
