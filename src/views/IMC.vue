<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import * as smask from "smask";

const $toast = useToast();

const calc = ref({
  peso: '',
  altura: 0,
  imc: 0
});

const erros = ref({
  peso: false,
  altura: false
});

function calcular() {
  resetErros();
  if (calc.value.peso && calc.value.altura) {
    calc.value.imc = calcIMC(parseFloat(calc.value.peso), calc.value.altura)
  } else {
    showErros()
  }
}

function calcIMC(peso, altura) {
  return peso / ((altura / 100) * (altura / 100))
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
}

function resetErros() {
  if (calc.value.peso) {
    erros.value.peso = false
  }
  if (calc.value.altura) {
    erros.value.altura = false
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
  ev.target.value = ev.target.value.replace(/\D+/g, '')
  calc.value.altura = ev.target.value
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

</script>
<template>
  <h1>
    Calculadora de Índice de Massa Corpórea
  </h1>
  <div class="mt-4">
    <label for="peso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Peso (Kg)
    </label>
    <input type="number" id="peso" v-model="calc.peso" @keyup="mascararPeso" data-tipo="peso" data-model="calc.value.peso"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    <small class="text-red-700" v-if="erros.peso">Informe o peso em quilos</small>
  </div>

  <div class="mt-4">
    <label for="peso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Altura (centimetros)
    </label>
    <input inputmode="numeric" @input="inputs" maxlength="3" data-tipo="altura"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    <small class="text-red-700" v-if="erros.altura">Informe a altura centímetros</small>
  </div>

  <div class="mt-4 flex justify-center">
    <button type="button" @click.prevent="calcular()"
      class="text-white bg-gradient-to-r from-green-600 to-green-900 dark:from-cyan-500 dark:to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-11/12 max-w-96">
      Calcular
    </button>
  </div>
  <div class="border rounded-md" v-if="calc.imc">
    <div class="p-2" :class="setImcClass()">
      Índice de Massa Corpórea (IMC) para 19 anos ou mais.
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
  </div>
</template>
