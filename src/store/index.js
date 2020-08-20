import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import home from './modules/home'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const createPersisted = createPersistedState({
  storage: {
    getItem: (key) => sessionStorage.getItem(key),
    setItem: (key) => sessionStorage.setItem(key, { expires: 3, secure: true }),
    removeItem: (key) => sessionStorage.removeItem(key)
  },
  paths: ['SET_REC_DATA']
})
const store = new Vuex.Store({
  modules: { main, home },
  state: {
    tokenData: {}
  },
  mutations: {
    SET_TOKEN_DATA(state, tokenData){
      state.tokenData = tokenData
    }
  },
  actions: {},
  plugins: [createPersisted]
});
export default store;
