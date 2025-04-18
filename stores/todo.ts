// stores/todo.ts
import { ref, computed } from "vue";
import { useTodoApi } from "../composables/useTodoApi";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<
    { id: string; text: string; completed: boolean; order: number }[]
  >([]);

  const isLoading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref<string>("");

  const { getTodos, addTodo, updateTodo, reorderTodos, deleteTodo } =
    useTodoApi();

  // 當前的篩選狀態
  const filterState = ref<"all" | "completed" | "active">("all");

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

  // 從後端獲取 todos
  const fetchTodos = async () => {
    isLoading.value = true;
    hasError.value = false;
    errorMessage.value = "";
    try {
      const res = await getTodos();
      todos.value = res.data.sort((a: any, b: any) => a.order - b.order);
    } catch (err: any) {
      hasError.value = true;
      errorMessage.value = err.message || "無法取得資料，請稍後再試";
    } finally {
      isLoading.value = false;
    }
  };

  // 新增 Todo
  const add = async (text: string) => {
    if (!text) return;

    const res = await addTodo({ text });
    const newTodo = Array.isArray(res.data) ? res.data[0] : res.data;

    todos.value.unshift(newTodo);
  };

  //  刪除 todo
  const remove = async (id: string) => {
    await deleteTodo(id);

    todos.value = todos.value.filter((t) => t.id !== id);
  };

  // 切換 todo 完成狀態
  const toggle = async (id: string) => {
    const todo = todos.value.find((t) => t.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    await updateTodo(id, { text: todo.text, completed: todo.completed });
  };

  // 編輯 todo 內容
  const edit = async (id: string, newText: string) => {
    const todo = todos.value.find((t) => t.id == id);
    if (!todo) return;

    todo.text = newText;
    await updateTodo(id, { text: todo.text, completed: todo.completed });
  };

  //  拖曳後更新排序
  const reorder = async (newOrderList: { id: string; order: number }[]) => {
    await reorderTodos(newOrderList);
    todos.value = [...todos.value];
  };

  return {
    todos,
    isLoading,
    hasError,
    errorMessage,
    filterState,
    filteredTodos,
    fetchTodos,
    add,
    remove,
    toggle,
    setFilter,
    edit,
    reorder,
  };
});
