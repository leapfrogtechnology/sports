import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home/Home.vue';
import * as ROUTES from '@/constants/routes';
import Tournament from '@/views/Tournament.vue';


const DEFAULT_PAGE_TITLE = 'LF Sports';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: ROUTES.BASE_ROUTE,
      component: Home
    },
    {
      path: ROUTES.TOURNAMENT,
      component: Tournament
    },
    {
      path: '*',
      redirect: ROUTES.BASE_ROUTE
    }
  ]
});

router.afterEach(to => {
  document.title = to.meta.title ? `${to.meta.title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
});

export default router;
