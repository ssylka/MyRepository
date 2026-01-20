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
    const items = await Api.subjects.list();
    commit(mutationTypes.SUBJECTS_SET_ITEMS, { items });
  },

  async create({ commit }, { item }) {
    item.id = await Api.subjects.create(item);
    commit(mutationTypes.SUBJECTS_CREATE_ITEM, { item });
  },

  async update({ commit }, { id, item }) {
    await Api.subjects.update(id, item);
    commit(mutationTypes.SUBJECTS_UPDATE_ITEM, { id, item });
  },

  async remove({ commit }, { id }) {
    await Api.subjects.remove(id);
    commit(mutationTypes.SUBJECTS_REMOVE_ITEM, { id });
  },
};


const mutations = {
  [mutationTypes.SUBJECTS_SET_ITEMS](state, { items }) {
    state.items = items;
  },

  [mutationTypes.SUBJECTS_CREATE_ITEM](state, { item }) {
    state.items.unshift(item);
  },

  [mutationTypes.SUBJECTS_UPDATE_ITEM](state, { id, item }) {
    const index = state.items.findIndex(item => item.id === id);
    state.items.splice(index, 1, item);
  },

  [mutationTypes.SUBJECTS_REMOVE_ITEM](state, { id }) {
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
