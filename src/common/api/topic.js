/**
 * 专题相关接口
 */
import request from 'lib/request';
export const getTopic = special_id => {
  return request.get(`/api/special/${special_id}`);
};

export const reportRead = specialId => {
  return request.post(`/api/special/read/${specialId}`);
};

export const getTopicComments = id => {
  return request.get(`/api/comment/2/${id}`);
};
