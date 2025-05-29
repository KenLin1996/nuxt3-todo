<!-- pages/index.vue -->
<template>
  <div>
    <!-- 專案介紹 Section -->
    <section
      class="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] py-20 px-4 md:px-12"
    >
      <h1
        class="text-4xl md:text-5xl font-bold mb-10 text-center text-[#0B3C49]"
      >
        📝 Nuxt3 Todo List 專案介紹
      </h1>

      <p
        class="mb-10 text-lg md:text-xl leading-relaxed text-center text-[#334155] max-w-3xl"
      >
        本專案由 <strong>Nuxt 3</strong>（前端）與
        <strong>FastAPI</strong>（後端）開發，
        是一個功能完整、互動流暢的任務管理工具。
      </p>

      <ul class="grid gap-5 md:grid-cols-2 max-w-4xl w-full">
        <li class="bg-white rounded-xl shadow-md p-5 text-lg text-[#1E293B]">
          ✅ 新增、刪除、編輯 Todo 項目
        </li>
        <li class="bg-white rounded-xl shadow-md p-5 text-lg text-[#1E293B]">
          🔄 點擊切換完成狀態，雙擊編輯內容
        </li>
        <li class="bg-white rounded-xl shadow-md p-5 text-lg text-[#1E293B]">
          🎯 狀態篩選（全部 / 未完成 / 已完成）
        </li>
        <li class="bg-white rounded-xl shadow-md p-5 text-lg text-[#1E293B]">
          📦 使用 Pinia 管理 todos 狀態與篩選條件
        </li>
        <li
          class="bg-white rounded-xl shadow-md p-5 text-lg text-[#1E293B] md:col-span-2"
        >
          🧩 拖曳排序：整合 vuedraggable 實現拖放，並同步更新後端排序
        </li>
      </ul>
    </section>

    <!-- 專案畫面預覽 Section -->
    <section
      class="w-full min-h-screen flex items-center justify-center flex-col bg-[#EFF6FF] py-10 px-4 md:px-12"
    >
      <h2
        class="text-4xl md:text-5xl font-bold text-center mb-8 text-[#0B3C49]"
      >
        ✨ 專案畫面預覽
      </h2>
      <div class="w-auto bg-white rounded-2xl p-5 shadow-xl h-[500px]">
        <img
          v-if="previewFeatures[current].type !== 'video'"
          :src="previewFeatures[current].src"
          :alt="previewFeatures[current].alt"
          loading="lazy"
          class="rounded-2xl w-full h-full max-h-[500px] object-contain"
        />
        <video
          v-else
          :src="previewFeatures[current].src"
          :alt="previewFeatures[current].alt"
          class="rounded-2xl w-full h-full"
          autoplay
          loop
          muted
        ></video>
      </div>
      <ul
        class="flex w-full justify-center space-x-4 md:space-x-8 items-center mt-8 h-full"
      >
        <li
          v-for="(items, index) in previewFeatures"
          :key="index"
          class="px-4 py-2 rounded-lg bg-[#E0F2FE] text-[#0369A1] cursor-pointer font-medium transition hover:bg-[#BAE6FD] hover:text-[#075985]"
          :class="{
            'bg-[#0369A1] text-[#0369A1] font-semibold shadow-md drop-shadow-sm':
              current === index,
          }"
          @click="current = index"
        >
          {{ items.label }}
        </li>
      </ul>
    </section>

    <!-- 技術堆疊 Section -->
    <section
      class="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] py-10 px-4 md:px-12"
    >
      <h2
        class="text-4xl md:text-5xl font-bold text-center mb-8 text-[#0B3C49]"
      >
        🛠️ 技術堆疊
      </h2>

      <div class="w-full max-w-5xl bg-white rounded-2xl p-6 shadow-xl">
        <ul
          class="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg md:text-xl text-[#334155]"
        >
          <li><strong>前端框架：</strong> Nuxt 3 (Vue 3 Composition API)</li>
          <li><strong>後端 API：</strong> FastAPI</li>
          <li><strong>狀態管理：</strong> Pinia</li>
          <li><strong>UI 框架：</strong> Tailwind CSS</li>
          <li><strong>測試工具：</strong> Vitest + Vue Test Utils</li>
          <li><strong>驗證工具：</strong> VeeValidate / Yup</li>
          <li><strong>拖曳實作：</strong> Vuedraggable</li>
          <li><strong>儲存方式：</strong> localStorage / MongoDB</li>
        </ul>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="w-full min-h-screen flex flex-col items-center justify-center bg-[#DBEAFE] py-10 px-4 md:px-12"
    >
      <h2
        class="text-4xl md:text-5xl font-bold text-center mb-8 text-[#0B3C49]"
      >
        🚀 立即建立你的任務清單
      </h2>
      <template v-if="!isLoggedIn">
        <div
          class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center space-y-6"
        >
          <p class="text-xl text-[#334155] font-medium">
            立即登入以開始管理任務
          </p>
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center w-full bg-[#00DC82] text-white px-6 py-3 text-lg rounded-xl hover:bg-[#00B16A] transition font-semibold shadow"
          >
            🔐 登入（尚未完成）
          </NuxtLink>

          <div class="text-[#475569] text-base">
            還沒有帳戶嗎？
            <NuxtLink
              to="/register"
              class="text-[#00B16A] font-semibold hover:underline"
            >
              免費註冊
            </NuxtLink>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center space-y-6"
        >
          <p class="text-xl text-[#334155] font-medium">
            立即開始管理你的任務清單
          </p>
          <NuxtLink
            to="/todos"
            class="inline-flex items-center justify-center w-full bg-[#00DC82] text-white px-6 py-3 text-lg rounded-xl hover:bg-[#00B16A] transition font-semibold shadow"
          >
            🚀 開始使用
          </NuxtLink>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useTodoApi } from "../composables/useTodoApi";
