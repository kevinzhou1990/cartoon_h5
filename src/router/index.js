import Vue from 'vue';
import Router from 'vue-router';
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
