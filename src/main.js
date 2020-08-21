import Vue from 'vue';
import App from './App';
import router from './router';
import Button from '@/common/plugin/button';
import Dialog from '@/common/plugin/dialog';
import store from '@/store';
import Toast from '@/common/plugin/toast';
import 'lib-flexible';
import 'lib/utils/getDeviceID';
/**
 * 引入mintui
 */
import MintUI from 'mint-ui';
import './assets/style/index.scss';
import 'mint-ui/lib/style.css';
import { getTokenByOAuth } from 'lib/utils/getTokenByLogin';

// swpier组件
Vue.use(MintUI);
Vue.use(Button);
Vue.use(Dialog);
Vue.prototype.Toast = Toast;
Vue.config.productionTip = false;
router.beforeEach((to, form, next) => {
  const TOKEN_DATA = JSON.parse(sessionStorage.getItem('tokenData'))
  if (TOKEN_DATA && TOKEN_DATA.access_token){
    store.commit('SET_TOKEN_DATA', TOKEN_DATA)
  } else {
    // TODO 登陆 或者 获取token
    getTokenByOAuth()
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
});
