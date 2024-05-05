<script setup>

import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import api from '../api';

const toast = useToast()

const filtro = ref('')

const alimentos = ref([])

const status = ref(false)

async function buscar() {
  if (filtro.value.length < 3) {
    toast.error('Informe ao menos 3 caracteres para busca', {
      position: 'top-right'
    })
  } else {
    status.value = true
    await api.get('/nutrix/alimentoFiltro/' + filtro.value)
      .then((data) => {
        alimentos.value = data.data
        status.value = false
      })
  }
}
</script>
<template>
  <div class="flex">
    <input v-model="filtro" type="text"
      class="w-full rounded-lg bg-emerald-400 dark:bg-teal-300 dark:text-teal-900 dark:placeholder:text-teal-100 placeholder:text-emerald-100"
      placeholder="busca">

    <button type="button" @click="buscar" @keypress.enter="buscar"
      class="text-white bg-gradient-to-r from-green-600 to-green-900 dark:from-cyan-500 dark:to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-1 mt-1.5">
      Buscar
    </button>
  </div>

  <div role="status" v-if="alimentos.length === 0 && status"
    class="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mt-4">
    <div class="flex items-center justify-between">
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
  </div>

  <div v-if="alimentos.length > 0" class="mt-2">
    <p class="text-sm m-1">Para porção de 100 gramas.</p>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-teal-950 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Descrição
            </th>
            <th scope="col" class="px-6 py-3">
              Umidade(%)
            </th>
            <th scope="col" class="px-6 py-3">
              Kcal
            </th>
            <th scope="col" class="px-6 py-3">
              Proteína(g)
            </th>
            <th scope="col" class="px-6 py-3">
              Lipídeos(g)
            </th>
            <th scope="col" class="px-6 py-3">
              Colesterol(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Carboidrato(g)
            </th>
            <th scope="col" class="px-6 py-3">
              Fibra(g)
            </th>
            <th scope="col" class="px-6 py-3">
              Cinzas(g)
            </th>
            <th scope="col" class="px-6 py-3">
              Calcio(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Magnésio(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Manganês(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Fósforo(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Ferro(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Sódio
            </th>
            <th scope="col" class="px-6 py-3">
              Potássio(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Cobre(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Zinco(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Retinol(mcg)
            </th>
            <th scope="col" class="px-6 py-3">
              Tiamina(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Riboflavina(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Piridoxina(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              Niacina(mg)
            </th>
            <th scope="col" class="px-6 py-3">
              C(mg)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(alimento, i) in alimentos" :key="i"
            class="odd:bg-green-200 odd:dark:bg-teal-900 even:bg-green-100 even:dark:bg-teal-800 border-b dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento?.descricao }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.umidade }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.kcal }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.proteina_g }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.lipideos_g }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.colesterol_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.carboidrato_g }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.fibra_alimentar_g }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.cinzas_g }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.calcio_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.magnesio_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.manganes_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.fosforo_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.ferro_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.sodio_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.potassio_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.cobre_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.zinco_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.retinol_mcg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.tiamina_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.riboflavina_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.piridoxina_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.niacina_mg }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <!-- @vue-ignore-->
              {{ alimento.c_mg }}
            </th>
          </tr>
        </tbody>
      </table>
      <p class="text-xs m-1">Fonte: TACO 4ª edição</p>
    </div>

  </div>

</template>
