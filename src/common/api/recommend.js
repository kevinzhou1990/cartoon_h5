/**
 * @info: 推荐API
 * @author: PengGeng
 * @date: 8/18/20-2:12 下午
 */
import request from 'lib/request'

export const getTabs = function (data = {}) {
  return request({
    url: '/api/cartoon/recommend/tabs',
    method: 'get',
    data
  })
}