import memeCatGif from "../assets/medias/memeCat.gif";
import vegOutCatGif from "../assets/medias/vegOutCat.gif";

useHead({
  title: "NTL 專案首頁",
  meta: [
    {
      name: "description",
      content:
        "這是一個使用 Nuxt 3 與 FastAPI 打造的 Todo List 應用，具備拖曳排序、PWA、離線儲存等功能。",
    },
    {
      name: "keywords",
      content: "Nuxt, FastAPI, Todo, 拖曳排序, PWA, Vue3, 前端專案",
    },
    { property: "og:title", content: "Todo List 專案介紹｜Nuxt + FastAPI" },
    {
      property: "og:description",
      content: "體驗一個具備完整功能與良好使用者體驗的 Todo List 專案。",
    },
    { property: "og:type", content: "website" },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://nuxt3-todo.vercel.app/",
    },
  ],
});

// ✅ 結構化資料 (Rich Snippets)
definePageMeta({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication", // 代表這是一個網頁
        name: "NTL Todo App",
        url: "https://nuxt3-todo.vercel.app",
        applicationCategory: "Productivity",
        operatingSystem: "All",
        description:
          "一個使用 Nuxt3 和 FastAPI 打造的待辦清單應用，支援拖曳排序與離線瀏覽。",
        offers: {
          "@type": "Offer",
          price: "0", // 免費使用
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          name: "Ken",
        },
      }),
    },
  ],
  __dangerouslyDisableSanitizers: ["script"],
});

const current = ref<number>(0);
const { isLoggedIn } = useUserStore();
const previewFeatures = [
  {
    label: "基本操作",
    // src: "/media/responsive.mp4",
    src: memeCatGif,

    alt: "基本操作影片",
  },
  {
    label: "拖曳任務排序",
    src: vegOutCatGif,
    alt: "拖曳排序動畫",
  },
  {
    label: "響應式設計",
    src: "/media/responsive.mp4",
    alt: "響應式設計影片",
    type: "video",
  },
  {
    label: "支援離線瀏覽",
    src: vegOutCatGif,
    alt: "離線支援預覽",
  },
];

// onMounted(() => {
//   const { getTodos } = useTodoApi();
//   getTodos().catch(() => {});
// });
</script>
