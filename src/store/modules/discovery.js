import { getFilterItem } from '@/common/api/discovery';
const discovery = {
  state: {
    tags: [],
    places: [],
    sort: [],
    status: [{ name: '2222' }]
  },
  mutations: {
    UPDATESTATE: (state, data) => {
      state.tags = data.tags;
      state.places = data.places;
      state.sort = data.sort;
      state.status = data.status;
    }
  },
  actions: {
    getFilterItem: async ({ commit }) => {
      const res = await getFilterItem();
      if (res.code === 0) {
        commit('UPDATESTATE', res.data);
      }
    }
  }
};
export default discovery;
