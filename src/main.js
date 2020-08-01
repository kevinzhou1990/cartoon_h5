import Vue from 'vue';
import App from './App';
import router from './router';
import install from './lib/request';
import Button from '@/common/plugin/button';
import 'lib-flexible';
/**
 * 引入mintui
 */
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
// swpier组件
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(MintUI);
Vue.use(VueAwesomeSwiper);
Vue.use(Button);
install(Vue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
