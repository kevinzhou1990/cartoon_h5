/**
 * @info: OAuto Token
 * @author: PengGeng
 * @date: 8/18/20-3:32 下午
 */
import request from 'lib/request';
// 获取token
export const getToken = function(data) {
  return request.lock.post('/api/oauth', { ...data });
};

// 刷新token
export const refreshToken = function(data) {
  return request.lock.put('api/oauth', { ...data });
};
