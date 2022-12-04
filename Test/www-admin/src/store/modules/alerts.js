import * as mutationTypes from 'constants/mutation-types';


const initState = {
  items: [],
};


const getters = {};


const actions = {
  push({ commit }, { variant, message }) {
    commit(mutationTypes.ALERTS_PUSH, { variant, message });
    setTimeout(() => commit(mutationTypes.ALERTS_POP), 3000);
  },
};


const mutations = {
  [mutationTypes.ALERTS_PUSH](state, { variant, message }) {
    state.items.push({
      variant,
      message,
      timestamp: Date.now(),
    });
  },

  [mutationTypes.ALERTS_POP](state) {
    state.items.shift();
  },
};


export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
