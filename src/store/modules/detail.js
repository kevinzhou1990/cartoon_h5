import { getZMDetail, getAuthorOther } from '@/common/api/detail';
const detail = {
  namespaced: true,
  state: {
    ZMDetailData: {},
    // 作者的其他漫画
    authorOhter: [],
    // 你可能喜欢的漫画
    yourselfLikeComics: []
  },
  mutations: {
    UPDATE_ZMDETAIL_DATA: (state, data) => {
      state.ZMDetailData = data;
    }
  },
  actions: {
    getDetail({ commit }, params = {}) {
      return getZMDetail(params.cartoon_id || '', {
        ref: params.ref || '',
        ref_id: params.ref_id || ''
      })
        .then(res => {
          if (res) commit('UPDATE_ZMDETAIL_DATA', res.data);
          return res;
        })
        .catch(error => {
          console.log(error, '=========');
        });
    },
    getOtherInfo({ commit }, cartoonId) {
      return getAuthorOther(cartoonId)
        .then(res => {
          console.log('作者相关漫画信息', res);
          return res;
        })
        .catch(error => error);
    }
  }
};
export default detail;
