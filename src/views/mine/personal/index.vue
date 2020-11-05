<template>
  <div style="height: 100%">
    <avatar v-if="setAvatar" return-type="url" :input-file="file" @cancel="setAvatar = false" @enter="uploadAvatar"></avatar>

    <div class="personal" v-else>
      <z-m-header title-text="个人设置" has-border />

      <div class="main">
        <div class="base-info">
          <ul>
            <li class="zm-b-b">
              <section>
                <span>头像</span>
                <img :src="imgSrc" class="avatar">
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
                <span class="content">我是谁</span>
              </section>
            </li>
            <li class="zm-b-b">
              <section  @click="genderVisible = true">
                <span>性别</span>
                <span class="content">男</span>
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
                <span class="content pr-0">188****5566</span>
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
export default {
  components: { ZMHeader, Avatar },
  data(){
    return {
      genderVisible: false,
      genderArr: [
        {
          name: '男',
          method: this.selectGender
        },
        {
          name: '女',
          method: this.selectGender
        },
        {
          name: '保密',
          method: this.selectGender
        }
      ],
      setAvatar: false,
      file: null,
      imgSrc: require('@/assets/img/default_head.png')
    }
  },
  methods: {
    selectGender(value){
      console.log(value)
    },
    jumpUpdateNickname(){
      this.$router.push({
        path: '/personal/update-nickname'
      })
    },
    jumpRestPwd(){
      let userinfo = this.$store.state.login.userInfo;
      if (JSON.stringify(userinfo) !== '{}' && typeof userinfo === 'object'){
        this.$router.push({
          path: '/ZM/restPassword',
          query: {
            SOURCE: 3
          }
        });
      } else {
        this.$toast('用户信息验证失败!');
      }
    },
    changeAvatar(e){
      this.file = e;
      this.setAvatar = true
    },
    // 上传裁剪好的头像
    uploadAvatar(src) {
      this.imgSrc = src;
      this.setAvatar = false;
      console.log(src, '==========================')
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
