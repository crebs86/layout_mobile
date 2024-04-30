<!--script setup lang="ts">
import { onMounted, getCurrentInstance, ref } from 'vue';

onMounted(() => {
    instance.value = getCurrentInstance();
})

const instance = ref();
</script-->

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
                            <RouterLink to="/imc"
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
                    <RouterLink to="/about" data-drawer-target="sidebar-multi-level-sidebar"
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
                            <RouterLink to="/imc"
                                class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:hover:bg-gray-700">
                                IMC
                            </RouterLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <RouterLink to="/about"
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