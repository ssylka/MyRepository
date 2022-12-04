import * as Api from 'services/api';

import * as mutationTypes from 'constants/mutation-types';


const initState = {
  status: false,
};


const getters = {};


const actions = {
  async fetchStatus({ commit }) {
    const status = await Api.auth.status();
    commit(mutationTypes.AUTH_SET_STATUS, { status });
  },

  async login({ commit }, { login, password }) {
    await Api.auth.login({ login, password });
    commit(mutationTypes.AUTH_SET_STATUS, { status: true });
  },

  async logout({ commit }) {
    await Api.auth.logout();
    commit(mutationTypes.AUTH_SET_STATUS, { status: false });
  },
};


const mutations = {
  [mutationTypes.AUTH_SET_STATUS](state, { status }) {
    state.status = status;
  },
};


export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
