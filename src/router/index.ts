import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Painel',

      component: Dashboard
    },
    {
      path: '/GastoEnergetico',
      name: 'Gasto Energético',

      component: () => import('../views/GastoEnergetico.vue')
    },
    {
      path: '/imc',
      name: 'IMC',

      component: () => import('../views/IMC.vue')
    },
    {
      path: '/tabela-dos-alimentos',
      name: 'Tabela dos Alimentos',

      component: () => import('../views/TabelaAlimentos.vue')
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
