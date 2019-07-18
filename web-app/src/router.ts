import Vue from 'vue';
import Router from 'vue-router';

import {
  BASE_ROUTES,
  DOTA_ROUTES,
  FIFA_ROUTES,
  CHESS_ROUTES,
  FUTSAL_ROUTES,
  TABLE_TENNIS_ROUTES,
  CARROM_BOARD_ROUTES,
  COUNTER_STRIKE_ROUTES
} from './constants/routes';

import Home from '@/views/home/Home.vue';
import Dota from '@/views/dota/Dota.vue';
import Fifa from '@/views/fifa/Fifa.vue';
import Chess from '@/views/chess/Chess.vue';
import Futsal from '@/views/futsal/Futsal.vue';
import Teams from '@/views/common/teams/Teams.vue';
import DotaPoints from '@/views/dota/DotaPoints.vue';
import Recent from '@/views/common/recent/Recent.vue';
import Results from '@/views/common/results/Results.vue';
import FutsalStats from '@/views/futsal/FutsalStats.vue';
import FutsalPoints from '@/views/futsal/FutsalPoints.vue';
import Fixtures from '@/views/common/fixtures/Fixtures.vue';
import CarromBoard from '@/views/carrom-board/CarromBoard.vue';
import TableTennis from '@/views/table-tennis/TableTennis.vue';
import CounterStrike from '@/views/counter-strike/CounterStrike.vue';
import CounterStrikePoints from '@/views/counter-strike/CounterStrikePoints.vue';

