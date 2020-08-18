import axios from 'axios';
import crypto from 'crypto-js';
import { getRandomStr } from './utils';

function install(Vue) {
  //创建axios实例
  const instance = axios.create({
    timeout: 2000, // 超时
    withCredentials: true
  });
  instance.interceptors.request.use(
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
  instance.interceptors.response.use(
    response => {
      // 请求200的正常返回
      console.log(response, '----请求返回');
      Promise.resolve(response.data);
    },
    error => {
      Promise.reject(error);
    }
  );
  Vue.prototype.$request = instance;
}

export default install;
