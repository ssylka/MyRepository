import Vue from 'vue';

import App from 'components/App';
import 'services/bootstrap';
import 'services/table';
import 'services/flatpickr';
import 'services/smoothpickr';
import 'services/chartjs';
import router from 'services/router';
import store from 'store';
import { sync } from 'vuex-router-sync';


sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  ...App,
});
