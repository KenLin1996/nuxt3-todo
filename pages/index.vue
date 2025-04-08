<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../stores/todo.ts";
import { storeToRefs } from "pinia";

// Todo 輸入欄位的內容
const todoText = ref<string>("");

const todoStore = useTodoStore();

// 切換狀態、刪除功能
const { toggleTodo, deleteTodo } = todoStore;

const { todos } = storeToRefs(todoStore);

// 處理新增 Todo
const addTodo = () => {
  const text = todoText.value.trim();
  if (!text) return;

  todoStore.addTodo(text);
  todoText.value = "";
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-center mb-4">📝 Nuxt 3 Todo List</h1>

    <!-- 輸入 Todo -->
    <div class="flex gap-2 mb-2 justify-center">
      <input
        v-model="todoText"
        type="text"
        class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="請輸入待辦事項..."
      />
      <button
        @click="addTodo"
        class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 cursor-pointer"
      >
        新增
      </button>
    </div>

    <!-- 顯示 Todo 清單 -->
    <div>
      <ul class="space-y-2">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center justify-between bg-white p-2 rounded shadow"
        >
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="todo.completed" />
            <span :class="{ 'line-through text-gray-400': todo.completed }">
              {{ todo.text }}
            </span>
          </label>
          <button
            @click="deleteTodo(todo.id)"
            class="text-red-500 hover:text-red-700"
          >
            刪除
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
