<!-- pages/index.vue -->
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useTodoStore } from "../stores/todo";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";

// 狀態管理
const todoStore = useTodoStore();
const { fetchTodos, add, remove, setFilter, toggle, edit, reorder } = todoStore;
const { todos, filterState } = storeToRefs(todoStore);

// 編輯相關狀態（以 id 為 key 存 edit 狀態）
const editingId = ref<string | null>(null);
const editingText = ref<string>("");

const editingInputRef = ref<HTMLInputElement | null>(null);

// 新增 Todo
const addTodo = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return;

  add(trimmed);
};

// 根據篩選條件來判斷 Todo 是否顯示
const shouldDisplay = (todo: { completed: boolean }) => {
  if (filterState.value === "completed") {
    return todo.completed;
  } else if (filterState.value === "active") {
    return !todo.completed;
  }
  return true;
};

// 編輯功能
const startEdit = (todo: { id: string; text: string }) => {
  editingId.value = todo.id;
  editingText.value = todo.text;

  nextTick(() => {
    editingInputRef.value?.focus();
  });
};

const saveEdit = async (id: string) => {
  if (!editingText.value.trim()) return;

  await edit(id, editingText.value.trim());
  editingId.value = null;
};

const cancelEdit = () => (editingId.value = null);

// 刪除 todo
const deleteTodo = (id: string) => {
  remove(id);
};

const onDragEnd = () => {
  const newOrderList = todos.value.map((todo, index) => ({
    id: todo.id,
    order: index + 1,
  }));

  reorder(newOrderList);
};

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-center mb-4">📝 Nuxt 3 Todo List</h1>

    <!-- 狀態篩選 -->
    <div class="flex justify-center space-x-2 mb-4">
      <button
        @click="setFilter('all')"
        :class="
          filterState === 'all' ? 'text-blue-500 font-bold' : 'text-gray-500'
        "
      >
        全部
      </button>
      <button
        @click="setFilter('active')"
        :class="
          filterState === 'active' ? 'text-blue-500 font-bold' : 'text-gray-500'
        "
      >
        未完成
      </button>
      <button
        @click="setFilter('completed')"
        :class="
          filterState === 'completed'
            ? 'text-blue-500 font-bold'
            : 'text-gray-500'
        "
      >
        已完成
      </button>
    </div>

    <!-- 輸入 Todo -->
    <div class="flex gap-2 mb-4 justify-center">
      <TodoForm :onSubmitTodo="addTodo" submitText="新增" />
    </div>

    <!-- 顯示 Todo 清單 -->
    <div v-if="todoStore.filteredTodos.length > 0">
      <ul class="space-y-2">
        <draggable
          v-model="todos"
          item-key="id"
          class="space-y-2 flex flex-col items-center"
          ghost-class="opacity-50"
          @end="onDragEnd"
        >
          <template #item="{ element: todo }">
            <li
              v-if="shouldDisplay(todo)"
              class="flex items-center justify-between p-2 bg-white rounded shadow w-[75%]"
            >
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  :checked="todo.completed"
                  class="form-checkbox"
                  @click="toggle(todo.id)"
                />
                <!-- 編輯模式 -->
                <div
                  v-if="editingId === todo.id"
                  class="flex items-center gap-2 border border-1 border-gray-300 px-2 py-1 rounded"
                >
                  <input
                    ref="editingInputRef"
                    v-model="editingText"
                    @keydown.enter="saveEdit(todo.id)"
                    @keydown.esc="cancelEdit"
                    @blur="cancelEdit"
                    class="outline-none"
                  />
                  <kbd
                    @click="saveEdit(todo.id)"
                    class="text-xs bg-gray-500/75 px-1 py-[2px] rounded text-white cursor-pointer"
                  >
                    Enter
                  </kbd>
                </div>
                <!-- 顯示模式 -->
                <span
                  v-else
                  @dblclick="startEdit(todo)"
                  :class="{ 'line-through text-gray-400': todo.completed }"
                >
                  {{ todo.text }}
                  {{ todo.order }}
                </span>
              </div>
              <button
                @click="deleteTodo(todo.id)"
                class="text-red-500 hover:text-red-700"
              >
                刪除
              </button>
            </li>
          </template>
        </draggable>
      </ul>
    </div>
    <TodoEmptyMessage v-else :filter="todoStore.filterState" />
  </div>
</template>
