<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api'
import { useRoute } from 'vue-router'
import data from '@/moment';

const route = useRoute();
const edicao = ref(false);


const paciente = ref({
    id: '',
    name: '',
    email: '',
    dn: '',
    cpf: ''
});

const erros = ref({
    name: false,
    email: false,
    dn: false,
    cpf: false
});

const erroReposta = ref({});

function salvarPaciente() {
    resetErros()
    if (!paciente.value.name || !paciente.value.email || !paciente.value.dn) {
        showErros()
    } else {
        api.post('/nutrix/paciente/atualizarCliente/' + paciente.value.id, paciente.value)
            .then((r) => {
                route.push('/Atendimentos/Paciente/' + r.data.cliente.id)
            })
            .catch((e) => {
                console.log(e.response)
                erroReposta.value = e.response
            })
    }
}

function showErros() {
    $toast.error('Preencha os campos obrigatórios.', {
        position: 'top-right'
    })
    if (!paciente.value.name) {
        erros.value.name = true
    }
    if (!paciente.value.email) {
        erros.value.email = true
    }
    if (!paciente.value.dn) {
        erros.value.dn = true
    }
}

function resetErros() {
    erroReposta.value = {}
    if (!paciente.value.name) {
        erros.value.name = false
    }
    if (!paciente.value.email) {
        erros.value.email = false
    }
    if (!paciente.value.dn) {
        erros.value.dn = false
    }
}

onMounted(() => {
    api.get('/nutrix/paciente/' + route.params.id)
        .then((r) => {
            paciente.value = r.data.cliente[0]
        })
        .catch((e) => { })

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
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-1 p-1.5" v-if="!edicao">
        <p>
            <span class="font-bold">
                ID:
            </span>{{ paciente?.id }}
        </p>
        <p>
            <span class="font-bold">
                Nome:
            </span>{{ paciente?.name }}
        </p>
        <p>
            <span class="font-bold">
                E-mail:
            </span>{{ paciente?.email }}
        </p>
        <p>
            <span class="font-bold">
                Data de Nascimento:
            </span>{{ data(paciente?.dn) }}
        </p>
        <p>
            <span class="font-bold">
                CPF:
            </span> {{ paciente?.cpf }}
        </p>
        <button @click="edicao = true"
            class="m-1.5 px-2 py-1 border rounded-lg shadow-lg bg-yellow-300 hover:bg-yellow-400 text-yellow-900">Editar</button>
        <button
            class="m-1.5 px-2 py-1 border rounded-lg shadow-lg bg-green-500 hover:bg-green-400 text-green-200">Atender</button>
    </div>
    <div class="my-1 p-1.5" v-else>
        <form class="max-w-md mx-auto">

            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="name" v-model="paciente.name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nome*
                </label>
                <small class="text-xs text-red-600" v-if="erros.name">*Campo Obrigatório</small>
                <small class="text-xs text-red-600" v-for="(erro, i) in erroReposta?.data?.errors?.name"
                    :key="i + 'name'">
                    {{ erro }}
                </small>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="email" id="email" v-model="paciente.email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    E-mail*
                </label>
                <small class="text-xs text-red-600" v-if="erros.email">*Campo Obrigatório</small>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <input type="date" name="dn" id="dn" v-model="paciente.dn"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="dn"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Data de nascimento*
                </label>
                <small class="text-xs text-red-600" v-if="erros.dn">*Campo Obrigatório</small>
                <small class="text-xs text-red-600" v-for="(erro, i) in erroReposta?.data?.errors?.email"
                    :key="i + 'email'">
                    {{ erro }}
                </small>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="cpf" id="cpf" v-model="paciente.cpf"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="cpf"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    CPF
                </label>
                <small class="text-xs text-red-600" v-for="(erro, i) in erroReposta?.data?.errors?.cpf"
                    :key="i + 'cpf'">
                    {{ erro }}
                </small>
            </div>

            <div class="mt-4 flex justify-center">
                <button type="button" @click.prevent="salvarPaciente"
                    class="text-white bg-gradient-to-r from-green-600 to-green-900 dark:from-cyan-500 dark:to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-11/12 max-w-96">
                    Salvar
                </button>
                <button type="button" @click.prevent="edicao = false"
                    class="text-white bg-gradient-to-r from-yellow-200 to-yellow-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-11/12 max-w-96">
                    Cancelar Edição
                </button>
            </div>
        </form>
    </div>
</template>