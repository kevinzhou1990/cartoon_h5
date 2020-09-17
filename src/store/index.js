import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import home from './modules/home';
import reader from './modules/reader';
import recommend from './modules/recommend';
import token from './modules/token';
import discovery from './modules/discovery';
import collect from './modules/collect';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const createPersisted = createPersistedState({
  storage: sessionStorage,
  paths: ['reader', 'recommend', 'token', 'collect']
});
const store = new Vuex.Store({
  modules: { main, home, reader, recommend, token, discovery, collect },
  state: {},
  mutations: {},
  actions: {},
  plugins: [createPersisted]
});
export default store;
