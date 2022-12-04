import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import * as actions from 'store/actions';
import * as getters from 'store/getters';

import alerts from 'store/modules/alerts';
import audiences from 'store/modules/audiences';
import auth from 'store/modules/auth';
import conflicts from 'store/modules/conflicts';
import grades from 'store/modules/grades';
import groups from 'store/modules/groups';
import lessons from 'store/modules/lessons';
import settings from 'store/modules/settings';
import subjects from 'store/modules/subjects';
import teachers from 'store/modules/teachers';
import times from 'store/modules/times';


Vue.use(Vuex);


const isDevelopment = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
  actions,
  getters,
  modules: {
    alerts,
    audiences,
    auth,
    conflicts,
    grades,
    groups,
    lessons,
    settings,
    subjects,
    teachers,
    times,
  },
  strict: isDevelopment,
  plugins: isDevelopment ? [createLogger()] : [],
});
