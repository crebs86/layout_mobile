<script setup>
import { useToast } from 'vue-toast-notification';
import { ref } from 'vue';
import api from '@/api';
import { useRouter } from 'vue-router'

const router = useRouter();
const $toast = useToast();

const paciente = ref({
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

function cadastrarPaciente() {
    resetErros()
    if (!paciente.value.name || !paciente.value.email || !paciente.value.dn) {
        showErros()
    } else {
        api.post('/nutrix/paciente/novoCliente', paciente.value)
            .then((r) => {
                router.push('/Atendimentos/Paciente/' + r.data.cliente.id)
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
</script>
<template>
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
            <small class="text-xs text-red-600" v-for="(erro, i) in erroReposta?.data?.errors?.name" :key="i + 'name'">
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
            <small class="text-xs text-red-600" v-for="(erro, i) in erroReposta?.data?.errors?.cpf" :key="i + 'cpf'">
                {{ erro }}
            </small>
        </div>

        <div class="mt-4 flex justify-center">
            <button type="button" @click.prevent="cadastrarPaciente"
                class="text-white bg-gradient-to-r from-green-600 to-green-900 dark:from-cyan-500 dark:to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-11/12 max-w-96">
                Salvar
            </button>
        </div>
    </form>
</template>