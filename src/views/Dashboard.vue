<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import Cookie from 'js-cookie'

const router = useRoute()

onMounted(() => {
  if (router.query.reload === 'true' && (!Cookie.get('ses_token') || Cookie.get('ses_token') == 'undefined')) {
    console.log(Cookie.get('ses_login'))
    //window.location.reload()
  }
})
</script>
<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[550px] place-items-center">
    <div class="">
      <RouterLink to="/imc">
        <button
          class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600">
          Calculadora IMC
        </button>
      </RouterLink>
    </div>
    <div class="">
      <RouterLink to="/GastoEnergetico">
        <button
          class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600">
          Calculadora Gasto Energético
        </button>
      </RouterLink>
    </div>
    <div class="">
      <RouterLink to="/TabelaAlimentos">
        <button
          class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600">
          Tabela Alimentos
        </button>
      </RouterLink>
    </div>
    <div class="">
      <button
        class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600">Histórico</button>
    </div>
    <div class="">
      <RouterLink to="/Atendimentos">
        <button
          class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600">Atendimentos</button>
      </RouterLink>
    </div>
  </div>
</template>
