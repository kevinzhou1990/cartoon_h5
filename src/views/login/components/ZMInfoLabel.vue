<template>
  <div class=user-main v-show="showFlag">
    {{ loginType === 0 ? validateText: passwordText }}
    <span style="color: #12E079;" @click.stop="handleClickInfo(1)">《用户协议》</span>
    和
    <span style="color: #12E079;" @click.stop="handleClickInfo(2)">《隐私保护协议》</span>政策
  </div>
</template>

<script>
export default {
  name: 'ZMInfoLabel',
  props: {
    loginType: {
      type: Number | String,
      default: 0
    }
  },
  data() {
    return {
      validateText: '未注册用户登录时，将为你自动创建帐号登录，登录或注册后即代表你已同意',
      passwordText: '登录即代表你已同意',
      showFlag: true
    }
  },
  mounted() {
    // 监听键盘谈起的屏幕高度变化
    const originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.addEventListener('resize', () => {
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (resizeHeight < originHeight) {
        // 键盘弹起后逻辑
        this.showFlag = false
      } else {
        // 键盘收回的逻辑
        this.showFlag = true
      }
    }, false)
  },
  methods: {
	  handleClickInfo(val) {
      this.$router.push({
        path: '/ZM/userAgreement',
        query: {
          agreeType: val,
          loginType: this.loginType
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.user-main {
  position: fixed;
  margin: auto 16px;
  width: auto;
  overflow: hidden;
  /*padding-top: 68px;*/
  bottom: 16px;
  font-size: 12px;
  color: #BBBBBB;
  letter-spacing: 0;
  align-items: center;
  text-align: center;
  /*transform: scale(0.83);*/
  /*-webkit-transform-origin-x: 0;*/
  /*-webkit-transform-origin-y: 0;*/
}
@media screen and (max-height: 400px) {
  .user-main {
    display: none;
  }
}
</style>
