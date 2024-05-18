export default {
  state: {
    atendimentos: [],
  },
  mutations: {
    storeAtendimento(state, data) {
      state.atendimentos.push(data);
    },
    removeAtendimento(state, index) {
      state.atendimentos = state.atendimentos.filter(item => item.id !== index);
    },
  },
};
