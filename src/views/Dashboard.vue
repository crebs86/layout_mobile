<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[550px] place-items-center">
    <div class="">
      <RouterLink to="/imc">
        <button
          class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center">
          Calculadora IMC
        </button>
      </RouterLink>
    </div>
    <div class="">
      <RouterLink to="/GastoEnergetico">
        <button
          class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center">
          Calculadora Gasto Energético
        </button>
      </RouterLink>
    </div>
    <div class="">
      <RouterLink to="/tabela-dos-alimentos">
        <button
          class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center">
          Tabela Alimentos
        </button>
      </RouterLink>
    </div>
    <div class="">
      <button
        class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center">Histórico</button>
    </div>
    <div class="">
      <button
        class="px-1 w-32 min-h-20 h-auto border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center">Atendimentos</button>
    </div>
  </div>
</template>
