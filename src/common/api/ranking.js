import request from '@/lib/request';

export const getRankingCate = function() {
  return request({
    url: '/api/rank/cate',
    method: 'get'
  });
};

export const getRankingByCate = function(rankingId) {
  return request({
    url: `/api/rank/${rankingId}`,
    method: 'get'
  });
};
