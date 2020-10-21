import { getUpdateStatus } from '@/common/api/shelf';
const status = {
  state: {
    isLoading: true,
    isLogin: false,
    hasUpdate: false
  },
  mutations: {
    LOGIN_STATUS: (state, boolean) => {
      state.isLogin = boolean;
    },
    UPDATE_STATUS: (state, boolean) => {
      state.hasUpdate = boolean;
    },
    LOADING_STATUS: (state, boolean) => {
      state.isLoading = boolean;
    }
  },
  actions: {
    getLoginStatus: ({ commit }) => {
      return new Promise(resolve => {
        getUpdateStatus().then(res => {
          commit('LOADING_STATUS', false);
          commit('LOGIN_STATUS', res.code === 0);
          commit('UPDATE_STATUS', res.data.has_update);
          resolve();
        });
      });
    }
  }
};
export default status;
