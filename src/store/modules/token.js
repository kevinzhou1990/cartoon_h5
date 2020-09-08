import { getToken, refreshToken } from '@/common/api';
const token = {
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
      return new Promise(resolve => {
        refreshToken(data).then(res => {
          if (res.code === 0) {
            commit('UPDATE_TOKEN', res.data);
          }
          resolve(res);
        });
      });
    },
    getToken: ({ commit }, data) => {
      const getTokenParams = {
        version: '1.0.0', // 版本号
        platform: 2, // APP类型，1-PC web 2-H5 web 3-IOS APP 4-Android APP  5-后台管理web
        channel: 0, // APP渠道，目前固定为0
        device_id: localStorage.getItem('quniCode') || new Date().getTime(), // 设备唯一标识
        device_model: 'iphone X', // 设备型号
        cid: '11111', // 推送标识
        install_time: '1578294652' // APP安装时间，APP必须
      };
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
