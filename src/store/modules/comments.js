import { getCommentList, getEvalList } from '@/common/api/comments';
const comments = {
  namespaced: true,
  state: {
    // 评论或评分列表
    commentList: [],
    // 漫画详情
    details: {},
    // 评论或评分条数
    dataNumber: 0
  },
  mutations: {
    UPDATE_COMMENT_LIST: (state, data) => {
      state.commentList = data;
    },
    UPDATE_DETAILS: (state, data) => {
      state.details = data;
    },
    UPDATE_DATA_NUMBER: (state, data) => {
      state.dataNumber = data;
    }
  },
  actions: {
    getCommentList({ commit, state }, data) {
      if (parseInt(data.type) === 0) {
        return getCommentList(1, data.cartoonId, { page: data.page, page_size: 30 })
          .then(res => {
            let list = data.page === 1 ? res.data.data : [...state.commentList, ...res.data.data];
            console.log(list.length, 'dispatch', state.commentList.length);
            commit('UPDATE_COMMENT_LIST', list);
            commit('UPDATE_DETAILS', res.data.cartoon);
            commit('UPDATE_DATA_NUMBER', res.data.count);
            return res;
          })
          .catch(error => error);
      } else {
        return getEvalList(data.cartoonId, { page: data.page, page_size: 30 })
          .then(res => {
            console.log(res, 'eval');
            let list = data.page === 1 ? res.data.data : [...state.commentList, ...res.data.data];
            if (res.data.cartoon.score) {
              res.data.cartoon.score = res.data.cartoon.score.toFixed(1);
            }
            commit('UPDATE_COMMENT_LIST', list);
            commit('UPDATE_DETAILS', res.data.cartoon);
            commit('UPDATE_DATA_NUMBER', res.data.count);
            return res;
          })
          .catch(error => error);
      }
    }
  }
};
export default comments;
