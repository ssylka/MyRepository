import * as Api from 'services/api';

import * as mutationTypes from 'constants/mutation-types';


const initState = {
  week: null,
};


const getters = {};


const actions = {
  async fetchWeek({ commit }) {
    const settings = await Api.settings.getWeek();
    commit(mutationTypes.SETTINGS_SET_WEEK, { week: settings });
  },

  async updateWeek({ commit }, { week }) {
    await Api.settings.setWeek(week);
    commit(mutationTypes.SETTINGS_SET_WEEK, { week });
  },
};


const mutations = {
  [mutationTypes.SETTINGS_SET_WEEK](state, { week }) {
    state.week = week;
  },
};


export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
