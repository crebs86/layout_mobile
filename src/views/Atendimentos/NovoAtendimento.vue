<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import api from '@/api'
import moment from 'moment';
import { useToast } from 'vue-toast-notification';
import * as smask from "smask";
import { useStore } from 'vuex';

const $toast = useToast();
const route = useRoute();
const store = useStore();
const atendimento = ref({
    id: '',
    evolucao: ''
})

const calc = ref({
    peso: '',
    altura: 0,
    imc: 0,
    af: '',
    sexo: '',
    idade: 0,
    kcal: 0
});

const erros = ref({
    peso: false,
    altura: false,
    af: false,
    sexo: false,
    idade: false
});

const atividadeFisica = {
    feminino: {
        eutrofico: {
            "vazio": 0,
            "sedentario": 1,
            "atividade_leve": 1.12,
            "atividade_moderada": 1.27,
            "atividade_intensa": 1.45
        },
        sobrepeso: {
            "vazio": 0,
            "sedentario": 1,
            "atividade_leve": 1.16,
            "atividade_moderada": 1.27,
            "atividade_intensa": 1.44
        }
    },
    masculino: {
        eutrofico: {
            "vazio": 0,
            "sedentario": 1,
            "atividade_leve": 1.11,
            "atividade_moderada": 1.25,
            "atividade_intensa": 1.48
        },
        sobrepeso: {
            "vazio": 0,
            "sedentario": 1,
            "atividade_leve": 1.12,
            "atividade_moderada": 1.29,
            "atividade_intensa": 1.59
        }
    }
}

const paciente = ref({});
const atd = ref(null);

function calcular() {
    resetErros();
    if (calc.value.peso && calc.value.altura && calc.value.af && calc.value.sexo) {
        calc.value.imc = calcIMC(parseFloat(calc.value.peso), calc.value.altura)
        calc.value.kcal = calcENE()
    } else {
        showErros()
    }
}

function calcIMC(peso, altura) {
    return peso / ((altura / 100) * (altura / 100))
}

function calcENE() {
    if (calc.value.imc >= 18.5 && calc.value.imc < 25) {
        if (calc.value.sexo == 'masculino') {
            let pa = atividadeFisica.masculino.eutrofico[calc.value.af]
            return ((662 - (9.53 * calc.value.idade)) +
                (pa * (((15.91 * parseFloat(calc.value.peso)) + (539.6 * calc.value.altura / 100)))));
        } else if (calc.value.sexo == 'feminino') {
            let pa = atividadeFisica.feminino.eutrofico[calc.value.af]
            return ((354 - (6.91 * calc.value.idade)) + (pa * (((9.36 * parseFloat(calc.value.peso)) + (726 * calc.value.altura / 100)))));
        }
    } else {
        if (calc.value.sexo == 'masculino') {
            let pa = atividadeFisica.masculino.sobrepeso[calc.value.af]
            return ((1086 - (10.1 * calc.value.idade)) +
                (pa * (((13.7 * parseFloat(calc.value.peso)) + (416 * calc.value.altura / 100)))));
        } else if (calc.value.sexo == 'feminino') {
            let pa = atividadeFisica.feminino.sobrepeso[calc.value.af]
            return ((448 - (7.95 * calc.value.idade)) + (pa * (((11.4 * parseFloat(calc.value.peso)) + (619 * calc.value.altura / 100)))));
        }
    }
    return 0;
}

function showErros() {
    $toast.error('Preencha todos os campos', {
        position: 'top-right'
    });
    if (!calc.value.peso) {
        erros.value.peso = true
    }
    if (!calc.value.altura) {
        erros.value.altura = true
    }
    if (!calc.value.af) {
        erros.value.af = true
    }
    if (!calc.value.sexo) {
        erros.value.sexo = true
    }
    if (!calc.value.idade) {
        erros.value.idade = true
    }
}

function resetErros() {

    if (calc.value.peso) {
        erros.value.peso = false
    }
    if (calc.value.altura) {
        erros.value.altura = false
    }
    if (calc.value.af) {
        erros.value.af = false
    }
    if (calc.value.sexo) {
        erros.value.sexo = false
    }
    if (calc.value.idade) {
        erros.value.idade = false
    }
}

function mascararPeso() {
    calc.value.peso = calc.value.peso.replace(/[^0-9]/g, '')

    if (calc.value.peso.length > 4) {
        calc.value.peso = calc.value.peso.slice(0, -1)
    }
    calc.value.peso = smask.mask(calc.value.peso, ["dd", "dd.d", "ddd.d"])

}

function inputs(ev) {
    let data_tipo = ev.target.getAttribute('data-tipo')
    ev.target.value = ev.target.value.replace(/\D+/g, '')
    if (data_tipo === 'altura') {
        calc.value.altura = ev.target.value
    } else if (data_tipo === 'idade') {
        calc.value.idade = ev.target.value
    }
}

