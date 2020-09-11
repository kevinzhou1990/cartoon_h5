import { getFilterItem } from '@/common/api/discovery';
const discovery = {
  state: {},
  mutations: {},
  actions: {
    getFilterItem({ commit }) {
      getFilterItem().then(res => {
        console.log(res, 'discovery item');
      });
    }
  }
};
export default discovery;
