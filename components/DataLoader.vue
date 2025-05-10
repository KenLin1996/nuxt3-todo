<!-- components/DataLoader.vue -->
<!-- <template>
  <div
    v-if="isLoading"
    class="fixed inset-0 flex flex-col items-center justify-center bg-white/60 z-50"
  >
    <div
      class="w-12 h-12 mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    ></div>
    <p class="text-lg font-semibold text-blue-700 tracking-wide">
      資料加載中，請稍候...
    </p>
  </div>

  <div
    v-else-if="hasError"
    class="fixed inset-0 flex flex-col items-center justify-center bg-white/60 z-50 text-center px-4"
  >
    <p class="text-xl font-semibold text-red-700 mb-4">
      {{ errorMessage || "無法取得資料，請點擊下方按鈕重試。" }}
    </p>
    <button
      @click="onRetry"
      class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded shadow transition duration-200"
    >
      重新嘗試
    </button>
  </div>

  <slot v-else />
</template> -->

<template>
  <!-- Loading 狀態 -->
  <div
    v-if="isLoading"
    class="fixed inset-0 flex flex-col items-center justify-center bg-white/60 z-50"
  >
    <div
      class="w-12 h-12 mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    ></div>
    <p
      class="text-xl font-semibold text-neutral-700 tracking-wide drop-shadow-sm"
    >
      正在載入資料...
    </p>
    <p class="text-sm text-gray-500 mt-1">請稍候片刻，我們正在準備內容</p>
  </div>

  <!-- 錯誤狀態 -->
  <div
    v-else-if="hasError"
    class="fixed inset-0 flex flex-col items-center justify-center bg-white/60 z-50 text-center px-4"
  >
    <div class="text-5xl mb-4 text-red-500">⚠️</div>
    <p
      class="text-xl font-semibold text-red-700 tracking-wide drop-shadow-sm mb-2"
    >
      {{ errorMessage || "資料載入失敗" }}
    </p>
    <p class="text-sm text-gray-500 mb-4">
      請檢查網路連線，或點擊下方按鈕重試。
    </p>
    <button
      @click="onRetry"
      class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded shadow transition duration-200"
    >
      重新嘗試
    </button>
  </div>

  <!-- 成功狀態 -->
  <slot v-else />
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  onRetry: () => void;
}>();
</script>
