import Vue from 'vue';
import 'es6-promise/auto';
import Antd from 'ant-design-vue';
import { Plugin } from 'vue-fragment';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import store from './store';
import router from './router';
import './registerServiceWorker';

import '@/assets/sass/styles.scss';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Plugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
