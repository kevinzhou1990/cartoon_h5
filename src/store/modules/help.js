import { helpList, helpDetail, commitFeedback } from '@/common/api/help';
const help = {
  state: {
    tabListData: {},
    list: [],
    detail: {},
    allData: [],
    understand: false
  },
  mutations: {
    UPDATEHELPLIST: (state, list) => {
      state.list = list;
    },
    UPDATEHELPTABLISTDATA: (state, tabListData) => {
      state.tabListData = tabListData;
    },
    UPDATEHELPDETAIL: (state, detail) => {
      state.detail = detail;
    },
    INITALLDATA: (state, list) => {
      state.allData = list;
    },
    HELP_LIST_FILTER: (state, id) => {
      const data = state.allData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].group_id === parseInt(id)) {
          state.list = data[i].items;
        }
      }
      if (parseInt(id) === 0) {
        const list = [];
        data.forEach(item => {
          list.push(...item.items);
        });
        state.list = list;
      }
    },
    UPDATE_UNDERSTAND: state => {
      state.understand = !state.understand;
    }
  },
  actions: {
    getHelpList({ commit }) {
      helpList().then(res => {
        if (res.code === 0) {
          const tabListData = {};
          const group = res.data.group;
          group.forEach(item => {
            tabListData[item.group_id] = item.group_name;
          });
          const helps = res.data.help;
          const list = [];
          helps.forEach(item => {
            list.push(...item.items);
          });
          tabListData[0] = '全部';
          commit('UPDATEHELPLIST', list);
          commit('INITALLDATA', res.data.help);
          commit('UPDATEHELPTABLISTDATA', tabListData);
        }
      });
    },
    getHelpDetail({ commit }, id) {
      helpDetail(id).then(res => {
        commit('UPDATEHELPDETAIL', res.data);
      });
    },
    addFeedback({ commit }, data) {
      return commitFeedback(data);
    }
  }
};
export default help;
