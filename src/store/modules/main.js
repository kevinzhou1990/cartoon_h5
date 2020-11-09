const main = {
  state: {
    actived: 'home'
  },
  mutations: {
    UPDATE_ACTIVED(state, data) {
      console.log('UPDATE_ACTIVED', data);
      state.actived = data;
    }
  },
  actions: {
    updateActive({ commit }, data) {
      commit('UPDATE_ACTIVED', data);
    }
  }
};
export default main;
