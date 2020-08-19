import Fingerprint2 from 'fingerprintjs2'

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

export default getDeviceId
