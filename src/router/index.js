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
      path: "/Imc",
      name: "IMC",

      component: () => import("../views/IMC.vue"),
    },
    {
      path: "/TabelaAlimentos",
      name: "Tabela dos Alimentos",

      component: () => import("../views/TabelaAlimentos.vue"),
    },
    {
      path: "/About",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/Login",
      name: "LogIn",
      component: () => import("../views/LogIn.vue"),
    },
    {
      path: "/AfterLogin",
      name: "AfterLogin",
      component: () => import("../views/AfterLogin.vue"),
    },
    {
      path: "/Atendimentos",
      name: "Atendimentos",
      component: () => import("../views/Atendimentos/Index.vue"),
      beforeEnter: Guard.auth,
    },
    {
      path: "/Atendimentos/Novo",
      name: "Novo Atendimento",
      component: () => import("../views/Atendimentos/NovoAtendimento.vue"),
      beforeEnter: Guard.auth,
    },
    {
      path: "/Atendimentos/NovoPaciente",
      name: "Novo Paciente",
      component: () => import("../views/Atendimentos/NovoPaciente.vue"),
      beforeEnter: Guard.auth,
    },
    {
      path: "/Atendimentos/Paciente/:id",
      name: "Paciente",
      component: () => import("../views/Atendimentos/Paciente.vue"),
      beforeEnter: Guard.auth,
    },
    {
      path: "/Atendimentos/Pacientes",
      name: "Pacientes",
      component: () => import("../views/Atendimentos/Pacientes.vue"),
      beforeEnter: Guard.auth,
    },
  ],
});

export default router;
