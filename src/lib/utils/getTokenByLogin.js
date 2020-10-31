import { getToken } from '@/common/api/index';
import { VERSION, PLATFORM, CHANNEL, DEVICE_ID, DEVICE_MODEL, CID, INSTALL_TIME } from '@/lib/utils/const';
import { router } from '@/router';

const getTokenParams = {
  version: VERSION, // 版本号
  platform: PLATFORM, // APP类型，1-PC web 2-H5 web 3-IOS APP 4-Android APP  5-后台管理web
  channel: CHANNEL, // APP渠道，目前固定为0
  device_id: DEVICE_ID, // 设备唯一标识
  device_model: DEVICE_MODEL, // 设备型号
  cid: CID, // 推送标识
  install_time: INSTALL_TIME // APP安装时间，APP必须
};
/**
 * @info: 获取tokenData数据
 * @author: PengGeng
 * @date: 8/19/20-2:39 下午
 */
async function getTokenByOAuth() {
  const resData = await getToken(getTokenParams);
  router.app.$store.dispatch('', resData.data);
  console.log('token data -----', resData);
  // if (resData && resData.code === 0) {
  //   sessionStorage.setItem('tokenData', JSON.stringify(resData.data) || {});
  //   store.commit('SET_TOKEN_DATA', resData.data);
  //   console.log(resData.data);
  // } else {
  //   Toast((resData && resData.msg) || '系统出错,请稍后重试');
  // }
}

async function refreshGetToken(refresh_token) {
  // const devive_id = sessionStorage.getItem('uniqueCode') || new Date().getTime()
  // const resData = await refreshToken({ refresh_token });
  // console.log('refresh token -----', resData);
  // if (resData && resData.code === 0) {
  //   sessionStorage.setItem('tokenData', JSON.stringify(resData.data) || {});
  //   store.commit('SET_TOKEN_DATA', resData.data);
  //   console.log(resData.data);
  // } else {
  //   Toast((resData && resData.msg) || '系统出错,请稍后重试');
  // }
}

export { getTokenByOAuth, refreshGetToken };
