import { getRankingCate, getRankingByCate } from '@/common/api/ranking';
import { hex2rgb } from '@/lib/utils';
const ranking = {
  namespaced: true,
  state: {
    // 漫画列表
    comicsList: [],
    // 排行榜列表
    rankingList: [],
    currentRank: {}
  },
  mutations: {
    UPDATE_COMICS_LIS: function(state, data) {
      state.comicsList = data;
    },
    UPDATE_RANKING_LIST: function(state, data) {
      state.rankingList = data;
    },
    UPDATE_CURRENT_RANK: function(state, data) {
      state.currentRank = data;
    }
  },
  actions: {
    getRankingList({ commit, dispatch, state }, id) {
      // 排行榜列表
      return getRankingCate().then(res => {
        if (res.code === 0) {
          const rank = parseInt(id) || res.data.data[0].rank_id;
          if (!rank) {
            commit('UPDATE_CURRENT_RANK', rank);
          }
          commit('UPDATE_RANKING_LIST', res.data.data);
          dispatch('getRankingComicsList', rank);
        }
        return res;
      });
    },
    // 获取当前排行榜的漫画列表
    getRankingComicsList({ commit, state }, id) {
      return getRankingByCate(id)
        .then(res => {
          if (res.code === 0) {
            const list = state.rankingList;
            for (let i = 0; i < list.length; i++) {
              if (parseInt(id) === parseInt(list[i].rank_id)) {
                commit('UPDATE_CURRENT_RANK', list[i]);
                break;
              }
            }
            commit(
              'UPDATE_COMICS_LIS',
              res.data.data.map(item => {
                item.bk_color = hex2rgb(item.bk_color, 0.8);
                return item;
              })
            );
          }
          return res;
        })
        .catch(error => error);
    }
  }
};
export default ranking;
