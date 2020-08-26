import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import home from './modules/home';
import reader from './modules/reader';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const createPersisted = createPersistedState({
  storage: sessionStorage,
  paths: ['reader']
});
const store = new Vuex.Store({
  modules: { main, home, reader },
  state: {
    tokenData: {}
  },
  mutations: {
    SET_TOKEN_DATA(state, tokenData) {
      state.tokenData = tokenData;
    }
  },
  actions: {},
  plugins: [createPersisted]
});
export default store;
