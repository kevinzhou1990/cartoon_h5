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

/**
 * 函数节流
 * @param {*} callback 回调函数
 * @param {*} delay 等待时间
 * @param {*} context 上下文
 * @param {Boolean} iselapsed 是否等待上一次执行完成
 * @returns {Function}
 */
function throttle(callback, delay = 200, context, iselapsed = false) {
  let timeout = null;
  let lastRun = 0;
  return function() {
    if (timeout) {
      if (iselapsed) {
        return '';
      } else {
        clearTimeout(timeout);
        timeout = null;
      }
    }
    let elapsed = Date.now() - lastRun;
    let args = arguments;
    if (iselapsed && elapsed >= delay) {
      execCallback();
    } else {
      timeout = setTimeout(execCallback, delay);
    }
    function execCallback() {
      lastRun = Date.now();
      timeout = false;
      callback.apply(context, args);
    }
  };
}

/**
 * 计算漫画章节中的图片索引
 * @param {Number} readPer 阅读记录百分比
 * @param {Number} total 当前章节总图片数
 * @returns {Number} 当前章节图片索引
 */
function getIndex(readPer, total) {
  return Math.ceil((readPer / 100) * total);
}
export { encry, getRandomStr, timestampToTime, throttle, getIndex };
