const CryptoJS = require('crypto-js')
/**
* 登陆des+base64加密
*/
export const encryptDes = function(message, key = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e') {
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse('20200717') // 偏移量
  const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString() //  加密出来为 bas64格式密文
}
