// composables/useTodoApi.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://fastapi-todo-backend-wzda.onrender.com",
  headers: {
    "Content-Type": "application/json", // 確保請求內容是 JSON 格式
  },
});

export const useTodoApi = () => {
  const getTodos = () => api.get("/todos");

  const addTodo = (todo: { text: string }) => api.post("/todos", todo);

  const updateTodo = (id: string, todo: { text: string; completed: boolean }) =>
    api.patch(`/todos/edit/${id}`, todo);

  const reorderTodos = (reorderedList: { id: string; order: number }[]) =>
    api.put("/todos/reorder", reorderedList);

  const deleteTodo = (id: string) => api.delete(`/todos/${id}`);

  return {
    getTodos,
    addTodo,
    updateTodo,
    reorderTodos,
    deleteTodo,
  };
};
