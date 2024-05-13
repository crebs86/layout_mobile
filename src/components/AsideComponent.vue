<script setup>
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import api from '../api.js';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

function sair() {
    console.log('sair')
    store.commit('storeLoading', true);
    try {
        api.post('/logout')
            .then((r) => {
                processarSaida()
            })
            .catch((e) => {
                //processarSaida()
                store.commit('storeLoading', false);
            })
    } catch (e) {
        //processarSaida()
        store.commit('storeLoading', false);
    }

}

function processarSaida() {
    Cookies.remove('ses_token')
    store.commit('storeLoading', false);
    window.location.replace('/login')
}
</script>
<template>
    <aside id="sidebar-multi-level-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 md:hidden"
        aria-label="Sidebar">
        <div
            class="h-full px-3 py-4 overflow-y-auto bg-gradient-to-t from-emerald-500 to-emerald-200 dark:from-teal-700 dark:to-teal-600 text-green-700 dark:text-white">
            <ul class="space-y-2 font-medium">
                <li>
                    <RouterLink to="/" data-drawer-target="sidebar-multi-level-sidebar"
                        data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar"
                        class="flex items-center p-2 text-gren-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                            <path
                                d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Painel</span>
                    </RouterLink>
                </li>
                <li>
                    <button type="button"
                        class="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-controls="submenu-calc-mobile" data-collapse-toggle="submenu-calc-mobile">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                                clip-rule="evenodd" />
                            <path fill-rule="evenodd"
                                d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z"
                                clip-rule="evenodd" />
                        </svg>

                        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Calculadoras</span>

                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <ul id="submenu-calc-mobile" class="hidden py-2 space-y-2">
                        <li>
                            <RouterLink to="/GastoEnergetico" data-drawer-target="sidebar-multi-level-sidebar"
                                data-drawer-toggle="sidebar-multi-level-sidebar"
                                aria-controls="sidebar-multi-level-sidebar"
                                class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:hover:bg-gray-700">
                                Gasto Energético
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/Imc"
                                class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:hover:bg-gray-700"
                                data-drawer-target="sidebar-multi-level-sidebar"
                                data-drawer-toggle="sidebar-multi-level-sidebar"
                                aria-controls="sidebar-multi-level-sidebar">
                                IMC
                            </RouterLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <RouterLink to="/TabelaAlimentos" data-drawer-toggle="sidebar-multi-level-sidebar"
                        aria-controls="sidebar-multi-level-sidebar"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Tabela do Alimentos</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/Atendimentos" data-drawer-toggle="sidebar-multi-level-sidebar"
                        aria-controls="sidebar-multi-level-sidebar"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                                clip-rule="evenodd" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Atendimentos</span>
                    </RouterLink>
                </li>

                <li v-if="!Cookies.get('ses_token') || Cookies.get('ses_token') === 'undefinied'">
                    <RouterLink to="/login" data-drawer-target="sidebar-multi-level-sidebar"
                        data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Entrar</span>
                    </RouterLink>
                </li>
                <li class="cursor-pointer" v-else>
                    <a @click.prevent="sair()" data-drawer-target="sidebar-multi-level-sidebar"
                        data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Sair</span>
                    </a>
                </li>
                <li>
                    <RouterLink to="/About" data-drawer-target="sidebar-multi-level-sidebar"
                        data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">About</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>
    <aside
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sm:hidden md:block">
        <div
            class="h-full px-3 py-4 overflow-y-auto bg-gradient-to-t from-emerald-500 to-emerald-200 dark:from-teal-700 dark:to-teal-600 text-green-700 dark:text-white">
            <ul class="space-y-2 font-medium">
                <li>
                    <RouterLink to="/"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                            <path
                                d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Painel</span>
                    </RouterLink>
                </li>
                <li>
                    <button type="button"
                        class="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-controls="submenu-calc-desktop" data-collapse-toggle="submenu-calc-desktop">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                                clip-rule="evenodd" />
                            <path fill-rule="evenodd"
                                d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Calculadoras</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <ul id="submenu-calc-desktop" class="hidden py-2 space-y-2">
                        <li>
                            <RouterLink to="/GastoEnergetico"
                                class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:hover:bg-gray-700">
                                Gasto Energético
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/Imc"
                                class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:hover:bg-gray-700">
                                IMC
                            </RouterLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <RouterLink to="/TabelaAlimentos"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Tabela do Alimentos</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Atendimentos"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                                clip-rule="evenodd" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Atendimentos</span>
                    </RouterLink>
                </li>
                <li v-if="!Cookies.get('ses_token') || Cookies.get('ses_token') === 'undefinied'">
                    <RouterLink to="/login"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Entrar</span>
                    </RouterLink>
                </li>
                <li class="cursor-pointer" v-else>
                    <a @click.prevent="sair()"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Sair</span>
                    </a>
                </li>
                <li>
                    <RouterLink to="/About"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">About</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>
</template>