import { createRouter, createWebHistory } from "vue-router";
import Guard from "./../middleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Painel",

      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/GastoEnergetico",
      name: "Gasto Energético",

      component: () => import("../views/GastoEnergetico.vue"),
    },
    {
      path: "/imc",
      name: "IMC",

      component: () => import("../views/IMC.vue"),
    },
    {
      path: "/TabelaAlimentos",
      name: "Tabela dos Alimentos",

      component: () => import("../views/TabelaAlimentos.vue"),
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import("../views/LogIn.vue"),
    },
    {
      path: "/AfterLogin",
      name: "AfterLogin",
      component: () => import("../views/AfterLogin.vue"),
    },
    {
      path: "/atendimentos",
      name: "Atendimentos",
      component: () => import("../views/Atendimentos/Index.vue"),
      beforeEnter: Guard.auth,
    },
  ],
});

export default router;
