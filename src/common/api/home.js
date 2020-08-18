/**
 * @info: ZM首页API
 * @author: PengGeng
 * @date: 8/18/20-2:28 下午
 */
import request from 'lib/request'

// 获取banner广告
export const getBanner = function (data = {}) {
  return request({
    url: '/api/home/banner',
    method: 'get',
    data
  })
}

// 获取楼层
export const getRecommend = function (data = {}) {
  return request({
    url: '/api/home/recommend',
    method: 'get',
    data
  })
}
