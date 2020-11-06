import request from '@/lib/request';

//个人详情
export const getUserInfo = function() {
  return request({
    url: '/api/user/info',
    method: 'get'
  });
};

//更新个人信息
export const updateUserInfo = function(data) {
  return request({
    url: '/api/user/info',
    method: 'put',
    data
  });
};

//上传头像
export const uploadFile = function(data) {
  console.log(data.get('file'))
  return request({
    url: '/api/upload',
    method: 'post',
    serialize: false,
    data
  });
};
