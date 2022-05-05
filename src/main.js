import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 引入页面scss
import './style/style.scss';
// 引入iconfont
import './assets/iconfont/iconfont.css';

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入 BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// 引入font-awesome字体图标
import 'font-awesome/scss/font-awesome.scss';

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// 引入 axios
import axios from 'axios';
Vue.prototype.$linkage = axios;

// 全局引入封装的函数
import publicMethod from '../public/public_method.js';
Vue.prototype.$publicMethod = publicMethod;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
