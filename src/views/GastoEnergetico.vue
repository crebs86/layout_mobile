<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import * as smask from "smask";

const $toast = useToast();

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

</script>
<template>
  <h1>
    Calculadora de Estimativa de Necessidade Energética 19 anos ou Mais
  </h1>
  <div class="mt-4">
    <label for="peso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Peso (Kg)
    </label>
    <input type="text" id="number" v-model="calc.peso" @keyup="mascararPeso" data-tipo="peso" data-model="calc.value.peso"
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

  <div class="mt-4">
    <label for="peso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Idade (anos)
    </label>
    <input inputmode="numeric" @input="inputs" maxlength="2" data-tipo="idade"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
    <small class="text-red-700" v-if="erros.af">Selecione o nível de atividade física que pratica</small>
  </div>

  <p for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
    Sexo
  </p>
  <div
    class="inline-flex space-x-4 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-slate-50 dark:bg-teal-700 w-full rounded-md">
    <div class="flex items-center">
      <input id="masculino" type="radio" name="sexo" value="masculino" v-model="calc.sexo"
        class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-teal-400 dark:border-gray-600">
      <label for="masculino" class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Masculino
      </label>
    </div>
    <div class="flex items-center">
      <input id="feminino" type="radio" name="sexo" value="feminino" v-model="calc.sexo"
        class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-teal-400 dark:border-gray-600">
      <label for="feminino" class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
      Necessidade Energética para {{ calc.sexo === 'masculino' ? 'Homens' : 'Mulheres' }} de 19 anos ou mais.
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
</template>
