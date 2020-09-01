import axios from 'axios';
import crypto from 'crypto-js';
import { getRandomStr } from './utils';
import { getTokenByOAuth, refreshGetToken } from 'lib/utils/getTokenByLogin';
// import Prestranining from '@/common/components/prestrain' todo loading 动画
//创建axios实例
const service = axios.create({
  timeout: 2000, // 超时
  withCredentials: true
});
// let loading = []
service.interceptors.request.use(
  config => {
    const TOKEN_DATA = JSON.parse(sessionStorage.getItem('tokenData'));
    // 拦截请求，添加公共头部参数
    const timestamp = new Date().getTime();
    const appNonce = getRandomStr();
    const appKey = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e';
    const Authorization = (TOKEN_DATA && TOKEN_DATA.access_token) || '';
    const sign = crypto.MD5(`${timestamp}${appNonce}${appKey}`);
    config.headers = {
      'APP-TIMESTAMP': timestamp,
      'APP-NONCE': appNonce,
      'APP-SIGN': sign,
      Authorization
    };
	  /* 判断是否显示loading动画 */
	  // if (
    // 	  !config.hasOwnProperty('loading') ||
    // 	  (config.hasOwnProperty('loading') && config.loading)
	  // ) {
    //   setTimeout(() => {
    // 	  Prestranining(false)
    //   }, 0)
    //   loading.push(false)
	  // } else {
    //   loading.push(false)
	  // }
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
      // getTokenByOAuth();
    } else if (response.data.code === 1004) {
      // TODO 去刷新token
      return tokenError('refresh', response);
      // refreshGetToken();
    } else {
      return response.data;
    }
    // return response.data;
  },
  error => {
    Promise.reject(error);
  }
);
// 请求队列，用于token报错后，存储请求
let requestStock = [];
let isGetting = false;
let isRefreshing = false;
// type:get为获取直接获取token，refresh为刷新token，res为请求返回对象
async function tokenError(type, res) {
  if (!isGetting || !isRefreshing) {
    type === 'get' ? (isGetting = true) : (isRefreshing = true);
    if (type === 'get') {
      await getTokenByOAuth();
    } else {
      await refreshGetToken();
    }
    const Authorization = JSON.parse(sessionStorage.getItem('tokenData'))
      .access_token;
    if (sessionStorage.getItem('tokenData')) {
      requestStock.forEach(cb => cb(Authorization));
      requestStock = [];
      type === 'get' ? (isGetting = false) : (isRefreshing = false);
      return service(res.config);
    } else {
      return Promise.reject(res);
    }
  } else {
    return new Promise(resolve => {
      requestStock.push(token => {
        res.config.headers.Authorization = token;
        resolve(res.config);
      });
    });
  }
}

export default service;
