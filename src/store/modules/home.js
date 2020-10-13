import { getBanner } from '@/common/api/home';
const home = {
  state: {
    recData: null,
    bannerList: []
  },
  mutations: {
    SET_REC_DATA: function(state, val) {
      state.recData = val;
    },
    UPDATE_BANNER_LIST: function(state, list) {
      state.bannerList = list;
      console.log('UPDATE_BANNER_LIST', list.length);
    }
  },
  actions: {
    getBanner({ commit }) {
      return getBanner()
        .then(res => {
          if (res.code === 0) {
            commit('UPDATE_BANNER_LIST', res.data.list);
          }
        })
        .catch(error => {
          console.log('error=====', error);
        });
    }
  }
};
export default home;
