import { getUpdateStatus } from '@/common/api/shelf';
const status = {
  namespaced: true,
  state: {
    hasUpdate: false
  },
  mutations: {
    UPDATE_STATUS: (state, boolean) => {
      state.hasUpdate = boolean;
    }
  },
  actions: {
    getRedPointStatus: ({ commit }) => {
      return new Promise(resolve => {
        getUpdateStatus().then(res => {
          commit('UPDATE_STATUS', res.data.has_update);
          resolve();
        });
      });
    }
  }
};
export default status;
