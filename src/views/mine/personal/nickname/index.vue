<template>
  <transition name="router" appear>
    <div class="nickname">
      <z-m-header title-text="昵称" show-right has-border>
        <div slot="right" class="title-right">
          <button
            class="done"
            v-if="!isLoading"
            @click="updateNickname"
            :disabled="!nickname || nickname === $store.state.login.userInfo.nickname"
          >完成</button>
          <div class="loading" v-if="isLoading && nickname"></div>
        </div>
      </z-m-header>

      <div class="container">
        <div class="input-container">
          <input
            placeholder="给自己起个响亮的名字吧，不超过10个字哦～"
            class="nickname-input"
            v-model= nickname
            maxlength="10"
            @focus="showClear=true"
          />
          <span class="clear" @click.stop="nickname=''" v-if="showClear && nickname"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ZMHeader from '@/common/components/ZMHeader';
  export default {
    components: { ZMHeader },
    data(){
      return {
        nickname: this.$store.state.login.userInfo.nickname,
        isLoading: false,
        showClear: false
      }
    },
    methods: {
      updateNickname(){
        if (this.nickname === this.$store.state.login.userInfo.nickname){
          return
        }

        let params = {
          nickname: this.nickname
        };
        this.isLoading = true;
        this.$store.dispatch('updateUserInfo', params).then((res) => {
          if (res.code === 0){
            setTimeout(() => {
              this.Toast('昵称修改成功!', {
                type: 'success',
                duration: 3000
              });
            }, 250);

            this.$router.replace({
              path: '/personal'
            });
          } else {
            this.Toast(res.msg || '系统出错,请稍后重试', {
              type: 'fail',
              duration: 3000
            });
          }
          this.isLoading = false
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  $HEADERHEIGHT: 44px;
  $PADDING: 16px;
  *::-webkit-input-placeholder {
    color: #bbbbbb;
  }
  *:-moz-placeholder {
    /* FF 4-18 */
    color: #bbbbbb;
  }
  *::-moz-placeholder {
    /* FF 19+ */
    color: #bbbbbb;
  }
  *:-ms-input-placeholder {
    /* IE 10+ */
    color: #bbbbbb;
  }

  @-webkit-keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    50%{ -webkit-transform: rotate(180deg);}
    100%{ -webkit-transform: rotate(360deg);}
  }
  @keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    50%{ -webkit-transform: rotate(180deg);}
    100%{ -webkit-transform: rotate(360deg);}
  }

  .nickname {
    padding-top: $HEADERHEIGHT;
    .title-right {
      .done{
        font-family: 'pingfang-blod';
        border: none;
        outline: none;
        background: transparent;
        padding: 0;
        color: #222222;
        font-size: 12px;
        -webkit-tap-highlight-color: transparent;
        &:disabled {
          color: #e6e6e6;
        }
      }

      .loading{
        -webkit-animation:myRotate 1s linear infinite;
        animation:myRotate 1s linear infinite;
        position: absolute;
        top: 16px;
        right: 16px;
        width: 16px;
        height: 16px;
        background: url('../../../../assets/img/load_ba.png') no-repeat;
        background-size: 100%;
      }
    }

    .container {
      margin-top: $PADDING;
      padding: 0 $PADDING;

      .input-container{
        position: relative;
        width: 100%;
        border: 1px solid rgba(0,0,0,.08);
        border-radius: 4px;

        .nickname-input {
          font-family: 'pingfang-blod';
          width: calc(100% - #{$PADDING * 3 + 5px});
          height: 100%;
          padding: $PADDING $PADDING * 2 + 5px $PADDING $PADDING;
          border: none;
          outline: none;
          font-size: 12px;
          color: #222222;
          border-radius: 4px;
          caret-color: #12e079;
        }

        .clear {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 16px;
          width: 16px;
          height: 16px;
          background: url('../../../../assets/img/delete_bb.png') no-repeat;
          background-size: 100%;
        }
      }
    }
  }
</style>