const DEFAULT_PAGE_TITLE = 'LF Sports';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: BASE_ROUTES.HOME,
      component: Home
    },
    {
      path: BASE_ROUTES.TABLE_TENNIS,
      component: TableTennis,
      meta: {
        title: 'Table Tennis'
      },
      children: [
        {
          path: TABLE_TENNIS_ROUTES.HOME,
          component: Recent,
          meta: {
            title: 'Table Tennis - Home'
          }
        },
        {
          path: TABLE_TENNIS_ROUTES.FIXTURES,
          component: Fixtures,
          meta: {
            title: 'Table Tennis - Fixtures'
          }
        },
        {
          path: TABLE_TENNIS_ROUTES.RESULTS,
          component: Results,
          meta: {
            title: 'Table Tennis - Results'
          }
        },
        {
          path: TABLE_TENNIS_ROUTES.TEAMS,
          component: Teams,
          meta: {
            title: 'Table Tennis - Teams'
          }
        },
        {
          path: '*',
          redirect: TABLE_TENNIS_ROUTES.HOME
        }
      ]
    },
    {
      path: BASE_ROUTES.CHESS,
      component: Chess,
      meta: {
        title: 'Chess'
      },
      children: [
        {
          path: CHESS_ROUTES.HOME,
          component: Recent,
          meta: {
            title: 'Chess - Home'
          }
        },
        {
          path: CHESS_ROUTES.FIXTURES,
          component: Fixtures,
          meta: {
            title: 'Chess - Fixtures'
          }
        },
        {
          path: CHESS_ROUTES.RESULTS,
          component: Results,
          meta: {
            title: 'Chess - Results'
          }
        },
        {
          path: CHESS_ROUTES.TEAMS,
          component: Teams,
          meta: {
            title: 'Chess - Teams'
          }
        },
        {
          path: '*',
          redirect: CHESS_ROUTES.HOME
        }
      ]
    },
    {
      path: BASE_ROUTES.FUTSAL,
      component: Futsal,
      meta: {
        title: 'Futsal'
      },
      children: [
        {
          path: FUTSAL_ROUTES.HOME,
          component: Recent,
          meta: {
            title: 'Futsal - Home'
          }
        },
        {
          path: FUTSAL_ROUTES.FIXTURES,
          component: Fixtures,
          meta: {
            title: 'Futsal - Fixtures'
          }
        },
        {
          path: FUTSAL_ROUTES.RESULTS,
          component: Results,
          meta: {
            title: 'Futsal - Results'
          }
        },
        {
          path: FUTSAL_ROUTES.POINTS,
          component: FutsalPoints,
          meta: {
            title: 'Futsal - Points'
          }
        },
        {
          path: FUTSAL_ROUTES.STATS,
          component: FutsalStats,
          meta: {
            title: 'Futsal - Stats'
          }
        },
        {
          path: FUTSAL_ROUTES.TEAMS,
          component: Teams,
          meta: {
            title: 'Futsal - Teams'
          }
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
        //   /* {
        //     path: CARROM_BOARD_ROUTES.FIXTURE,
        //     component: TableTennisScoreModal,
        //     meta: {
        //       title: 'Carrom Board - Fixture'
        //     }
        //   }, */
        {
          path: '*',
          redirect: CARROM_BOARD_ROUTES.HOME
        }
      ]
    },
    {
      path: BASE_ROUTES.COUNTER_STRIKE,
      component: CounterStrike,
      meta: {
        title: 'Counter Strike'
      },
      children: [
        {
          path: COUNTER_STRIKE_ROUTES.HOME,
          component: Recent,
          meta: {
            title: 'Counter Strike - Home'
          }
        },
        {
          path: COUNTER_STRIKE_ROUTES.FIXTURES,
          component: Fixtures,
          meta: {
            title: 'Counter Strike - Fixtures'
          }
        },
        {
          path: COUNTER_STRIKE_ROUTES.RESULTS,
          component: Results,
          meta: {
            title: 'Counter Strike - Results'
          }
        },
        {
          path: COUNTER_STRIKE_ROUTES.POINTS,
          component: CounterStrikePoints,
          meta: {
            title: 'Counter Strike - Points'
          }
        },
        {
          path: COUNTER_STRIKE_ROUTES.TEAMS,
          component: Teams,
          meta: {
            title: 'Counter Strike - Teams'
          }
        },
        //   /* {
        //     path: COUNTER_STRIKE_ROUTES.FIXTURE,
        //     component: TableTennisScoreModal,
        //     meta: {
        //       title: 'Counter Strike - Fixture'
        //     }
        //   }, */
        {
          path: '*',
          redirect: COUNTER_STRIKE_ROUTES.HOME
        }
      ]
    },
    {
      path: BASE_ROUTES.FIFA,
      component: Fifa,
      meta: {
        title: 'FIFA'
      },
      children: [
        {
          path: FIFA_ROUTES.HOME,
          component: Recent,
          meta: {
            title: 'FIFA - Home'
          }
        },
        {
          path: FIFA_ROUTES.FIXTURES,
          component: Fixtures,
          meta: {
            title: 'FIFA - Fixtures'
          }
        },
        {
          path: FIFA_ROUTES.RESULTS,
          component: Results,
          meta: {
            title: 'FIFA - Results'
          }
        },
        {
          path: FIFA_ROUTES.POINTS,
          component: FutsalPoints,
          meta: {
            title: 'FIFA - Points'
          }
        },
        {
          path: FIFA_ROUTES.TEAMS,
          component: Teams,
          meta: {
            title: 'FIFA - Teams'
          }
        },
        //   /* {
        //     path: FIFA_ROUTES.FIXTURE,
        //     component: TableTennisScoreModal,
        //     meta: {
        //       title: 'FIFA - Fixture'
        //     }
        //   }, */
        {
          path: '*',
          redirect: FIFA_ROUTES.HOME
        }
      ]
    },
    {
      path: BASE_ROUTES.DOTA,
      component: Dota,
      meta: {
        title: 'Dota'
      },
      children: [
        {
          path: DOTA_ROUTES.HOME,
          component: Recent,
          meta: {
            title: 'Dota - Home'
          }
        },
        {
          path: DOTA_ROUTES.FIXTURES,
          component: Fixtures,
          meta: {
            title: 'Dota - Fixtures'
          }
        },
        {
          path: DOTA_ROUTES.RESULTS,
          component: Results,
          meta: {
            title: 'Dota - Results'
          }
        },
        {
          path: DOTA_ROUTES.POINTS,
          component: DotaPoints,
          meta: {
            title: 'Dota - Points'
          }
        },
        {
          path: DOTA_ROUTES.TEAMS,
          component: Teams,
          meta: {
            title: 'Dota - Teams'
          }
        },
        {
          path: '*',
          redirect: DOTA_ROUTES.HOME
        }
      ]
    },
    {
      path: '*',
      redirect: BASE_ROUTES.HOME
    }
  ]
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
});

export default router;
