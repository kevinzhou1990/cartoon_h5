const collect = {
  namespaced: true,
  state: {
    shelfTab: '收藏',
    active: 'default'
  },
  mutations: {
    updateActive(state, data) {
      state.active = data;
    },
    updateTab(state, data) {
      state.shelfTab = data;
    }
  },
  actions: {}
};
export default collect;
