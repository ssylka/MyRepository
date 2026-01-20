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
    const items = await Api.audiences.list();
    commit(mutationTypes.AUDIENCES_SET_ITEMS, { items });
  },

  async create({ commit }, { item }) {
    item.id = await Api.audiences.create(item);
    commit(mutationTypes.AUDIENCES_CREATE_ITEM, { item });
  },

  async update({ commit }, { id, item }) {
    await Api.audiences.update(id, item);
    commit(mutationTypes.AUDIENCES_UPDATE_ITEM, { id, item });
  },

  async remove({ commit }, { id }) {
    await Api.audiences.remove(id);
    commit(mutationTypes.AUDIENCES_REMOVE_ITEM, { id });
  },
};


const mutations = {
  [mutationTypes.AUDIENCES_SET_ITEMS](state, { items }) {
    state.items = items;
  },

  [mutationTypes.AUDIENCES_CREATE_ITEM](state, { item }) {
    state.items.unshift(item);
  },

  [mutationTypes.AUDIENCES_UPDATE_ITEM](state, { id, item }) {
    const index = state.items.findIndex(item => item.id === id);
    state.items.splice(index, 1, item);
  },

  [mutationTypes.AUDIENCES_REMOVE_ITEM](state, { id }) {
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
