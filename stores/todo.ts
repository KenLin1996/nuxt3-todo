import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid
import { ref, computed } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref([
    { id: uuidv4(), text: "完成 Nuxt 初始化", completed: false },
    { id: uuidv4(), text: "學會使用 Tailwind CSS", completed: true },
  ]);

  // 當前的篩選狀態
  const filterState = ref<"all" | "completed" | "active">("all");

  // 處理新增 Todo
  const addTodo = (text: string) => {
    if (!text) return;

    todos.value.push({
      id: uuidv4(), // 使用 uuid 生成唯一 ID
      text,
      completed: false,
    });
  };

  //  刪除 todo
  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter((t) => t.id !== id);
  };

  // 切換篩選狀態
  const setFilter = (value: typeof filterState.value) => {
    filterState.value = value;
  };

  // 根據 filter 傳回對應的 todos
  const filteredTodos = computed(() => {
    if (filterState.value === "completed") {
      return todos.value.filter((t) => t.completed);
    } else if (filterState.value === "active") {
      return todos.value.filter((t) => !t.completed);
    }
    return todos.value;
  });

  return {
    todos,
    filterState,
    filteredTodos,
    addTodo,
    deleteTodo,
    setFilter,
  };
});
