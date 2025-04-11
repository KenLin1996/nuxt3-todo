<script setup lang="ts">
defineProps<{
  filter: "all" | "active" | "completed";
}>();
</script>

<template>
  <div class="text-center text-gray-500 py-6">
    <p v-if="filter === 'all'">快去新增點內容吧</p>
    <p v-else-if="filter === 'active'">目前沒有未完成項目</p>
    <p v-else-if="filter === 'completed'">目前沒有已完成項目</p>
  </div>
</template>
