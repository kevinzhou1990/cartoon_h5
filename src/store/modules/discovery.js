import { getFilterItem, getComicsList } from '@/common/api/discovery';
// import Toast from '@/common/plugin/toast';
const discovery = {
  state: {
    tags: [],
    places: [],
    sort: [],
    status: [{ name: '2222' }],
    checked: {
      tag_id: 0,
      place_id: 0,
      status: 1,
      sort: 1
    },
    comicsList: []
  },
  mutations: {
    UPDATESTATE: (state, data) => {
      state.tags = data.tags;
      state.places = data.places;
      state.sort = data.sort;
      state.status = data.status;
      state.checked = {
        tag_id: data.tags[0] ? data.tags[0].tag_id : 0,
        place_id: data.places[0] ? data.places[0].tag_id : 0,
        status: data.status[0] ? data.status[0].id : 1,
        sort: data.sort[0] ? data.sort[0].id : 1
      };
    },
    UPDATECHECKED: (state, data) => {
      state.checked = { ...state.checked, ...data };
    },
    UPDATECOMICSLIST: (state, data) => {
      state.comicsList = data;
    }
  },
  actions: {
    getFilterItem: async ({ commit }) => {
      const res = await getFilterItem();
      if (res.code === 0) {
        commit('UPDATESTATE', res.data);
      }
    },
    getComicsList: async ({ commit, state }, data) => {
      const res = await getComicsList(data);
      if (res.code === 0) {
        console.log('page', data.page);
        let list = JSON.parse(JSON.stringify(state.comicsList));
        const page = data.page;
        const resdata = res.data;
        if (page === 1) {
          list = resdata.data;
        } else {
          list = [...list, ...resdata.data];
        }
        commit('UPDATECOMICSLIST', list);
      } else {
        console.log('错误信息', res);
      }
    }
  }
};
export default discovery;
