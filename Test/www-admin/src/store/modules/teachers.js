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
    const items = await Api.teachers.list();
    commit(mutationTypes.TEACHERS_SET_ITEMS, { items });
  },

  async create({ commit }, { item }) {
    item.id = await Api.teachers.create(item);
    commit(mutationTypes.TEACHERS_CREATE_ITEM, { item });
  },

  async update({ commit }, { id, item }) {
    await Api.teachers.update(id, item);
    commit(mutationTypes.TEACHERS_UPDATE_ITEM, { id, item });
  },

  async remove({ commit }, { id }) {
    await Api.teachers.remove(id);
    commit(mutationTypes.TEACHERS_REMOVE_ITEM, { id });
  },
};


const mutations = {
  [mutationTypes.TEACHERS_SET_ITEMS](state, { items }) {
    state.items = items;
  },

  [mutationTypes.TEACHERS_CREATE_ITEM](state, { item }) {
    state.items.unshift(item);
  },

  [mutationTypes.TEACHERS_UPDATE_ITEM](state, { id, item }) {
    const index = state.items.findIndex(item => item.id === id);
    state.items.splice(index, 1, item);
  },

  [mutationTypes.TEACHERS_REMOVE_ITEM](state, { id }) {
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
