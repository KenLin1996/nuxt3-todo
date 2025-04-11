<!-- components/TodoForm.vue -->
<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { defineProps, nextTick, ref } from "vue";

const props = defineProps<{
  onSubmitTodo: (text: string) => void;
  submitText?: string;
}>();

const submitText = props.submitText ?? "新增";
const errInputRef = ref<HTMLInputElement | null>(null);

// 定義 schema
const schema = yup.object({
  text: yup
    .string()
    .required("必填")
    .min(1, "至少 1 字")
    .max(100, "上限 100 字"),
});

// 啟用 useForm 並套用 schema
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: { text: "" },
});

// 建立欄位
const { value: text, errorMessage, meta } = useField<string>("text");
const showError = ref(false);

// 提交邏輯
const submitTodo = handleSubmit(
  (values) => {
    props.onSubmitTodo(values.text.trim());
    resetForm();
    showError.value = false;
  },
  async () => {
    showError.value = true;

    await nextTick();
    errInputRef.value?.focus();
  }
);
// 失焦時不顯示錯誤
const clearIfBlurred = () => {
  if (!meta.valid) showError.value = false;
};
</script>

<template>
  <form @submit.prevent="submitTodo">
    <div class="flex items-center gap-2">
      <input
        v-model="text"
        type="text"
        ref="errInputRef"
        @blur="clearIfBlurred"
        class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="請輸入待辦事項..."
      />
      <button
        type="submit"
        class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 cursor-pointer"
      >
        {{ submitText }}
      </button>
    </div>

    <p v-if="showError && errorMessage" class="text-center text-red-500 mt-1">
      {{ errorMessage }}
    </p>
  </form>
</template>
