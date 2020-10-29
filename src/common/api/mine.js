import request from '@/lib/request';

export const logout = function() {
  return request({
    url: '/api/user/logout',
    method: 'get'
  });
};
