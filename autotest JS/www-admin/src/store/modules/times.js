import * as Api from 'services/api';

import * as mutationTypes from 'constants/mutation-types';


const initState = {
  items: [],
};


const getters = {
  byId(state) {
    return id => state.items.find(item => item.id === id);
  },
};


const actions = {
  async fetchAll({ commit }) {
    const items = await Api.times.list();
    commit(mutationTypes.TIMES_SET_ITEMS, { items });
  },
};


const mutations = {
  [mutationTypes.TIMES_SET_ITEMS](state, { items }) {
    state.items = items;
  },
};


export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
