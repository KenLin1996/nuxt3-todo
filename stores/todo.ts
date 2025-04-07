import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid
import { ref } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref([
    { id: uuidv4(), text: "完成 Nuxt 初始化", completed: false },
    { id: uuidv4(), text: "學會使用 Tailwind CSS", completed: true },
  ]);

  // 處理新增 Todo
  const addTodo = (text: string) => {
    if (!text) return;

    todos.value.push({
      id: uuidv4(), // 使用 uuid 生成唯一 ID
      text,
      completed: false,
    });
  };

  return {
    todos,
    addTodo,
  };
});
