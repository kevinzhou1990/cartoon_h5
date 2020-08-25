/**
 * @info: ZM-详情API
 * @author: PengGeng
 * @date: 8/18/20-3:07 下午
 */
import request from 'lib/request'
export const getZMDetail = function (cartoonId, data) {
  return request({
    url: `/api/cartoon/${cartoonId}`,
	  method: 'get'
  })
}
export const getAuthorOther = function (cartoonId, data) {
  return request({
    url: `/api/cartoon/rec/${cartoonId}`,
	  method: 'get'
  })
}
