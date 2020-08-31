import { getContents, getChapter } from '@/common/api/reader';
const reader = {
  state: {
    imagesList: {}, // 当前章节图片列表
    contentsList: [], // 漫画章节列表
    settingData: {}, // 阅读器设置
    localContents: {}, // 本地章节数据
    readerProcess: 0,
    comic: {} // 漫画信息
  },
  mutations: {
    UPDATE_IMAGELIST: (state, data) => {
      state.imagesList = { ...data };
    },
    UPDATE_CONTENTSLIST: (state, data) => {
      state.contentsList = [...data];
    },
    UPDATE_SETTINGDATA: (state, data) => {
      state.settingData = { ...data };
    },
    UPDATE_LOCALCONTENTS: (state, data) => {
      state.localContents = { ...data };
    },
    UPDATE_READERPROCESS: (state, data) => {
      state.readerProcess = data;
    },
    UPDATE_COMIC: (state, data) => {
      state.comic = data;
    }
  },
  actions: {
    getContentsData: async ({ commit }, cartoon_id) => {
      const list = await getContents(cartoon_id);
      if (list.code === 0) {
        commit('UPDATE_CONTENTSLIST', list.data.data);
      }
    },

    getChapterDetail: async ({ commit }, chapter_id) => {
      const chapter = await getChapter(chapter_id);
      let list = [];
      if (chapter.code === 0 && chapter.data.data) {
        // 处理本地进度数据，合并到新的数据上
        list = chapter.data.data[0];
      } else {
        list = { detail: [] };
      }
      commit('UPDATE_IMAGELIST', list);
    },

    saveProcess: ({ commit, state }, data) => {
      // 处理更新本地进度数据
      const dataKey = Object.keys(data);
      const localContents = JSON.parse(JSON.stringify(state.localContents));
      let d = localContents[dataKey[0]];
      if (d) {
        d = { ...d, ...data[dataKey[0]] };
      } else {
        d = data[dataKey[0]];
      }
      localContents[dataKey[0]] = d;
      commit('UPDATE_LOCALCONTENTS', localContents);
    }
  }
};
export default reader;
