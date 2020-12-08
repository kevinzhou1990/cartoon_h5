import { getBanner, getRecommend } from '@/common/api/home';
import { getTabs } from '@/common/api/recommend';
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
    },
    backRouter: '',
    homeSearchVal: ''
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
    },
    SET_BACK_ROUTER: function(state, val) {
      state.backRouter = val;
    },
    SET_SEARCH_VAL: function(state, val) {
      state.homeSearchVal = val;
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
            commit('UPDATE_PAGE_INFO', {
              ...data,
              totalPage: res.data.total_pages,
              count: res.data.count
            });
            commit('UPDATE_REC_LIST', recList);
            return res;
          }
        })
        .catch(error => {
          console.log('error======', error);
        });
    },
    getRecTab({ commit }) {
      return getTabs().then(res => {
        let recData = [];
        res.data.data.map(item => {
          if (item.rec_id > 1) {
            recData.push({
              name: item.name,
              index: item.rec_id
            })
          }
        });
        commit('SET_REC_DATA', recData);
        return res;
      });
    }
  }
};
export default home;
