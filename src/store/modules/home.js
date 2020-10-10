import { getBanner } from '@/common/api/home';
const home = {
  state: {
    recData: null,
    bannerList: []
  },
  mutations: {
    SET_REC_DATA: function(state, val) {
      state.recData = val;
    },
    UPDATE_BANNER_LIST: function(state, list) {
      state.bannerList = list;
    }
  },
  actions: {
    getBanner() {
      getBanner()
        .then(res => {
          console.log('res======', res);
        })
        .catch(error => {
          console.log('error=====', error);
        });
    }
  }
};
export default home;
