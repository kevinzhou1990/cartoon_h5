import router from '@/router';
import store from '@/store';

const updateList = ['/home', '/shelf', '/mine'];

router.beforeEach((to, from, next) => {
  if (!store.state.token.access_token) {
    store.dispatch('getToken', {});
  }

  if (updateList.indexOf(to.path) !== -1) {
    // 跳转的路由在更新红点路由中则触发更新红点
    store.dispatch('getLoginStatus');
  }

  next();
});
