import * as Api from 'services/api';

import * as mutationTypes from 'constants/mutation-types';


const initState = {
  items: [],
};


const getters = {};


const actions = {
  async fetchAll({ commit }) {
    const items = await Api.grades.list();
    commit(mutationTypes.GRADES_SET_ITEMS, { items });
  },

  async create({ commit }, { item }) {
    item.id = await Api.grades.create(item);
    commit(mutationTypes.GRADES_CREATE_ITEM, { item });
  },

  async update({ commit }, { id, item }) {
    await Api.grades.update(id, item);
    commit(mutationTypes.GRADES_UPDATE_ITEM, { id, item });
  },

  async remove({ commit }, { id }) {
    await Api.grades.remove(id);
    commit(mutationTypes.GRADES_REMOVE_ITEM, { id });
  },
};


const mutations = {
  [mutationTypes.GRADES_SET_ITEMS](state, { items }) {
    state.items = items;
  },

  [mutationTypes.GRADES_CREATE_ITEM](state, { item }) {
    state.items.unshift(item);
  },

  [mutationTypes.GRADES_UPDATE_ITEM](state, { id, item }) {
    const index = state.items.findIndex(item => item.id === id);
    state.items.splice(index, 1, item);
  },

  [mutationTypes.GRADES_REMOVE_ITEM](state, { id }) {
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
