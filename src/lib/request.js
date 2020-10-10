import axios from './utils/axios';
import crypto from 'crypto-js';
import env from './utils/env';
import { getRandomStr } from './utils';
//创建axios实例
const service = axios.create({
  timeout: 2000, // 超时
  withCredentials: true,
  baseURL: env.isServer() ? 'http://10.1.15.99:9501/' : '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

service.intercept({
  //拦截配置
  config(c) {
    let Authorization = '';
    let refresh_token = '';
    const timestamp = new Date().getTime();
    const appNonce = getRandomStr();
    const appKey = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e';
    const sign = crypto.MD5(`${timestamp}${appNonce}${appKey}`);
    c.headers = {
      'APP-TIMESTAMP': timestamp,
      'APP-NONCE': appNonce,
      'APP-SIGN': sign,
      Authorization
    };
    if (c.url === 'api/oauth' && c.method === 'put') {
      c.data = {
        refresh_token
      };
    }
    return c;
  },

  //请求成功
  success(c, opt) {
    try {
      const code = parseInt(c.data.code);
      if (code === 0) {
        return c.data;
      } else if (code === 1004) {
        // 刷新token
        return false;
      } else if (code === 1003) {
        // 重新获取token
        return false;
      } else {
      }
      return Promise.reject(c);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ code: 502, msg: '请求超时~' });
    }
  },

  //请求失败
  fail() {},

  //请求完成
  complete() {}
});
// service.interceptors.request.use(
//   config => {
//     // 拦截请求，添加公共头部参数
//     let Authorization = '';
//     let refresh_token = '';
//     if (env.isClient()) {
//       Authorization = getCookie('token');
//       refresh_token = getCookie('refresh_token');
//     }
//     const timestamp = new Date().getTime();
//     const appNonce = getRandomStr();
//     const appKey = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e';
//     const sign = crypto.MD5(`${timestamp}${appNonce}${appKey}`);
//     config.headers = {
//       'APP-TIMESTAMP': timestamp,
//       'APP-NONCE': appNonce,
//       'APP-SIGN': sign,
//       Authorization
//     };
//     if (config.url === 'api/oauth' && config.method === 'put') {
//       config.data = {
//         refresh_token
//       };
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
// service.interceptors.response.use(
//   response => {
//     // 请求200的正常返回
//     if (response.data.code === 1003) {
//       // TODO 去重新请求token
//       return tokenError('get', response);
//     } else if (response.data.code === 1004) {
//       // TODO 去刷新token
//       return tokenError('refresh', response);
//     } else {
//       return response.data;
//     }
//   },
//   error => {
//     Promise.reject(error);
//   }
// );

// type:get为获取直接获取token，refresh为刷新token，res为请求返回对象
// async function tokenError(type, response) {
//   return response.data;
// return store.dispatch(type === 'get' ? 'getToken' : 'refreshToken').then(res => {
//   if (res.code === 0) {
//     return service(response.config);
//   } else {
//     return Promise.reject(res);
//   }
// });
// ?}

export default service;
