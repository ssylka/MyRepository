import * as Api from 'services/api';

import * as mutationTypes from 'constants/mutation-types';


const initState = {
  items: [],
};


const getters = {};


const actions = {
  async fetchAll({ commit }) {
    const items = await Api.lessons.listConflicts();
    commit(mutationTypes.CONFLICTS_SET_ITEMS, { items });
  },

  async remove({ commit }, { id }) {
    await Api.lessons.remove(id);
    commit(mutationTypes.CONFLICTS_REMOVE_ITEM, { id });
  },
};


const mutations = {
  [mutationTypes.CONFLICTS_SET_ITEMS](state, { items }) {
    state.items = items;
  },

  [mutationTypes.CONFLICTS_REMOVE_ITEM](state, { id }) {
    const index = state.items.findIndex(item => item.id === id);
    state.items.splice(index, 1);
  },
};


export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
