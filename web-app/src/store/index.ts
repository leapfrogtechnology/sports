import Vue from 'vue';
import Vuex from 'vuex';

import tournaments from './modules/tournaments';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    tournaments
  },
  strict: debug
});
