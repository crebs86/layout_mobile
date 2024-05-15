<template>
    <div class="flex">
        <!--RouterLink to="/Atendimentos/Novo">
            <button
                class="p-3 m-1.5 h-10 border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600">
                Novo
            </button>
        </RouterLink-->
        <button
            class="p-3 m-1.5 h-10 border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600 uppercase">
            Atendimentos do dia
        </button>
        <RouterLink to="/Atendimentos/Pacientes">
            <button
                class="p-3 m-1.5 h-10 border-2 rounded-full border-teal-600 bg-green-300 dark:bg-teal-900/50 text-xs flex items-center justify-center shadow-lg shadow-green-600 uppercase">
                Pacientes
            </button>
        </RouterLink>
    </div>
</template>