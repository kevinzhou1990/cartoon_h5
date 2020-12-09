import { helpList, helpDetail, commitFeedback } from '@/common/api/help';
const help = {
  state: {
    tabListData: [],
    list: [],
    detail: {},
    allData: [],
    understand: false,
    activeIndex: 0
  },
  mutations: {
    UPDATE_ACTIVED_INDEX: (state, index) => {
      state.activeIndex = index;
    },
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
      let list = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].group_id === parseInt(id)) {
          list = data[i].items;
        }
      }
      if (parseInt(id) === 0) {
        list = [];
        data.forEach(item => {
          list.push(...item.items);
        });
      }
      state.list = list;
    },
    UPDATE_UNDERSTAND: (state, helpId) => {
      const list = state.list;
      for (let i = 0; i < list.length; i++) {
        if (list[i].help_id === helpId) {
          list[i].readed = !list[i].readed;
        }
      }
    }
  },
  actions: {
    getHelpList({ commit }) {
      return helpList().then(res => {
        if (res.code === 0) {
          const tabListData = [];
          const group = res.data.group;
          tabListData[0] = { index: 0, name: '全部' };
          group.forEach(item => {
            tabListData.push({ name: item.group_name, index: item.group_id });
            // tabListData[item.group_id] = item.group_name;
          });
          const helps = res.data.help;
          const list = [];
          helps.forEach(item => {
            list.push(...item.items);
          });
          list.map(item => {
            item.readed = false;
          });
          commit('UPDATEHELPLIST', list);
          commit('INITALLDATA', res.data.help);
          commit('UPDATEHELPTABLISTDATA', tabListData);
        }
        return res;
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
