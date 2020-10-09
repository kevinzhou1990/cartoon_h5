import axios from 'axios';
import crypto from 'crypto-js';
import { getRandomStr, getCookie } from './utils';
// import store from '@/store';
//创建axios实例
const service = axios.create({
  timeout: 2000, // 超时
  withCredentials: true
});
// let loading = []
service.interceptors.request.use(
  config => {
    // const TOKEN_DATA = store.state.token;
    // 拦截请求，添加公共头部参数
    const Authorization = getCookie('token') || '';
    const timestamp = new Date().getTime();
    const appNonce = getRandomStr();
    const appKey = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e';
    // const Authorization = (TOKEN_DATA && TOKEN_DATA.access_token) || '';
    const sign = crypto.MD5(`${timestamp}${appNonce}${appKey}`);
    config.headers = {
      'APP-TIMESTAMP': timestamp,
      'APP-NONCE': appNonce,
      'APP-SIGN': sign,
      Authorization
    };
    if (config.url === 'api/oauth' && config.method === 'put') {
      config.data = {
        // refresh_token: TOKEN_DATA.refresh_token
      };
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    // 请求200的正常返回
    if (response.data.code === 1003) {
      // TODO 去重新请求token
      return tokenError('get', response);
    } else if (response.data.code === 1004) {
      // TODO 去刷新token
      return tokenError('refresh', response);
    } else {
      return response.data;
    }
  },
  error => {
    Promise.reject(error);
  }
);

// type:get为获取直接获取token，refresh为刷新token，res为请求返回对象
async function tokenError(type, response) {
  // return store.dispatch(type === 'get' ? 'getToken' : 'refreshToken').then(res => {
  //   if (res.code === 0) {
  //     return service(response.config);
  //   } else {
  //     return Promise.reject(res);
  //   }
  // });
}

export default service;
