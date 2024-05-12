<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { initFlowbite } from 'flowbite';
import { RouterView, useRouter } from 'vue-router';
import AsideComponent from './components/AsideComponent.vue';
import { App } from '@capacitor/app'
import { useRoute } from 'vue-router';
import has from '@/arrayHelpers'
import api from '@/api';
import Cookies from 'js-cookie';
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore();
const modalAberto = ref(false)
const rotasLivres = ['/', '/login', '/TabelaAlimentos', '/imc', '/about', '/GastoEnergetico']

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

onUpdated(() => {
  verificarLoginSeRotaProtegida()
})

function sair(sair = false) {
  if (sair) {
    App.exitApp()
  } else {
    modalAberto.value = false
  }
}

async function verificarLoginSeRotaProtegida() {
  if (has(rotasLivres, [route.path])) {
    console.log(`Rota ${route.path} livre`)
  } else {
    console.log(`Rota ${route.path} protegida`)

    if (!verificarToken()) {
      console.log('sem token')
      router.push('/login')
    }
    verificarLogin()
  }
}

function verificarToken() {
  return Cookies.get('ses_token') !== null
}

function verificarLogin() {
  try {
    api.get('/check')
      .then((r) => {
        console.log('api then App', r.data === 1)
      })
      .catch(() => {
        console.log('.catch redirect /login')
        Cookies.remove('ses_token')
        router.push('/login')
      }
      )
  }
  catch (e) {
    console.log('catch redirect /login')
    Cookies.remove('ses_token')
    router.push('/login')
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
        <div class="text-center" v-if="store.state.status.loading">
          <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <RouterView v-else />
      </main>
    </div>
  </div>

</template>

<style scoped></style>
