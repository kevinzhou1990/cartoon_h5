import request from '@/lib/request';
export const getFilterItem = function() {
  return request.get('api/find/choose');
};
