<!-- layouts/default.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 text-gray-800"
  >
    <nav
      class="fixed w-full bg-white/70 backdrop-blur-md shadow-sm border-b border-blue-200 z-50"
    >
      <div
        class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between"
      >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-2xl font-bold text-blue-700 tracking-wide hover:text-blue-900 transition"
        >
          NTL
        </NuxtLink>

        <!-- 導覽連結 -->
        <div class="flex items-center justify-center space-x-4">
          <template v-if="isLogged">
            <!-- <p class="font-medium text-sm">歡迎回來, {{ user.username }}</p> -->

            <p class="text-blue-400 font-semibold text-lg px-3 py-1">
              <span>歡迎回來，</span> {{ user.username }}
            </p>

            <!-- <p
              class="text-blue-600 text-sm font-medium bg-blue-100 px-2.5 py-0.5 rounded-full"
            >
              歡迎回來, {{ user.username }}
            </p> -->

            <button
              @click="logoutFunc"
              class="text-blue-700 cursor-pointer hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-1.5 rounded-md font-medium transition"
            >
              登出
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-blue-700 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-1.5 rounded-md font-medium transition"
            >
              登入
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>

    <main class="pt-20 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import { navigateTo } from "#app";
import { computed, onMounted, watch } from "vue";

const { logout } = useUserStore();
const user = useUserStore();

const isLogged = computed(() => user.isLoggedIn);

const logoutFunc = async () => {
  try {
    await logout();
    navigateTo("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// 監控登入狀態變化，當用戶登入時自動調用 profile 方法
watch(
  () => user.isLoggedIn,
  async (newVal) => {
    if (newVal) {
      await user.profile();
    }
  },
  { immediate: true }
);

// 頁面加載時檢查用戶狀態
onMounted(() => {
  if (user.isLoggedIn) {
    user.profile();
  }
});
</script>
