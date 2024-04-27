<script setup lang="ts">
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import { RouterView } from 'vue-router';
import AsideComponent from './components/AsideComponent.vue';

onMounted(() => {
  initFlowbite();
})

</script>

<template>

  <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar"
    aria-controls="sidebar-multi-level-sidebar" type="button"
    class="inline-flex items-center m-2 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
    <span class="px-2 text-white">{{ $route.name }}</span>
  </button>

  <AsideComponent />

  <div class="sm:ml-64">
    <div class="px-4 py-3 bg-blue-600 text-white hidden md:block">{{ $route.name }}</div>
    <div class="p-2 bg-slate-100 h-screen ">
      <main>
        <RouterView />
      </main>
    </div>
  </div>

</template>

<style scoped></style>./components/AsideComponent.vue
