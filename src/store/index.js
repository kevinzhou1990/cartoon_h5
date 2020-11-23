import Vue from 'vue';
import Vuex from 'vuex';
import env from '@/lib/utils/env';
import main from './modules/main';
import home from './modules/home';
import reader from './modules/reader';
import recommend from './modules/recommend';
import token from './modules/token';
import discovery from './modules/discovery';
import collect from './modules/collect';
import status from './modules/status';
import user from './modules/user';
import login from '@/views/login/store/index';
import ranking from './modules/ranking';
import topic from './modules/topic';
import comments from './modules/comments';
import detail from './modules/detail';
import help from './modules/help';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const storeModules = {
  main,
  home,
  reader,
  recommend,
  token,
  discovery,
  collect,
  ranking,
  topic,
  comments,
  detail,
  status,
  user,
  help,
  login
};

let store = null;
if (env.isClient()) {
  const createPersisted = createPersistedState({
    storage: sessionStorage
    // paths: [
    //   'reader',
    //   'recommend',
    //   'token',
    //   'collect',
    //   'home',
    //   'comments',
    //   'detail',
    //   'status',
    //   'user',
    //   'login',
    //   'help'
    // ]
  });
  store = new Vuex.Store({
    modules: { ...storeModules },
    state: {},
    mutations: {},
    actions: {},
    plugins: [createPersisted]
  });
} else {
  store = new Vuex.Store({
    modules: { ...storeModules },
    state: {},
    mutations: {},
    actions: {}
  });
}

export const createStore = () => {
  return store;
};

export const storeInstance = store;
