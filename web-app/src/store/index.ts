import Vue from 'vue';
import Vuex from 'vuex';

import scoreModal from './modules/scoreModal';
import tournaments from './modules/tournaments';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    scoreModal,
    tournaments
  },
  strict: debug
});
