import request from 'lib/request';
export const helpList = () => {
  return request.get('/api/user/help');
};
export const helpDetail = id => {
  return request.get(`/api/user/help/${id}`);
};
export const commitFeedback = data => {
  return request.post('/api/user/feedBack', { ...data });
};
