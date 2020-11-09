<template>
  <div class=user-main>
    {{loginType? validateText: passwordText}}
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
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      validateText: '未注册用户登录时，将为你自动创建帐号登录，登录或注册后即代表你已同意',
      passwordText: '登录即代表你已同意'
    }
  },
  methods: {
	  handleClickInfo(val) {
      this.$router.push({
        path: '/ZM/userAgreement',
        query: {
          agreeType: val
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.user-main {
  position: relative;
  width: auto;
  overflow: hidden;
  padding-top: 68px;
  font-size: 10px;
  color: #BBBBBB;
  letter-spacing: 0;
  align-items: center;
  text-align: center;
  transform: scale(0.83);
  /*-webkit-transform-origin-x: 0;*/
  -webkit-transform-origin-y: 0;
}
</style>
