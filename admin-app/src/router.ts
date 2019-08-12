import Vue from 'vue';
import Router from 'vue-router';

import * as ROUTES from '@/constants/routes';

import Login from './views/Login.vue';
import Games from './views/Games.vue';
import Rounds from './views/Rounds.vue';
import Statuses from './views/Statuses.vue';
import Dashboard from './views/Dashboard.vue';
import Employees from './views/Employees.vue';
import Categories from './views/Categories.vue';
import Tournaments from './views/Tournaments.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: ROUTES.LOGIN,
      name: 'login',
      component: Login
    },
    {
      path: ROUTES.DASHBOARD,
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: ROUTES.EMPLOYEES,
          name: 'employees',
          component: Employees
        },
        {
          path: ROUTES.TOURNAMENTS,
          name: 'tournaments',
          component: Tournaments
        },
        {
          path: ROUTES.GAMES,
          name: 'games',
          component: Games
        },
        {
          path: ROUTES.CATEGORIES,
          name: 'categories',
          component: Categories
        },
        {
          path: ROUTES.STATUSES,
          name: 'statuses',
          component: Statuses
        },
        {
          path: ROUTES.ROUNDS,
          name: 'rounds',
          component: Rounds
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const rawUserSession = localStorage.getItem('userSession');

    if (!rawUserSession || !rawUserSession.length) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    }

    const userSession = rawUserSession && JSON.parse(rawUserSession);

    if (userSession && !userSession.accessToken) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    }
  }

  next();
});

export default router;
