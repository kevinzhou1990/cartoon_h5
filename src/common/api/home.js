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
    params: data
  })
}

// 获取楼层
export const getRecommend = function (data = {}) {
  return request({
    url: '/api/home/recommend',
    method: 'get',
    params: data
  })
}
// 获取更多漫画
export const getMoreComics = function (recId, data = {}) {
  return request({
    url: `/api/cartoon/more/${recId}`,
    method: 'get',
    params: data
  })
}
// 轮播热词
export const searchWroldList = function(data = {}) {
  return request({
    url: 'api/search/home',
    method: 'get',
    params: data
  })
}
// 首页广告
export const getScreen = function(data = {}) {
  return request({
    url: 'api/home/screen',
    method: 'get',
    params: data
  })
}
