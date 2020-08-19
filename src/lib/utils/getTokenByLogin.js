import Fingerprint2 from 'fingerprintjs2'
import { getToken } from '@/common/api/index'
import store from '@/store/index'
import Toast from '@/common/plugin/toast';

const getTokenParams = {
  version: '1.0.0', // 版本号
  platform: 2, // APP类型，1-PC web 2-H5 web 3-IOS APP 4-Android APP  5-后台管理web
  channel: 0, // APP渠道，目前固定为0
  device_id: '', // 设备唯一标识
  device_model: 'iphone X', // 设备型号
  cid: '11111', // 推送标识
  install_time: '1578294652' // APP安装时间，APP必须
}
/**
 * @info: 获取浏览器的指纹ID当作浏览器的唯一标识来做确定一个用户
 * @tip  TODO 一个手机上多个浏览器浏览代表多个用户 无法结局在H5
 * @author: PengGeng
 * @date: 8/18/20-5:44 下午
 */
function getDeviceId(callback) {
  let quniCode = ''
  if (window.requestIdleCallback) {
    requestIdleCallback(function () {
      Fingerprint2.get(function (components) {
        let values = components.map((component) => {
          return component.value
        })
        quniCode = Fingerprint2.x64hash128(values.join(''), 31)
        if (callback && typeof callback === 'function') {
          return callback(quniCode)
        }
      })
    })
  } else {
    setTimeout(() => {
      Fingerprint2.get(function (components) {
        let values = components.map((component) => {
          return component.value
        })
        quniCode = Fingerprint2.x64hash128(values.join(''), 31)
        if (callback && typeof callback === 'function') {
          return callback(quniCode)
        }
      })
    }, 200)
  }
}

/**
 * @info: 获取tokenData数据
 * @author: PengGeng
 * @date: 8/19/20-2:39 下午
 */
async function getTokenByOAuth (device_id) {
  getTokenParams.device_id = device_id
  const resData = await getToken(getTokenParams)
  if (resData && resData.code === 0) {
    sessionStorage.setItem('tokenData', JSON.stringify(resData.data) || {})
    store.commit('SET_TOKEN_DATA', resData.data)
    console.log(resData.data)
  } else {
    Toast((resData && resData.msg) || '系统出错,请稍后重试')
    // Toast((resData && resData.msg) || '系统出错,请稍后重试')
  }
}
getDeviceId(res => {
  getTokenByOAuth(res)
})
export default getDeviceId()
