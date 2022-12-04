import Promise from 'bluebird';
import _ from 'lodash';

import * as Api from 'services/api';

import * as mutationTypes from 'constants/mutation-types';


const initState = {
  items: [],
  grades: [],
};


const getters = {
  itemsOrdered(state) {
    return _.sortBy(state.items, 'gradeId');
  },

  itemsByGrade(state) {
    return gradeId => state.items.filter(group => group.gradeId === gradeId);
  },

  byId(state) {
    return id => state.items.find(item => item.id === id);
  },
};


const actions = {
  clearAll({ commit }) {
    commit(mutationTypes.GROUPS_REMOVE_ITEMS);
  },

  async fetchAll({ dispatch, rootGetters }) {
    dispatch('clearAll');
    await Promise.map(rootGetters.grades, grade => dispatch('fetchByGrade', { gradeId: grade.id }));
  },

  async fetchByGrade({ state, commit }, { gradeId }) {
    if (state.grades.includes(gradeId)) return;

    const items = await Api.groups.listByGrade(gradeId);
    commit(mutationTypes.GROUPS_APPEND_ITEMS, { items, gradeId });
  },

  async create({ commit }, { item }) {
    item.id = await Api.groups.create(item);
    commit(mutationTypes.GROUPS_CREATE_ITEM, { item });
  },

  async update({ commit }, { id, item }) {
    await Api.groups.update(id, item);
    commit(mutationTypes.GROUPS_UPDATE_ITEM, { id, item });
  },

  async remove({ commit }, { id }) {
    await Api.groups.remove(id);
    commit(mutationTypes.GROUPS_REMOVE_ITEM, { id });
  },
};


const mutations = {
  [mutationTypes.GROUPS_APPEND_ITEMS](state, { items, gradeId }) {
    state.items = [...state.items, ...items];
    state.grades.push(gradeId);
  },

  [mutationTypes.GROUPS_REMOVE_ITEMS](state) {
    state.items = [];
    state.grades = [];
  },

  [mutationTypes.GROUPS_CREATE_ITEM](state, { item }) {
    state.items.unshift(item);
  },

  [mutationTypes.GROUPS_UPDATE_ITEM](state, { id, item }) {
    const index = state.items.findIndex(item => item.id === id);
    state.items.splice(index, 1, item);
  },

  [mutationTypes.GROUPS_REMOVE_ITEM](state, { id }) {
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
