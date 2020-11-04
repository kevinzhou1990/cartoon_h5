import request from '@/lib/request';

/**
 * @info: 获取国家区号
 * @author: PengGeng
 * @date: 10/21/20-10:18 上午
 */
export const getCountryCode = function () {
  return request({
	  url: '/api/countryCode',
	  method: 'get'
  })
}

/**
 * @info: 密码登录
 * @author: PengGeng
 * @date: 10/21/20-10:21 上午
 */
export const loginByPass = function (data) {
  return request({
    url: '/api/user/loginByPass',
    method: 'POST',
	  data
  })
}
/**
 * @info: 验证码登陆
 * @author: PengGeng
 * @date: 10/21/20-10:22 上午
 */
export const loginByValidateCode = function (data) {
  return request({
    url: '/api/user/loginByCode',
    method: 'POST',
    data
  })
}

/**
 * @info: 找回密码
 * @author: PengGeng
 * @date: 10/21/20-10:24 上午
 */
export const fountPassword = function (data) {
  return request({
	  url: '/api/user/forget',
	  method: 'POST',
	  data
  })
}

/**
 * @info: 验证码检测
 * @author: PengGeng
 * @date: 10/21/20-10:25 上午
 */
export const checkValidateCode = function (data) {
  return request({
    url: '/api/user/checkCode',
	  method: 'POST',
	  data
  })
}
/**
 * @info: 获取短信验证码
 * @author: PengGeng
 * @date: 10/21/20-11:50 上午
 */
export const getSMSCode = function (data) {
  return request({
    url: '/api/sms/code',
	  method: 'POST',
	  data
  })
}
/**
 * @info: 获取图形验证码
 * @author: PengGeng
 * @date: 10/21/20-11:53 上午
 */
export const getImgCode = function () {
  return request({
    url: '/api/sms/captcha',
    method: 'GET'
  })
}
/**
 * @info: 验证图形验证码
 * @author: PengGeng
 * @date: 10/21/20-6:00 下午
 */
export const checkCaptcha = function (data) {
  return request({
    url: '/api/sms/checkCaptcha',
    method: 'POST',
	  data
  })
}
/**
 * @info: 修改密码
 * @author: PengGeng
 * @date: 11/4/20-5:27 下午
 */
export const updatePassword = function (data) {
	return request({
		url: 'api/user/updatePass',
		method: 'POST',
		data
	})
}
/**
 * @info: 获取用户协议
 * @author: PengGeng
 * @date: 10/22/20-10:24 上午
 */
export const getAgreement = function (type) {
  return request({
    url: `/api/agreement/${type}`,
	  method: 'get'
  })
}
