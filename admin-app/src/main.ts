import Vue from 'vue';
import Antd from 'ant-design-vue';
import { Plugin } from 'vue-fragment';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import interceptorSetup from './utils/interceptor';

import '@/assets/sass/styles.scss';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Plugin);

interceptorSetup();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
