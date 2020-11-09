import request from '@/lib/request';

//收藏夹是否有更新
export const getUpdateStatus = function() {
  return request({
    url: '/api/cartoon/bookshelf/update',
    method: 'get'
  });
};

//获取历史列表
export const getHistory = function() {
  return request({
    url: '/api/cartoon/history/list',
    method: 'get'
  });
};

//获取收藏夹列表
export const getGroupList = function() {
  return request({
    url: '/api/cartoon/bookshelf/group',
    method: 'get'
  });
};

//获取收藏夹里面的漫画列表
export const getCartoonByGroup = function(groupId) {
  return request({
    url: `/api/cartoon/bookshelf/list/${groupId}`,
    method: 'get'
  });
};
