<template>
  <div style="height: 100%">
    <avatar v-if="setAvatar" return-type="file" :input-file="file" @cancel="setAvatar = false" @enter="uploadAvatar"></avatar>

    <div class="personal" v-else>
      <z-m-header title-text="个人设置" has-border />

      <div class="main">
        <div class="base-info">
          <ul>
            <li class="zm-b-b">
              <section>
                <span>头像</span>
                <img :src="info.avatar || imgSrc" class="avatar">
              </section>
              <input
                type="file"
                class="avatar-input"
                accept="image/*"
                @change="changeAvatar"
              />
            </li>
            <li class="zm-b-b">
              <section @click="jumpUpdateNickname">
                <span>昵称</span>
                <span class="content">{{ info.nickname }}</span>
              </section>
            </li>
            <li class="zm-b-b">
              <section @click="genderVisible = true">
                <span>性别</span>
                <span class="content">{{ info.gender | mapGender}}</span>
              </section>
            </li>
          </ul>

          <mt-actionsheet
            class="custom-gender-actionsheet"
            :actions="genderArr"
            v-model="genderVisible">
          </mt-actionsheet>
        </div>

        <div class="login-info mt-8">
          <ul>
            <li class="zm-b-b" data-type="phone">
              <section>
                <span>手机号</span>
                <span class="content pr-0">{{ info.mobile }}</span>
              </section>
            </li>
            <li class="zm-b-b">
              <section @click="jumpRestPwd">
                <span>密码重置</span>
              </section>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import Avatar from './avatar'
import { uploadFile } from '@/common/api/user';
export default {
  components: { ZMHeader, Avatar },
  data(){
    return {
      genderVisible: false,
      genderArr: [
        {
          name: '男',
          value: 1,
          method: this.selectGender
        },
        {
          name: '女',
          value: 2,
          method: this.selectGender
        },
        {
          name: '保密',
          value: 0,
          method: this.selectGender
        }
      ],
      info: {},
      setAvatar: false,
      file: null,
      imgSrc: require('@/assets/img/default_head.png')
    }
  },
  filters: {
    mapGender(gender) {
      const genderMap = {
        1: '男',
        2: '女',
        0: '保密'
      };
      return genderMap[gender] || '';
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    //修改性别
    selectGender(value){
      console.log(value);
      let params = {
        gender: value.value
      };
      this.updateInfo(params, (res) => {
        if (res.code === 0){
          this.getInfo();
        } else {
          this.Toast(res.msg || '系统出错,请稍后重试', {
            type: 'fail',
            duration: 2000
          });
        }
      });
    },
    jumpUpdateNickname(){
      this.$router.push({
        path: '/personal/update-nickname'
      })
    },
    //修改信息(性别，头像)
    updateInfo(params, callback){
      this.$store.dispatch('updateUserInfo', params).then((res) => {
        if (typeof callback === 'function' && callback){
          callback(res)
        }
      })
    },
    //获取用户信息
    getInfo(){
      this.$store.dispatch('getUserInfo').then(() => {
        if (this.isLogin()){
          this.info = this.$store.state.login.userInfo;
        }
      })
    },
    //是否登录
    isLogin(){
      let userinfo = this.$store.state.login.userInfo;
      if (JSON.stringify(userinfo) !== '{}' && typeof userinfo === 'object'){
        return true
      } else {
        setTimeout(() => {
          this.Toast('用户信息验证失败!', {
            type: 'fail',
            duration: 2000
          });
        }, 250);

        //未登录，跳转到首页
        // this.$router.replace({
        //   path: '/'
        // });
        return false
      }
    },
    //跳转重置密码
    jumpRestPwd(){
      if (this.isLogin()){
        this.$router.push({
          path: '/ZM/restPassword',
          query: {
            SOURCE: 3
          }
        });
      }
    },
    //选择图片后准备裁剪
    changeAvatar(e){
      this.file = e;
      this.setAvatar = true
    },
    //更新头像
    updateAvatar(src) {
      let params = {
        avatar: src
      };
      this.updateInfo(params, (res) => {
        if (res.code === 0){
          this.Toast('头像修改成功', {
            type: 'success',
            duration: 2000
          });
          this.getInfo();
        } else {
          this.Toast('头像修改失败，请稍后重试', {
            type: 'fail',
            duration: 2000
          });
        }
      });
    },
    //上传头像到后台
    uploadAvatar(src){
      this.setAvatar = false;
      let formData = new FormData();
      formData.append('file', src);
      this.$store.dispatch('uploadFile', formData).then((res) => {
        console.log(res);
        if (res.code === 0){
          this.updateAvatar(res.data.path)
        } else {
          this.$toast(res.msg || '上传图片失败!');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  $HEADERHEIGHT: 44px;
  .fixed{
    position: fixed;
  }

  .personal{
    padding-top: $HEADERHEIGHT;
    max-height: calc(100% - #{$HEADERHEIGHT});

    .main{
      background: #f5f5f5;
      .base-info,.login-info {
        background: #ffffff;
        ul{
          padding-left: 16px;
          li{
            height: 56px;
            line-height: 56px;
            padding-right: 16px;
            position: relative;

            &:not([data-type=phone]):after{
              width: 16px;
              height: 16px;
              position: absolute;
              right: 16px;
              top: 21px;
              content: '';
              background: url('../../../assets/img/more_chapter.png') no-repeat;
              background-size: 100%;
            }

            .content{
              float: right;
              padding-right: 24px;
              color: #bbbbbb;
              transform: scale(0.84);
              transform-origin: right;
            }

            .avatar{
              width: 40px;
              height: 40px;
              border: none;
              border-radius: 50%;
              position: absolute;
              right: 36px;
              top: 8px;
            }

            .pr-0{
              padding-right: 0;
            }

            .avatar-input{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              outline: none;
              opacity: 0;
            }
          }
        }
      }

      img{
        width: 350px;
        height: 350px;
      }
      .mt-8{
        margin-top: 8px;
      }
    }
  }
</style>
