import { getBanner, getRecommend } from '@/common/api/home';
const home = {
  state: {
    recData: null,
    // banner list
    bannerList: [],
    // 楼层列表
    recList: [],
    // 楼层分页数据
    pageInfo: {
      page: 1,
      page_size: 10,
      totalPage: 1,
      count: 0
    }
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
    },
    UPDATE_PAGE_INFO: function(state, pageInfo) {
      state.pageInfo = pageInfo;
    }
  },
  actions: {
    // 获取banner
    getBanner({ commit }) {
      return getBanner()
        .then(res => {
          if (res.code === 0) {
            commit('UPDATE_BANNER_LIST', res.data.list);
            return res;
          }
        })
        .catch(error => {
          console.log('error=====', error);
        });
    },
    // 获取楼层
    getRec({ commit, state }, data = { page: 1, page_size: 10 }) {
      return getRecommend(data)
        .then(res => {
          if (res.code === 0) {
            const list = res.data.list;
            let recList = JSON.parse(JSON.stringify(state.recList));
            if (data.page !== 1) {
              recList.push(...list);
            } else {
              recList = list;
            }
            let recData = {};
            recList.map(item => {
              if (item.rec_id > 1) {
                recData[item.rec_id] = item.name;
              }
            });
            commit('UPDATE_PAGE_INFO', { ...data, totalPage: res.data.total_pages, count: res.data.count });
            commit('UPDATE_REC_LIST', recList);
            commit('SET_REC_DATA', recData);
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
