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
    getRankingList({ commit, dispatch, state }) {
      // 排行榜列表
      return getRankingCate().then(res => {
        if (res.code === 0) {
          commit('UPDATE_RANKING_LIST', res.data.data);
          if (!state.comicsList.length) {
            dispatch('getRankingComicsList', res.data.data[0].rank_id);
          }
        }
        return res;
      });
    },
    // 获取当前排行榜的漫画列表
    getRankingComicsList({ commit }, id) {
      return getRankingByCate(id)
        .then(res => {
          if (res.code === 0) {
            commit('UPDATE_COMICS_LIS', res.data.data);
          }
          return res;
        })
        .catch(error => error);
    }
  }
};
export default ranking;
