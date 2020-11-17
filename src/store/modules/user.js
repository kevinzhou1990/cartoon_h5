import { getUserInfo, updateUserInfo, uploadFile } from '@/common/api/user';
const user = {
  actions: {
    //获取用户信息
    getUserInfo: ({ commit }) => {
      return new Promise(resolve => {
        getUserInfo()
          .then(res => {
            commit('SET_USERS_INFO', res.data.user);
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            resolve(err);
          });
      });
    },
    //更新用户信息
    updateUserInfo: ({ commit }, data) => {
      return new Promise(resolve => {
        updateUserInfo(data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            resolve(err);
          });
      });
    },
    // 上传文件
    uploadFile: ({ commit }, data) => {
      return new Promise(resolve => {
        uploadFile(data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            resolve(err);
          });
      });
    }
  }
};
export default user;
