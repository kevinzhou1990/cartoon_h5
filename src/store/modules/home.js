import { getBanner, getRecommend } from '@/common/api/home';
const home = {
  state: {
    recData: null,
    // banner list
    bannerList: [],
    // 楼层列表
    recList: []
  },
  mutations: {
    SET_REC_DATA: function(state, val) {
      state.recData = val;
    },
    UPDATE_BANNER_LIST: function(state, list) {
      state.bannerList = list;
      console.log('UPDATE_BANNER_LIST', list.length);
    },
    UPDATE_REC_LIST: function(state, list) {
      state.recList = list;
      console.log('UPDATE_REC_LIST', list.length);
    }
  },
  actions: {
    // 获取banner
    getBanner({ commit }) {
      return getBanner()
        .then(res => {
          if (res.code === 0) {
            return commit('UPDATE_BANNER_LIST', res.data.list);
          }
        })
        .catch(error => {
          console.log('error=====', error);
        });
    },
    // 获取楼层
    getRec({ commit }, data = { currentPage: 1, pageSize: 10 }) {
      return getRecommend(data)
        .then(res => {
          if (res.code === 0) {
            // commit('SET_REC_DATA');
            const recData = res.data.list;
            commit('UPDATE_REC_LIST', recData);
            return res;
          }
        })
        .catch(error => {
          console.log('error======', error);
        });
    }
  }
};
export default home;
