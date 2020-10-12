import axios from './utils/axios';
import crypto from 'crypto-js';
import env from './utils/env';
import { router } from '../router/index';
import { getRandomStr } from './utils';
import { v4 as uuidV4 } from 'uuid';
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
    console.log('request url ------', c.url);
    let Authorization = router.app.$store.state.token.access_token;
    let refresh_token = router.app.$store.state.token.refresh_token;
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
      console.log('-----successed', c.data);
      const code = parseInt(c.data.code);
      if (code === 0) {
        return c.data;
      } else if (code === 1004) {
        // 刷新token
        option.requests.push(opt);
        clearTimeout(option.refreshTimer);
        // option.refreshTimer = setTimeout(() => {
        //   const token = storage.get(TOKEN) || getTokens();
        //   token &&
        //     service.lock
        //       .post(api.refreshToken, {
        //         refresh_token: token.refresh
        //       })
        //       .then(res => {
        //         storage.put(TOKEN, res.data);
        //         bus.$emit('REFRESH.TOKEN', { data: res.data, type: 'suc' });
        //         instance.reset(option.requests);
        //         option.requests = [];
        //       });
        // }, 120);
        return false;
      } else if (code === 1003) {
        console.log('only tag----', uuidV4());
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
  fail(c) {
    const code = parseInt(c.status);
    return { code, msg: c.data.msg, res: c.data };
  },

  //请求完成
  complete(c) {
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
    console.log('-------complete', c.config.url, c.data);
  }
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