function setImcClass() {
    if (calc.value.imc >= 18.5 && calc.value.imc < 25) {
        return 'bg-green-500 text-white'
    } else if (calc.value.imc >= 25 && calc.value.imc < 29.99) {
        return 'bg-yellow-300 text-yellow-900'
    } else if (calc.value.imc >= 30 && calc.value.imc < 34.99) {
        return 'bg-orange-400 text-orange-900'
    } else if (calc.value.imc >= 35 && calc.value.imc < 39.99) {
        return 'bg-pink-400 text-pink-900'
    } else if (calc.value.imc >= 40 || calc.value.imc < 18.5) {
        return 'bg-red-400 text-red-900'
    }
}

function setClassificacaoImc() {
    if (calc.value.imc >= 18.5 && calc.value.imc < 25) {
        return 'Eutrófico'
    } else if (calc.value.imc >= 25 && calc.value.imc < 29.99) {
        return 'Sobrepeso'
    } else if (calc.value.imc >= 30 && calc.value.imc < 34.99) {
        return 'Obesidade Grau I'
    } else if (calc.value.imc >= 35 && calc.value.imc < 39.99) {
        return 'Obesidade Grau II'
    } else if (calc.value.imc >= 40 || calc.value.imc < 18.5) {
        return 'Obesidade Grau III'
    }
}

function salvarRascunhoAtendimento() {
    let pct = {
        id: atd.value.id,
        atendimento: atendimento.value,
        calc: calc.value
    }

    store.commit('removeAtendimento', pct.id)
    store.commit('storeAtendimento', pct)

    api.post('/nutrix/paciente/salvarEvolucaoRascunho/' + atd.value.id, pct)
        .then((r) => {
            $toast.success('Rascunho salvo.', {
                position: 'top-right'
            })
        })
        .catch(() => {
            $toast.error('Erro ao salvar rascunho em nuvem.', {
                position: 'top-right'
            })
        })
}

onMounted(() => {
    if (route.params.id) {
        api.get('/nutrix/paciente/novoAtendimento/' + route.params.id)
            .then((r) => {
                paciente.value = r.data.cliente
                atd.value = r.data.atendimento
                calc.value.idade = moment().diff(r.data.cliente.dn, 'years')

                calc.value.peso = r.data.atendimento.peso
                calc.value.altura = r.data.atendimento.altura
                calc.value.imc = r.data.atendimento.imc
                calc.value.af = r.data.atendimento.atividade_fisica
                calc.value.sexo = r.data.atendimento.sexo
                calc.value.kcal = r.data.atendimento.kcal

                atendimento.value.evolucao = r.data.atendimento.evolucao

            })
            .catch((e) => {

            })
    } else {
        $toast.warning('Nenhum paciente informado.', {
            position: 'top-right'
        })
    }
})

