import persistedState from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  // 型別斷言，讓 TypeScript 知道 $pinia 是 Pinia 實例
  (nuxtApp.$pinia as any).use(persistedState);
});
