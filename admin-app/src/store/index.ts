import Vue from 'vue';
import Vuex from 'vuex';

import modal from './modules/modal';
import games from './modules/games';
import categories from './modules/categories';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    modal,
    games,
    categories
  },
  strict: debug
});
