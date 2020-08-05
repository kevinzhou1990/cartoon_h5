import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: { main },
  state: {},
  mutations: {},
  actions: {}
});
export default store;
