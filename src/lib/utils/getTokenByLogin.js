import { getToken, refreshToken } from '@/common/api/index';
import store from '@/store/index';
import Toast from '@/common/plugin/toast';
const getTokenParams = {
  version: '1.0.0', // 版本号
  platform: 2, // APP类型，1-PC web 2-H5 web 3-IOS APP 4-Android APP  5-后台管理web
  channel: 0, // APP渠道，目前固定为0
  device_id: '', // 设备唯一标识
  device_model: 'iphone X', // 设备型号
  cid: '11111', // 推送标识
  install_time: '1578294652' // APP安装时间，APP必须
};
/**
 * @info: 获取tokenData数据
 * @author: PengGeng
 * @date: 8/19/20-2:39 下午
 */
async function getTokenByOAuth() {
  getTokenParams.device_id = localStorage.getItem('quniCode') || new Date().getTime();
  const resData = await getToken(getTokenParams);
  if (resData && resData.code === 0) {
    sessionStorage.setItem('tokenData', JSON.stringify(resData.data) || {});
    store.commit('SET_TOKEN_DATA', resData.data);
    console.log(resData.data);
  } else {
    Toast((resData && resData.msg) || '系统出错,请稍后重试');
  }
}

async function refreshGetToken(refresh_token) {
  // const devive_id = sessionStorage.getItem('uniqueCode') || new Date().getTime()
  const resData = await refreshToken({ refresh_token });
  if (resData && resData.code === 0) {
    sessionStorage.setItem('tokenData', JSON.stringify(resData.data) || {});
    store.commit('SET_TOKEN_DATA', resData.data);
    console.log(resData.data);
  } else {
    Toast((resData && resData.msg) || '系统出错,请稍后重试');
  }
}

export { getTokenByOAuth, refreshGetToken };
