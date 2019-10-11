import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home/Home.vue';
import * as ROUTES from '@/constants/routes';
import Tournament from '@/views/Tournament.vue';
import Stats from '@/views/common/stats/Stats.vue';
import Teams from '@/views/common/teams/Teams.vue';
import Points from '@/views/common/points/Points.vue';
import Recent from '@/views/common/recent/Recent.vue';
import Results from '@/views/common/results/Results.vue';
import Fixtures from '@/views/common/fixtures/Fixtures.vue';
import Knockouts from '@/views/common/knockouts/Knockouts.vue';

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
      component: Tournament,
      children: [
        {
          path: ROUTES.SUB_ROUTES.HOME.path,
          component: Recent
        },
        {
          path: ROUTES.SUB_ROUTES.RESULTS.path,
          component: Results
        },
        {
          path: ROUTES.SUB_ROUTES.FIXTURES.path,
          component: Fixtures
        },
        {
          path: ROUTES.SUB_ROUTES.KNOCKOUTS.path,
          component: Knockouts
        },
        {
          path: ROUTES.SUB_ROUTES.STATS.path,
          component: Stats
        },
        {
          path: ROUTES.SUB_ROUTES.POINTS.path,
          component: Points
        },
        {
          path: ROUTES.SUB_ROUTES.TEAMS.path,
          component: Teams
        }
      ]
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
