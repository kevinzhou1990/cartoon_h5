import { getMoreComics } from '@/common/api/home';
const recommend = {
  state: {
    // 楼层ID
    SEC_ID: 1,
    // 推荐漫画数据
    dataList: [],
    adBanner: [],
    pageInfo: {
      totalPage: 0,
      page_size: 30
    }
  },
  mutations: {
    UPDATE_SEC_ID: (state, data) => {
      state.SEC_ID = data;
    },
    UPDATE_DATA_LIST: (state, list) => {
      state.dataList = list;
    },
    UPDATE_PAGE_INFO: (state, info) => {
      state.pageInfo = { ...state.pageInfo, ...info };
    },
    UPDATE_ADBANNER: (state, adList) => {
      state.adBanner = adList;
    }
  },
  actions: {
    getRecommendList({ commit, state }, data) {
      return getMoreComics(data.secId, data.pageInfo)
        .then(res => {
          let list = state.dataList;
          data.pageInfo.page === 1
            ? (list = res.data.cartoon_list)
            : (list = [...list, ...res.data.cartoon_list]);
          commit('UPDATE_DATA_LIST', list);
          commit('UPDATE_PAGE_INFO', { totalPage: res.data.total_pages });
          commit('UPDATE_ADBANNER', res.data.ad_list);
          return res;
        })
        .catch(err => err);
    }
  }
};
export default recommend;
