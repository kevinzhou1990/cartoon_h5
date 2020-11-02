import axios from './utils/axios';
import crypto from 'crypto-js';
import env from './utils/env';
import { router } from '../router/index';
import { getRandomStr } from './utils';
import { getCookie } from './utils';

('@/lib/utils');
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

const option = {
  waits: [],
  alerts: [],
  requests: [],
  compTimer: null,
  refreshTimer: null
};

service.intercept({
  //拦截配置
  config(c) {
    console.log(c, c.url, '----====', env.isClient());
    const store = router.app.$store;
    let Authorization = store ? store.state.token.access_token : '';
    let refresh_token = store ? store.state.token.refresh_token : '';
    if (env.isClient()) {
      Authorization = getCookie('access_token');
      refresh_token = getCookie('refresh_token');
    }
    const timestamp = new Date().getTime();
    const appNonce = getRandomStr();
    const appKey = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e';
    const sign = crypto.MD5(`${timestamp}${appNonce}${appKey}`).toString();
    c.headers = {
      ...c.headers,
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
        option.requests.push(opt);
        clearTimeout(option.refreshTimer);
        return false;
      } else if (code === 1003) {
        console.log(c);
        if (env.isClient()) {
          console.log('clinet');
        } else if (env.isServer()) {
          console.log('server');
        }
        option.requests.push(opt);
        // 重新获取token
        router.app.$store.dispatch('getToken').then(res => {
          // console.log(document.cookie, '========');
          clearTimeout(option.refreshTimer);
          service.reset(option.requests);
          option.requests = [];
        });
        return false;
      } else if (code === 1209) {
        console.log('未登陆，跳转到登陆。。。。');
        return c.data;
      } else if (code === 1204) {
        // 异地登陆
        console.log('异地登陆。。。。。');
        return c.data;
      } else {
      }
      return Promise.reject(c);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ code: 502, msg: '请求超时~' });
    }
  },

  //请求失败
  fail(c) {
    const code = parseInt(c.status);
    return { code, msg: c.data.msg, res: c.data };
  },

  //请求完成
  complete(c) {
    // console.log('complete----', c.data);
    try {
      const key = c.key;
      let index;
      option.waits.some((item, i) => {
        if (item.key === key) {
          return (index = i);
        }
      });
      if (index > -1) {
        clearTimeout(option.waits[index].timer);
        option.waits.splice(index, 1);
      }
      clearTimeout(option.compTimer);
      option.compTimer = setTimeout(() => {
        option.waits = [];
        option.alerts = [];
      }, 5000);
      const err = parseInt(c.data.code);
      if (err !== 0 && err !== 1013 && err !== 1004 && err !== 999) {
        const a_i = option.alerts.indexOf(key);
        if (a_i > -1) {
          option.alerts.splice(a_i, 1);
          return;
        }
      }
    } catch (error) {
      option.waits = [];
      option.alerts = [];
    }
  }
});

// type:get为获取直接获取token，refresh为刷新token，res为请求返回对象
// async function tokenError(type, response) {
//   return store.dispatch(type === 'get' ? 'getToken' : 'refreshToken').then(res => {
//     if (res.code === 0) {
//       return service(response.config);
//     } else {
//       return Promise.reject(res);
//     }
//   });
// }

export default service;
