import request from '@/lib/request';
export const getFilterItem = function() {
  return request.get('api/find/choose');
};

export const getComicsList = function(data) {
  return request.get('/api/find', { params: { ...data } });
};
