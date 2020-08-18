import { getToken } from '@/common/api/index'

const getTokenParams = {
  version: '1.0.0', // 版本号
  platform: 2, // APP类型，1-PC web 2-H5 web 3-IOS APP 4-Android APP  5-后台管理web
  channel: 0, // APP渠道，目前固定为0
  device_id: 'test001', // 设备唯一标识
  device_model: 'iphone X', // 设备型号
  cid: '11111', // 推送标识
  install_time: '1578294652' // APP安装时间，APP必须
}
async function getTokenByOAuth () {
  const resData = await getToken(getTokenParams)
  if (resData && resData.code === 0) {
    console.log(resData)
  } else {
    this.$toast((resData && resData.msg) || '系统出错,请稍后重试')
  }
}

export default getTokenByOAuth()
