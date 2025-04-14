// stores/todo.ts
import { ref, computed } from "vue";
import { useTodoApi } from "../composables/useTodoApi";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<{ id: string; text: string; completed: boolean }[]>([]);

  const { getTodos, addTodo, updateTodo, deleteTodo } = useTodoApi();

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
    const res = await getTodos();
    todos.value = res.data;
  };

  // 新增 Todo
  const add = async (text: string) => {
    if (!text) return;

    const res = await addTodo({ text });
    todos.value.push(res.data);
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

  return {
    todos,
    filterState,
    filteredTodos,
    fetchTodos,
    add,
    remove,
    toggle,
    setFilter,
    edit,
  };
});
