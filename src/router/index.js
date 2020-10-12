import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store';
import routers from './routers';
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export const router = new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
});

export const createRouter = () => {
  return router;
};

// export function createRouter() {
//   const router = new Router({
//     mode: 'history',
//     fallback: false,
//     scrollBehavior: () => ({ y: 0 }),
//     routes: routers
//   });
//   return router;
//   router.afterEach((to, from) => {
//     store.commit('updateActived', to.name);
//   });
// }
// const router = new Router({
//   mode: 'history',
//   routes: []
// });

// router.afterEach((to, from) => {
//   store.commit('updateActived', to.name);
// });
// export default router;
