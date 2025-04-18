<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  onRetry: () => void;
}>();
</script>
<template>
  <div v-if="isLoading" class="flex flex-col items-center justify-center py-8">
    <div
      class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"
    ></div>
    <p class="text-gray-700">Loading...</p>
  </div>

  <div v-else-if="hasError" class="text-center py-8">
    <p class="text-black py-6 text-xl">
      {{ errorMessage || "無法取得資料，請點擊 Retry" }}
    </p>
    <button
      @click="onRetry"
      class="bg-red-500 text-white px-4 py-2 rounded animate-pulse hover:bg-red-600 hover:animate-none cursor-pointer"
    >
      Retry
    </button>
  </div>
  <slot v-else />
</template>
