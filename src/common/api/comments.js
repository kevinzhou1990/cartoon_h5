import request from '@/lib/request';

export const getCommentList = function(type, cartoonId, data = {}) {
  //type: 1:漫画评论  2:专题评论
  return request({
    url: `/api/comment/${type}/${cartoonId}`,
    method: 'get',
    params: data
  });
};
//评分接口
export const getEvalList = function(cartoonId, data = {}) {
  return request({
    url: `/api/cartoon/eval/${cartoonId}`,
    method: 'get',
    params: data
  });
};
