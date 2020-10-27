import axios from 'axios';
/* eslint-disable-next-line */
import Router from '../router/index';
import crypto from 'crypto-js';
import { getRandomStr } from './utils';
import store from '@/store';
// import Dialog from '@/common/plugin/dialog';
//创建axios实例
const service = axios.create({
  timeout: 2000, // 超时
  withCredentials: true
});
// let loading = []
service.interceptors.request.use(
  config => {
    const TOKEN_DATA = store.state.token;
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
    if (config.url === 'api/oauth' && config.method === 'put') {
      config.data = {
        refresh_token: TOKEN_DATA.refresh_token
      };
    }
    if (navigator.userAgent.search('isApp') !== -1) {
      // 手机app端获取注入到ua的token
      const reg = new RegExp(/token=.*$/gim);
      const t = reg.exec(navigator.userAgent)[0].split('=')[1];
      config.Authorization = t;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    const resCode = response.data.code

	  // 1003 Token错误; 1004 Token过期; 1209 未登陆 1205 账号已在其他设备登录
	  switch (resCode) {
		  case 1003:
			  // 去重新请求token
			  return tokenError('get', response);
		  case 1004:
			  // 去刷新token
			  return tokenError('refresh', response);
		  // 针对 登陆异常状况处理
		  case 1209:
		  // 未登陆的状态
      //   console.log('未登陆。。。。。')
		  //   Router.replace('/ZMLogin')
      //   return
      // case 1204:
	    //   // 异地登陆
	    //   console.log('异地登陆。。。。。')
      //   return
			  // eslint-disable-next-line no-fallthrough
		  default:
			  return response.data;
	  }
  },
  error => {
    Promise.reject(error);
  }
);

// type:get为获取直接获取token，refresh为刷新token，res为请求返回对象
async function tokenError(type, response) {
  return store.dispatch(type === 'get' ? 'getToken' : 'refreshToken').then(res => {
    if (res.code === 0) {
      return service(response.config);
    } else {
      return Promise.reject(res);
    }
  });
}

export default service;