</script>
<template>
    <RouterLink to="/Atendimentos/Paciente/Historico/Ver" v-if="!route.params.id">
        <button class="mx-1">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                    d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd" />
                <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
            </svg>
        </button>
    </RouterLink>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div>
            <span class="font-bold ml-1.5">Paciente:</span> {{ paciente?.name }}
        </div>
        <div class="flex ml-1.5">
            <div>
                <span class="font-bold">DN:</span>
                {{ paciente?.dn ? moment(paciente?.dn).format('DD/MM/YYYY') : '' }}
            </div>
            <div class="pl-8">
                <span class="font-bold">Idade:</span>
                {{ paciente?.dn ? moment().diff(paciente?.dn, 'years') + ' anos' : '' }}
            </div>
            <div class="pl-8">
                <span class="font-bold">Atendimento:</span>
                {{ atd?.id }}
            </div>
        </div>

        <hr class="my-2">
        <div class="bg-green-300 dark:bg-teal-500 p-0.5 rounded-md">
            <section class="grid place-items-center">
                <label class="w-full">
                    <input class="peer/showLabel absolute scale-0" type="checkbox" />
                    <span
                        class="block max-h-14 overflow-hidden rounded-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-[880px]">
                        <h3 class="flex h-14 cursor-pointer items-center font-bold">Evolução</h3>
                        <div class="bg-green-300 dark:bg-teal-400 rounded-md">
                            <div class="relative z-0 w-full my-5 group">
                                <textarea type="text" name="name" id="name" v-model="atendimento.evolucao" rows="10"
                                    class="bg-green-200  dark:bg-teal-400 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" ">
                                </textarea>
                            </div>
                        </div>
                    </span>
                </label>
            </section>
        </div>

        <hr class="my-2">
        <div class="bg-green-300 dark:bg-teal-500 p-0.5 rounded-md">
            <section class="grid place-items-center">
                <label class="w-full">
                    <input class="peer/showLabel absolute scale-0" type="checkbox" />
                    <span
                        class="block max-h-14 overflow-hidden rounded-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-[880px]">
                        <h3 class="flex h-14 cursor-pointer items-center font-bold">Calculadora Gasto Energético</h3>
                        <h1>
                            Calculadora de Estimativa de Necessidade Energética 19 anos ou Mais
                        </h1>
                        <div class="mt-4">
                            <label for="peso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Peso (Kg)
                            </label>
                            <input type="text" id="number" v-model="calc.peso" @keyup="mascararPeso" data-tipo="peso"
                                data-model="calc.value.peso"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <small class="text-red-700" v-if="erros.peso">Informe o peso em quilos</small>
                        </div>

                        <div class="mt-4">
                            <label for="peso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Altura (centimetros)
                            </label>
                            <input inputmode="numeric" @input="inputs" maxlength="3" data-tipo="altura"
                                v-model="calc.altura"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <small class="text-red-700" v-if="erros.altura">Informe a altura centímetros</small>
                        </div>

                        <div class="mt-4">
                            <label for="peso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Idade (anos)
                            </label>
                            <input type="number" maxlength="2" data-tipo="idade" v-model="calc.idade"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                readonly />
                            <small class="text-red-700" v-if="erros.idade">Informe a idade em anos</small>
                        </div>

                        <div class="mt-4">
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nível de Atividade Física
                            </label>

                            <select id="countries" v-model="calc.af"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option></option>
                                <option value="sedentario">Sedentário</option>
                                <option value="atividade_leve">Atividade Leve</option>
                                <option value="atividade_moderada">Atividade Moderada</option>
                                <option value="atividade_intensa">Atividade Intensa</option>
                            </select>
                            <small class="text-red-700" v-if="erros.af">Selecione o nível de atividade física que
                                pratica</small>
                        </div>

                        <p for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
                            Sexo
                        </p>
                        <div
                            class="inline-flex space-x-4 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-slate-50 dark:bg-teal-700 w-full rounded-md">
                            <div class="flex items-center">
                                <input id="masculino" type="radio" name="sexo" value="masculino" v-model="calc.sexo"
                                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-teal-400 dark:border-gray-600">
                                <label for="masculino"
                                    class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Masculino
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input id="feminino" type="radio" name="sexo" value="feminino" v-model="calc.sexo"
                                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-teal-400 dark:border-gray-600">
                                <label for="feminino"
                                    class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Feminino
                                </label>
                            </div>
                            <small class="text-red-700" v-if="erros.sexo">Selecione o sexo</small>
                        </div>
                        <div class="mt-4 flex justify-center">
                            <button type="button" @click.prevent="calcular()"
                                class="text-white bg-gradient-to-r from-green-600 to-green-900 dark:from-cyan-500 dark:to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-11/12 max-w-96">
                                Calcular
                            </button>
                        </div>
                        <div class="border rounded-md" v-if="calc.kcal">
                            <div class="p-2" :class="setImcClass()">
                                Necessidade Energética para {{ calc.sexo === 'masculino' ? 'Homens' : 'Mulheres' }} de
                                19 anos ou mais.
                            </div>
                            <div class="flex px-2 py-1">
                                <div class="flex-1">
                                    Índice da Massa Corpórea
                                </div>
                                <div class="font-bold">
                                    {{ calc.imc.toFixed(2) }}
                                </div>
                            </div>
                            <div class="flex px-2 py-1">
                                <div class="flex-1">
                                    Classificação
                                </div>
                                <div class="font-bold">
                                    {{ setClassificacaoImc() }}
                                </div>
                            </div>
                            <div class="flex px-2 py-1">
                                <div class="flex-1">
                                    Necessidade Energética (Kcal)
                                </div>
                                <div class="font-bold">
                                    {{ calc.kcal.toFixed(2) }}
                                </div>
                            </div>
                        </div>
                    </span>
                </label>
            </section>
        </div>

        <hr class="my-2">
        <div class="bg-green-300 dark:bg-teal-500 p-0.5 rounded-md">
            <section class="grid place-items-center">
                <label class="w-full">
                    <input class="peer/showLabel absolute scale-0" type="checkbox" />
                    <span
                        class="block max-h-14 overflow-hidden rounded-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-[880px]">
                        <h3 class="flex h-14 cursor-pointer items-center font-bold">Dieta</h3>
                        <h1>
                            Calculadora de Estimativa de Necessidade Energética 19 anos ou Mais
                        </h1>

                    </span>
                </label>
            </section>
        </div>

        <hr class="my-2">
        <div class="bg-green-300 dark:bg-teal-500 p-0.5 rounded-md">
            <section class="grid place-items-center">
                <label class="w-full">
                    <input class="peer/showLabel absolute scale-0" type="checkbox" />
                    <span
                        class="block max-h-14 overflow-hidden rounded-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-[880px]">
                        <h3 class="flex h-14 cursor-pointer items-center font-bold">Prescrição</h3>
                        <h1>
                            Prescrição
                        </h1>

                    </span>
                </label>
            </section>
        </div>

        <button type="button" @click.prevent="salvarRascunhoAtendimento"
            class="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2 max-w-96 ml-4">
            Salvar Rascunho do Atendimento
        </button>

        <button type="button" @click.prevent=""
            class="text-white bg-gradient-to-r from-emerald-400 to-emerald-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-w-96 -mt-2">
            Finalizar Atendimento
        </button>
        {{ store.state.atendimentos }}
    </div>
</template>