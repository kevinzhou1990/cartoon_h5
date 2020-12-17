import { getToken, refreshToken } from '@/common/api';

import {
  VERSION,
  PLATFORM,
  CHANNEL,
  DEVICE_ID,
  DEVICE_MODEL,
  CID,
  INSTALL_TIME
} from '@/lib/utils/const';

const token = {
  namespaced: true,
  state: {
    access_token: '',
    expires: '',
    refresh_token: '',
    refresh_expires: ''
  },
  mutations: {
    UPDATE_TOKEN: (state, data) => {
      state.access_token = data.access_token;
      state.expires = data.expires;
      state.refresh_token = data.refresh_token;
      state.refresh_expires = data.refresh_expires;
    }
  },
  actions: {
    refreshToken: ({ commit }, data) => {
      return refreshToken(data).then(res => {
        if (res.code === 0) {
          commit('UPDATE_TOKEN', res.data);
        }
        return res;
      });
    },
    getToken: ({ state, commit }) => {
      const getTokenParams = {
        version: VERSION, // 版本号
        platform: PLATFORM, // APP类型，1-PC web 2-H5 web 3-IOS APP 4-Android APP  5-后台管理web
        channel: CHANNEL, // APP渠道，目前固定为0
        device_id: DEVICE_ID, // 设备唯一标识
        device_model: DEVICE_MODEL, // 设备型号
        cid: CID, // 推送标识
        install_time: INSTALL_TIME // APP安装时间，APP必须
      };
      console.log(DEVICE_ID, 'gettoken');
      return new Promise(resolve => {
        getToken(getTokenParams).then(res => {
          if (res.code === 0) {
            commit('UPDATE_TOKEN', res.data);
          }
          resolve(res);
        });
      });
    }
  }
};
export default token;
