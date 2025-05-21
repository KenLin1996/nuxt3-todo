<!-- pages/register.vue -->
<template>
  <div
    class="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg border border-blue-100"
  >
    <h1 class="text-3xl font-bold mb-6 text-blue-700 text-center">註冊帳號</h1>
    <form @submit.prevent="handleRegister" class="space-y-5" autocomplete="off">
      <input
        v-model="form.name"
        type="text"
        placeholder="使用者名稱"
        class="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="電子郵件"
        class="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="密碼"
        class="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        註冊
      </button>
    </form>
    <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const { $api } = useNuxtApp();
const router = useRouter();
const userStore = useUserStore();

const form = ref({
  name: "",
  email: "",
  password: "",
});

const error = ref("");

const handleRegister = async () => {
  try {
    // const res = await $api.post("/api/user/register", form.value);
    const res = await $api.post("/register", form.value);
    userStore.setToken(res.data.access_token);
    console.log("123");
    router.push("/todos");
  } catch (err: any) {
    error.value = err.response?.data?.detail || "註冊失敗，請再試一次";
  }
};
</script>
