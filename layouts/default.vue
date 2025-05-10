<!-- layouts/default.vue -->
<!-- <template>
  <div class="min-h-screen bg-gray-100">
    <nav class="fixed w-full bg-white/80 shadow-md px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-gray-800">
          NTL
        </NuxtLink>
        <div class="space-x-4">
          <NuxtLink
            to="/todos"
            class="text-gray-700 hover:text-blue-600 hover:font-semibold border p-2 rounded"
            >登入</NuxtLink
          >
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template> -->

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 text-gray-800"
  >
    <nav
      class="fixed w-full bg-white/70 backdrop-blur-md shadow-sm border-b border-blue-200 z-50"
    >
      <div
        class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between"
      >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-2xl font-bold text-blue-700 tracking-wide hover:text-blue-900 transition"
        >
          NTL
        </NuxtLink>

        <!-- 導覽連結 -->
        <div class="space-x-3">
          <NuxtLink
            to="/todos"
            class="text-blue-700 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-1.5 rounded-md font-medium transition"
          >
            登入
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="pt-20 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
