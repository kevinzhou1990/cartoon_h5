import { getTopic, getTopicComments } from '@/common/api/topic';
const topic = {
  state: {
    // 专题信息
    special: {
      special_id: 1,
      title: '开了个汉服店的日常，艾特戈壁电玩店失败第4天，求艾特教学',
      intro: '简介',
      can_comment: 1,
      detail: '',
      praise_num: 121212123121212,
      comment_num: 12988766212,
      created_at_text: 1597999717
    },
    // 专题评论列表
    commentsList: [],
    // 评论分页信息
    pageInfo: {
      page: 1,
      totalPage: 1,
      count: 1
    }
  },
  mutations: {
    UPDATE_SPECIAL: (state, data) => {
      state.special = data;
    },
    UPDATE_COMMENTS_LIST: (state, list) => {
      // if (state.pageInfo.page === 1) {
      state.commentsList = list;
    },
    UPDATE_PAGE_INFO: (state, pageInfo) => {
      state.pageInfo = { ...state.pageInfo, ...pageInfo };
    }
  },
  actions: {
    getTopic({ commit, state, dispatch }, id) {
      return getTopic(id, state.pageInfo.page)
        .then(res => {
          commit('UPDATE_SPECIAL', res.data);
          dispatch('getComments', { id, page: 1 });
          return res;
        })
        .catch(err => err);
    },
    getComments({ commit, state }, params) {
      if (params.page > state.pageInfo.totalPage) {
        return false;
      }
      return getTopicComments(params.id, params.page)
        .then(res => {
          const pageInfo = { count: res.data.count, page: state.pageInfo.page + 1, totalPage: res.data.total_pages };
          let list = [...state.commentsList];
          if (params.page !== 1) {
            list = [...list, ...res.data.data];
          } else {
            list = res.data.data;
          }
          commit('UPDATE_COMMENTS_LIST', list);
          commit('UPDATE_PAGE_INFO', pageInfo);
          return res;
        })
        .catch(err => err);
    }
  }
};
export default topic;
