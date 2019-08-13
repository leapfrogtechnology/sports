import Vue from 'vue';
import { VueSelect } from 'vue-select';

import 'vue-select/dist/vue-select.css';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.component('v-select', VueSelect as any);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
