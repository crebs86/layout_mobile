<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api';
import { useToast } from 'vue-toast-notification';
import moment from 'moment';

const pacientes = ref([]);
const $toast = useToast();
const load = ref(false);

const filtro = ref('');

function filtrar() {
    if (filtro.value === '' || filtro.value == 'undefined' || !filtro.value || filtro.value.length < 2) {
        console.log(filtro.value)
        $toast.warning('Informe pelo menos dois caracteres para busca', {
            position: 'top-right'
        })
    } else {
        load.value = true
        console.log(filtro.value !== '')
        api.get('nutrix/paciente/cliente/filtrar/' + filtro.value)
            .then((r) => {
                pacientes.value = r.data
                load.value = false
            })
            .catch((e) => {
                $toast.error('Erro ao processar requisição', {
                    position: 'top-right'
                })
                load.value = false
            })
    }
}

onMounted(() => {
    load.value = true
    api.get('nutrix/paciente/clientes')
        .then((r) => {
            pacientes.value = r.data
            load.value = false
        })
        .catch((e) => {
            $toast.error('Erro ao processar requisição', {
                position: 'top-right'
            })
            load.value = false
        })
})
</script>
<template>
    <RouterLink to="/Atendimentos/NovoPaciente">
        <button class="mx-1">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </RouterLink>
    <div class="flex">
        <input v-model="filtro" type="text" class="my-1.5 w-full rounded-md dark:text-teal-900">
        <button class="m-1 px-2 border rounded-md bg-green-500 dark:text-teal-900" @click="filtrar">Filtrar</button>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" v-if="!load">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-teal-950 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Paciente
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Nascimento
                    </th>
                    <th scope="col" class="px-6 py-3">
                        E-mail
                    </th>
                    <th>
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(paciente, i) in pacientes" :key="i"
                    class="odd:bg-green-200 odd:dark:bg-teal-900 even:bg-green-100 even:dark:bg-teal-800 border-b dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ paciente?.name }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ moment(paciente.dn).format('DD/MM/YYYY') }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ paciente.email }}
                    </th>
                    <th scope="row" class="flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <RouterLink :to="'/Atendimentos/Novo/' + paciente.id">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                    clip-rule="evenodd" />
                                <path fill-rule="evenodd"
                                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </RouterLink>
                        <RouterLink :to="'/Atendimentos/Paciente/' + paciente.id">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
                                <path fill-rule="evenodd"
                                    d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </RouterLink>
                    </th>
                </tr>
            </tbody>
        </table>
        <div class="text-center m-4" v-else>
            <div role="status">
                <svg aria-hidden="true"
                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    </div>
</template>