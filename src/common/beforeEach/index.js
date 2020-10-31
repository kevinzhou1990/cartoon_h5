import { router } from '@/router';
import { storeInstance } from '@/store';

const updateList = ['/home', '/shelf', '/mine'];

router.beforeEach((to, from, next) => {
  if (!storeInstance.state.token.access_token) {
    storeInstance.dispatch('getToken', {});
  }

  if (updateList.indexOf(to.path) !== -1) {
    // 跳转的路由在更新红点路由中则触发更新红点
    storeInstance.dispatch('getLoginStatus');
  }
  next();
});
