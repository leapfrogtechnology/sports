import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import modal from './modules/modal';
import games from './modules/games';
import rounds from './modules/rounds';
import statuses from './modules/statuses';
import employees from './modules/employees';
import categories from './modules/categories';
import tournaments from './modules/tournaments';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    modal,
    games,
    rounds,
    statuses,
    employees,
    categories,
    tournaments
  },
  strict: debug
});
