import crypto from 'crypto-js';

/**
 * 获取16位随机字符串
 */
function getRandomStr() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    let str = v.toString(16);
    return str;
  });
}
/**
 * 密码加密
 * @params pwd 待加密密码
 * @params time 13位时间戳
 * @returns password 加密结果
 */
function encry(pwd, time) {
  const key = crypto.enc.Utf8.parse(`${time}1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e`);
  const iv = crypto.enc.Utf8.parse('20200717');
  return crypto.TripleDES.encrypt(pwd, key, {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  }).toString();
}
/**
 * 时间戳转日期
 * @param {*} timestampToTime
 * @param {*} timestamp 时间戳
 * @type  {*} data 日期 dataTime 日期时间
 */
function timestampToTime(timestamp, type) {
  let times = 0;
  if (!timestamp) {
    times = 0;
  } else {
    times = timestamp * (timestamp.toString().length === 10 ? 1000 : 1) || 0;
  }
  let date = new Date(times); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '/';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  console.log(`${Y}${M}${D}${h}${m}${s}`);
  if (type === 'date') {
    return Y + M + D;
  } else {
    return Y + M + D + h + m + s; //时分秒可以根据自己的需求加上
  }
}
/*
 * @info 函数节流, 固定时间调取一次
 * @fn {function} 要执行的函数
 * @wait {number | ms} 要等待的毫秒数
 * */
function throttle(fn, wait = 300) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, wait);
  };
}

/**
 * @info 获取指定key的cookie
 * @param { String } key cookie key
 * @returns value 返回对应值
 */
function getCookie(key) {
  let arr;
  let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

/**
 * @info 设置cookie
 * @param { String } key cookie key
 * @param { String } value cookie value
 */
function setCookie(key, value) {
  let days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${escape(value)};expires=${exp.toUTCString()}`;
}

export { encry, getRandomStr, timestampToTime, throttle, getCookie, setCookie };
