import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import home from './modules/home';
import reader from './modules/reader';
import recommend from './modules/recommend';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const createPersisted = createPersistedState({
  storage: sessionStorage,
  paths: ['reader', 'recommend']
});
const store = new Vuex.Store({
  modules: { main, home, reader, recommend },
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
