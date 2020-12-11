import { router } from '@/router';
import { storeInstance } from '@/store';

const updateList = ['/home', '/shelf', '/mine'];

router.beforeEach((to, from, next) => {
  storeInstance.dispatch('updateActive', to.name);
  // if (!storeInstance.state.token.access_token) {
  //   storeInstance.dispatch('getToken', {});
  // }

  if (updateList.indexOf(to.path) !== -1) {
    storeInstance.dispatch('getUserInfo').then(() => {
      let userInfo = storeInstance.state.login.userInfo;
      if (JSON.stringify(userInfo) !== '{}' && typeof userInfo === 'object') {
        // 跳转的路由在更新红点路由中则触发更新红点, 有登录态时更新红点
        storeInstance.dispatch('status/getRedPointStatus');
      } else {
        storeInstance.commit('status/UPDATE_STATUS', false);
      }
    });
  }
  next();
});
