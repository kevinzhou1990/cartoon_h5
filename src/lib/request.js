import axios from 'axios';
import crypto from 'crypto-js';
import { getRandomStr } from './utils';

//创建axios实例
const service = axios.create({
  timeout: 2000, // 超时
  withCredentials: true
});
service.interceptors.request.use(
  config => {
    // 拦截请求，添加公共头部参数
    const timestamp = new Date().getTime();
    const appNonce = getRandomStr();
    const appKey = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e';
    const Authorization = '';
    const sign = crypto.MD5(`${timestamp}${appNonce}${appKey}`);
    config.headers = {
      'APP-TIMESTAMP': timestamp,
      'APP-NONCE': appNonce,
      'APP-SIGN': sign,
      Authorization
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    // 请求200的正常返回
    console.log(response.data, '----请求返回')
    if (response.data.code === '1003') {
    // TODO 去重新请求token
    } else if (response.data.code === '1004') {
    // TODO 去刷新token
    }
    return response.data;
  },
  error => {
    Promise.reject(error);
  }
);
// Vue.prototype.$request = instance;

export default service;
