const CryptoJS = require('crypto-js')
/**
* 登陆des+base64加密
*/
const encryptDes = function(message, key = '1zKsCmor4blnFEhiWHfhZLtXFVfwEH3e') {
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse('20200717') // 偏移量
  const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString() //  加密出来为 bas64格式密文
}
/**
 * @info: 计算时间 单位已 秒为单位
 * @author: PengGeng
 * @date: 10/23/20-12:16 下午
 * @params clickValdateTime // 点击验证码出发的时间戳 new Date().getTime()
 *          entryTime // 进入页面的时间
 */
const sleepTimes = (entryTime, clickValdateTime) => {
  return (entryTime - clickValdateTime) % 1000
}
export {
  encryptDes,
  sleepTimes
}
