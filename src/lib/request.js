import axios from './utils/axios';
import crypto from 'crypto-js';
import env from './utils/env';
import Toast from '@/common/plugin/toast';
import { router } from '../router/index';
import { getRandomStr, getCookie } from './utils';
import target from '../../config/romteAddress';
//创建axios实例
const service = axios.create({
  timeout: 2000, // 超时
  withCredentials: true,
  baseURL: env.isServer()
    ? process.env.NODE_ENV === 'production'
      ? target.prod
      : target.dev
    : '/',
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
  success(res, opt) {
    const code = parseInt(res.data.code);
    switch (code) {
      case 0:
        return res.data;
      case 1004:
        option.requests.push(opt);
        router.app.$store.dispatch('refreshToken').then(res => {
          clearTimeout(option.refreshTimer);
          service.reset(option.requests);
          option.requests = [];
        });
        return false;
      case 1003:
        option.requests.push(opt);
        // 重新获取token
        router.app.$store.dispatch('getToken').then(res => {
          clearTimeout(option.refreshTimer);
          service.reset(option.requests);
          option.requests = [];
        });
        return false;
      case 1209:
        console.log('未登陆，跳转到登陆。。。。');
        router.app.$store.commit('SET_USERS_INFO', {})
        return res.data;
      case 1204:
        // 异地登陆
        console.log('异地登陆。。。。。');
        router.app.$store.commit('SET_USERS_INFO', {})
        return res.data;
      default:
        return res.data;
    }
  },

  //请求失败
  fail(res) {
    const code = parseInt(res.status);
    Toast(res.msg || '系统出错,请稍后重试', {
      type: 'fail',
      duration: 3000
    });
    return { code, msg: res.msg, res: res.data };
  },

  //请求完成
  complete(res) {
    try {
      const key = res.key;
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
      const err = parseInt(res.data.code);
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

export default service;
