// stores/user.ts
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const { $apiAuth } = useNuxtApp();

    const token = ref<string | null>(null);
    const username = ref<string | null>("");

    const isLoggedIn = computed(() => !!token.value);

    const profile = async () => {
      if (!isLoggedIn.value) return;

      try {
        // const res = await $apiAuth.get("/api/user/profile");
        const res = await $apiAuth.get("/profile");
        username.value = res.data.name;
      } catch (error) {
        console.log(error);
        token.value = null;
        username.value = "";
      }
    };

    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    const logout = () => {
      token.value = null;
      username.value = "";
    };

    return {
      token,
      username,
      isLoggedIn,
      setToken,
      logout,
      profile,
    };
  },
  {
    // persist: {
    //   pick: ["token", "username"], // optional: localStorage 的 key 名稱
    // },
    // persist: {
    //   key: "token", // optional: localStorage 的 key 名稱
    // },
    persist: true,
  }
);
