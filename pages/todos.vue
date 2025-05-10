<!-- pages/todos.vue -->
<template>
  <DataLoader
    :isLoading="todoStore.isLoading"
    :hasError="todoStore.hasError"
    :errorMessage="todoStore.errorMessage"
    :onRetry="retry"
  >
    <div class="max-w-3xl mx-auto px-4 py-12 text-center">
      <h1 class="text-5xl font-extrabold mb-8 text-gray-800 tracking-tight">
        我的清單
      </h1>

      <!-- 狀態篩選 -->
      <div class="flex justify-center gap-4 mb-6">
        <button
          @click="setFilter('all')"
          :class="
            filterState === 'all' ? activeFilterClass : inactiveFilterClass
          "
        >
          全部
        </button>
        <button
          @click="setFilter('active')"
          :class="
            filterState === 'active' ? activeFilterClass : inactiveFilterClass
          "
        >
          未完成
        </button>
        <button
          @click="setFilter('completed')"
          :class="
            filterState === 'completed'
              ? activeFilterClass
              : inactiveFilterClass
          "
        >
          已完成
        </button>
      </div>

      <!-- 輸入 Todo -->
      <div class="flex justify-center mb-8">
        <TodoForm :onSubmitTodo="addTodo" submitText="新增" />
      </div>

      <!-- 顯示 Todo 清單 -->
      <div v-if="todoStore.filteredTodos.length > 0">
        <ul class="space-y-4">
          <draggable
            v-model="todos"
            item-key="id"
            class="space-y-4 flex flex-col items-center"
            ghost-class="opacity-50"
            @end="onDragEnd"
          >
            <template #item="{ element: todo }">
              <li
                v-if="shouldDisplay(todo)"
                class="w-full md:w-[85%] bg-white rounded-2xl shadow-md px-6 py-4 flex justify-between items-center"
              >
                <div
                  class="flex items-center gap-4 text-left w-full"
                  :class="{ 'w-85': editingId !== todo.id }"
                >
                  <input
                    type="checkbox"
                    :checked="todo.completed"
                    class="w-5 h-5 accent-blue-500"
                    @click="toggle(todo.id)"
                  />

                  <!-- 編輯模式 -->
                  <div
                    v-if="editingId === todo.id"
                    class="flex items-center gap-2 w-full"
                  >
                    <input
                      ref="editingInputRef"
                      v-model="editingText"
                      @keydown.enter="saveEdit(todo.id)"
                      @keydown.esc="cancelEdit"
                      @blur="cancelEdit"
                      class="flex-1 border border-gray-300 rounded-lg px-3 py-1 outline-none"
                    />
                    <kbd
                      @click="saveEdit(todo.id)"
                      class="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer text-sm"
                    >
                      Enter
                    </kbd>
                  </div>

                  <!-- 顯示模式 -->
                  <span
                    v-else
                    @dblclick="startEdit(todo)"
                    :class="{
                      'line-through text-gray-400': todo.completed,
                      'text-lg': true,
                      'cursor-pointer': true,
                    }"
                  >
                    {{ todo.text }}
                  </span>
                </div>

                <button
                  v-if="editingId !== todo.id"
                  @click="deleteTodo(todo.id)"
                  class="ml-4 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition w-15"
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
  </DataLoader>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useTodoStore } from "../stores/todo";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";

const activeFilterClass =
  "px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition";
const inactiveFilterClass =
  "px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition";

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

const retry = () => todoStore.fetchTodos();

onMounted(() => {
  fetchTodos();
});
</script>
