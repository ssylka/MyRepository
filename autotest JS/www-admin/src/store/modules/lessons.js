import _ from 'lodash';

import * as Api from 'services/api';

import * as mutationTypes from 'constants/mutation-types';
import { weeksOrder } from 'constants/weeks';


const initState = {
  items: [],
  groups: [],
};


const getters = {
  itemsByGroup(state) {
    return groupId => state.items.filter(lesson => lesson.groupId === groupId);
  },
};


const actions = {
  clearAll({ commit }) {
    commit(mutationTypes.LESSONS_REMOVE_ITEMS);
  },

  async fetchByGroup({ state, commit }, { groupId }) {
    if (state.groups.includes(groupId)) return;

    const items = await Api.lessons.listByGroup(groupId);
    commit(mutationTypes.LESSONS_APPEND_ITEMS, { items, groupId });
    commit(mutationTypes.LESSONS_SORT_ITEMS);
  },

  async create({ commit, rootGetters }, {
    info: {
      weekDay,
      timeId,
      week,
      groupIds,
    },
    subjects,
  }) {
    const time = rootGetters['times/byId'](timeId);
    const item = {
      id: await Api.lessons.create({
        weekDay,
        beginTime: time.begin,
        endTime: time.end,
        week,
        groupIds,
        subjects,
      }),
      weekDay,
      beginTime: time.begin,
      endTime: time.end,
      week,
      groups: groupIds.map(groupId => rootGetters['groups/byId'](groupId)),
      subjects: subjects.reduce((subjects, {
        empty,
        subjectId,
        teacherId,
        audienceId,
      }) => {
        if (!empty) {
          subjects.push({
            name: rootGetters['subjects/byId'](subjectId).name,
            teacher: rootGetters['teachers/byId'](teacherId).name,
            audience: rootGetters['audiences/byId'](audienceId).name,
          });
        }

        return subjects;
      }, []),
    };
    commit(mutationTypes.LESSONS_CREATE_ITEM, { item, groupIds });
    commit(mutationTypes.LESSONS_SORT_ITEMS);
  },

  async remove({ commit }, { id }) {
    await Api.lessons.remove(id);
    commit(mutationTypes.LESSONS_REMOVE_ITEM, { id });
  },
};


const mutations = {
  [mutationTypes.LESSONS_APPEND_ITEMS](state, { items, groupId }) {
    state.items = [...state.items, ...items.map(item => ({ ...item, groupId }))];
    state.groups.push(groupId);
  },

  [mutationTypes.LESSONS_REMOVE_ITEMS](state) {
    state.items = [];
    state.groups = [];
  },

  [mutationTypes.LESSONS_SORT_ITEMS](state) {
    state.items = _.sortBy(state.items, ['groupId', 'weekDay', 'beginTime', ({ week }) => weeksOrder[week]]);
  },

  [mutationTypes.LESSONS_CREATE_ITEM](state, { item, groupIds }) {
    groupIds.forEach((groupId) => {
      if (state.groups.includes(groupId)) state.items.push({ ...item, groupId });
    });
  },

  [mutationTypes.LESSONS_REMOVE_ITEM](state, { id }) {
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
