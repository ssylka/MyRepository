import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from 'views/Home';
import Editor from 'views/Editor';
import Settings from 'views/Settings';
import NotFound from 'views/NotFound';
import Conflicts from 'views/Conflicts';
import Rooms from 'views/Rooms';


Vue.use(VueRouter);


export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/conflicts',
      name: 'conflicts',
      component: Conflicts,
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});
