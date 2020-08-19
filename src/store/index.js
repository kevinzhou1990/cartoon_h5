import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: { main },
  state: {
    tokenData: {}
  },
  mutations: {
    SET_TOKEN_DATA(state, tokenData){
      state.tokenData = tokenData
    }
  },
  actions: {}
});
export default store;
