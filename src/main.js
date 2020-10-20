import Vue from 'vue';
import App from './App';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';
import env from '@/lib/utils/env';
// import Button from '@/common/plugin/button';
// import Dialog from '@/common/plugin/dialog';
// import store from '@/store';
import Toast from '@/common/plugin/toast';
import './assets/style/index.scss';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
if (env.isClient()) {
  require('lib-flexible');
}
// import 'lib-flexible';
// import 'lib/utils/getDeviceID';
/**
 * 引入mintui
 */

// import { getTokenByOAuth } from 'lib/utils/getTokenByLogin';

// swpier组件
Vue.use(MintUI);
// Vue.use(Button);
// Vue.use(Dialog);
Vue.prototype.Toast = Toast;
Vue.config.productionTip = false;

export function createApp() {
  // 创建router和store实例
  const router = createRouter();
  const store = createStore();
  // const originalPush = router.replace;
  // router.replace = function replace(location) {
  //   return originalPush.call(this, location).catch(err => err);
  // };

  // 同步路由状态(router state)到store
  sync(store, router);

  // 创建应用程序实例，将router和store注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // 暴露app, router 和 store
  return { app, router, store };
}

if (env.isClient()) {
}

// router.beforeEach((to, form, next) => {
//   if (!store.state.token.access_token) {
//     store.dispatch('getToken', {});
//   }
//   next();
// });
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   store,
//   template: '<App/>'
// });
