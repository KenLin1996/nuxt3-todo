import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid
import { ref, computed, watch, onMounted } from "vue";

// localStorage Key
const STORAGE_KEY = "MY_NUXT_TODO_LIST";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<{ id: string; text: string; completed: boolean }[]>([]);
  //   const todos = ref([
  //     { id: uuidv4(), text: "完成 Nuxt 初始化", completed: false },
  //     { id: uuidv4(), text: "學會使用 Tailwind CSS", completed: true },
  //   ]);

  // 初始化時從 localStorage 讀取
  const loadLocalStorageTodos = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        todos.value = JSON.parse(stored);
      } catch (error) {
        console.error("載入 localStorage 失敗", error);
      }
    } else {
      // 初始預設資料
      todos.value = [
        { id: uuidv4(), text: "完成 Nuxt 初始化", completed: false },
        { id: uuidv4(), text: "學會使用 Tailwind CSS", completed: true },
      ];
    }
  };

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

  // 自動 watch todos，更新 localStorage
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    },
    { deep: true }
  );

  // 初始化讀取 LocalStorage
  //   loadLocalStorageTodos();

  // 在組件掛載後讀取 LocalStorage
  onMounted(() => {
    loadLocalStorageTodos();
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
