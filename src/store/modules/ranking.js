import { getRankingCate, getRankingByCate } from '@/common/api/ranking';
const ranking = {
  state: {
    // 漫画列表
    comicsList: [],
    // 排行榜列表
    rankingList: []
  },
  mutations: {
    UPDATE_COMICS_LIS: function(state, data) {
      state.comicsList = data;
    },
    UPDATE_RANKING_LIST: function(state, data) {
      state.rankingList = data;
    }
  },
  actions: {
    getRankingList({ commit }) {
      // 排行榜列表
      getRankingCate().then(res => {
        if (res.code === 0) {
          commit('UPDATE_RANKING_LIST', res.data.data);
        }
        return res;
      });
    },
    // 获取当前排行榜的漫画列表
    getComicsList({ commit }, id) {
      getRankingByCate(id).then(res => {
        if (res.code === 0) {
          commit('UPDATE_COMICS_LIS', res.data.data);
        }
        return res;
      });
    }
  }
};
export default ranking;
