<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initFlowbite } from 'flowbite';
import { RouterView } from 'vue-router';
import AsideComponent from './components/AsideComponent.vue';
import { App } from '@capacitor/app'
import { useRoute } from 'vue-router';

const route = useRoute()
const modalAberto = ref(false)

onMounted(() => {
  initFlowbite();
  App.addListener('backButton', () => {
    if (route.path !== '/') {
      window.history.back()
    } else {
      modalAberto.value = true
    }
  })
})

function sair(sair = false) {
  if (sair) {
    App.exitApp()
  } else {
    modalAberto.value = false
  }
}

</script>

<template>

  <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar"
    aria-controls="sidebar-multi-level-sidebar" type="button"
    class="inline-flex items-center m-2 text-sm text-green-600 dark:text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
    <span class="px-2 text-green-600 dark:text-white">{{ $route.name }}</span>
  </button>

  <AsideComponent />

  <div class="sm:ml-64">
    <div
      class="px-4 py-3 bg-gradient-to-t from-emerald-500 to-emerald-200 dark:from-teal-700 dark:to-teal-600 text-gray-800  dark:text-gray-100 hidden sm:block">
      {{ $route.name }}
    </div>
    <!--div class="p-2 bg-slate-100 text-gray-900 dark:bg-slate-700 dark:text-gray-200 h-screen"-->
    <div class="p-2 text-gray-900 dark:text-gray-200 h-screen">

      <main>
        <!-- Modal App.exitApp() -->
        <div v-if="modalAberto"
          class="flex overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-green-400 rounded-lg shadow dark:bg-teal-900">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Deseja sair do aplicativo?
                </h3>
              </div>
              <!-- Modal footer -->
              <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="button" @click="sair(false)"
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Ficar
                </button>
                <button type="button" @click="sair(true)"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sair</button>
              </div>
            </div>
          </div>
        </div>

        <RouterView />
      </main>
    </div>
  </div>

</template>

<style scoped></style>
