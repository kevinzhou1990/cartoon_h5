import crypto from 'crypto-js';

/**
   * 获取16位随机字符串
   */
function getRandomStr (){
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
function encry (pwd, time) {
  const key = crypto.enc.Utf8.parse(
    `${time}1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e`
  );
  const iv = crypto.enc.Utf8.parse('20200717');
  return crypto.TripleDES.encrypt(pwd, key, {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  }).toString();
}

export {
  encry,
  getRandomStr
}
