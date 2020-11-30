import Vue from 'vue';
import Router from 'vue-router';
import routers from './routers';
Vue.use(Router);

const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export const router = new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: routers
});

export const createRouter = () => {
  return router;
};
