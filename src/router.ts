import Vue from 'vue';
import Router from 'vue-router';

import { BASE_ROUTES, FUTSAL_ROUTES, CARROM_BOARD_ROUTES, DASHAIN_CUP_ROUTES } from './constants/routes';

import Chess from '@/views/chess/Chess.vue';
import Futsal from '@/views/futsal/Futsal.vue';
import Teams from '@/views/common/teams/Teams.vue';
import Recent from '@/views/common/recents/Recent.vue';
import FutsalStats from '@/views/futsal/FutsalStats.vue';
import Results from '@/views/common/results/Results.vue';
import FutsalPoints from '@/views/futsal/FutsalPoints.vue';
import Fixtures from '@/views/common/fixtures/Fixtures.vue';
import CarromBoard from '@/views/carrom-board/CarromBoard.vue';
import TableTennis from '@/views/table-tennis/TableTennis.vue';
import CarromBoardScoreModal from '@/views/carrom-board/CarromBoardScoreModal.vue';

import Dashain from '@/views/dashain/Dashain.vue';

const DEFAULT_PAGE_TITLE = 'LF Sports';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: BASE_ROUTES.CHESS,
      component: Chess
    },
    {
      path: BASE_ROUTES.FUTSAL,
      component: Futsal,
      children: [
        {
          path: '',
          redirect: FUTSAL_ROUTES.HOME
        },
        {
          path: FUTSAL_ROUTES.HOME,
          component: Recent
        },
        {
          path: FUTSAL_ROUTES.FIXTURES,
          component: Fixtures
        },
        {
          path: FUTSAL_ROUTES.RESULTS,
          component: Results
        },
        {
          path: FUTSAL_ROUTES.POINTS,
          component: FutsalPoints
        },
        {
          path: FUTSAL_ROUTES.STATS,
          component: FutsalStats
        },
        {
          path: FUTSAL_ROUTES.TEAMS,
          component: Teams
        },
        {
          path: '*',
          redirect: FUTSAL_ROUTES.HOME
        }
      ]
    },
    {
      path: BASE_ROUTES.CARROM_BOARD,
      component: CarromBoard,
      meta: {
        title: 'Carrom Board'
      },
      children: [
        {
          path: '',
          redirect: CARROM_BOARD_ROUTES.HOME
        },
        {
          path: CARROM_BOARD_ROUTES.HOME,
          component: Recent,
          meta: {
            title: 'Carrom Board - Home'
          }
        },
        {
          path: CARROM_BOARD_ROUTES.FIXTURES,
          component: Fixtures,
          meta: {
            title: 'Carrom Board - Fixtures'
          }
        },
        {
          path: CARROM_BOARD_ROUTES.RESULTS,
          component: Results,
          meta: {
            title: 'Carrom Board - Results'
          }
        },
        {
          path: CARROM_BOARD_ROUTES.TEAMS,
          component: Teams,
          meta: {
            title: 'Carrom Board - Teams'
          }
        },
        {
          path: CARROM_BOARD_ROUTES.FIXTURE,
          component: CarromBoardScoreModal,
          meta: {
            title: 'Carrom Board - Fixture'
          }
        },
        {
          path: '*',
          redirect: CARROM_BOARD_ROUTES.HOME
        }
      ]
    },
    {
      path: BASE_ROUTES.TABLE_TENNIS,
      component: TableTennis
    },
    {
      path: '*',
      redirect: BASE_ROUTES.FUTSAL
    },
    {
      path: BASE_ROUTES.DASHAIN_CUP,
      component: Dashain,
      children: [
        {
          path: '',
          redirect: DASHAIN_CUP_ROUTES.HOME
        },
        {
          path: DASHAIN_CUP_ROUTES.HOME,
          component: Recent
        },
        {
          path: DASHAIN_CUP_ROUTES.FIXTURES,
          component: Fixtures
        },
        {
          path: DASHAIN_CUP_ROUTES.RESULTS,
          component: Results
        },
        {
          path: DASHAIN_CUP_ROUTES.POINTS,
          component: FutsalPoints
        },
        {
          path: DASHAIN_CUP_ROUTES.STATS,
          component: FutsalStats
        },
        {
          path: DASHAIN_CUP_ROUTES.TEAMS,
          component: Teams
        },
        {
          path: '*',
          redirect: DASHAIN_CUP_ROUTES.HOME
        }
      ]
    }
  ]
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
});

export default router;
