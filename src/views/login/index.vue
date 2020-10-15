<template>
  <div class="login-main box">
    <z-m-header :title-text="loginTitle" hasBorder>
      <a slot="left" class="navigation_arrow_left" @click.stop="handleClickClose"></a>
    </z-m-header>
    <div class="login-content">
      <div class="login-content-banner"></div>
      <div class="m-16 login-content-b zm-b-radius">
        <span class="login-content-b-left b-a" @click="handleClickAreaCode">+86
          <img class="down-img" :src="downImg" alt="">
        </span>
        <input v-model="telPhoneNum" type="tel" class="login-content-b-phone" maxlength="11"  placeholder="请输入手机号"/>
      </div>
      <div class="login-content-b zm-b-radius m-8">
        <span class="login-content-b-left">验证码</span>
        <input v-model="validateNum" type="tel" class="login-content-b-phone" maxlength="11"  placeholder="请输入验证码"/>
        <span class="login-content-b-va">获取验证码</span>
      </div>
    </div>
    <div class="login-btn m-8">登录/注册</div>
    <div class="login-pa">密码登陆</div>
    <z-m-info-label></z-m-info-label>
    <z-m-area-phone v-model="areaFlag"></z-m-area-phone>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import ZMInfoLabel from '@/views/login/components/ZMInfoLabel'
import ZMAreaPhone from '@/views/login/components/ZMAreaPhone'
const downImg = require('./images/more.png')
export default {
  name: 'index.vue',
  data(){
    return {
      loginTitle: '手机号登陆',
      downImg,
      telPhoneNum: '', // 手机号码
	    validateNum: '', // 验证码
	    areaFlag: false
    }
  },
  methods: {
	  /**
	   * @info: 取消登陆
	   * @author: PengGeng
	   * @date: 10/15/20-4:19 下午
	   */
	  handleClickClose() {
      console.log('handle click close....')
    },
	  /**
	   * @info: 选择区号
	   * @author: PengGeng
	   * @date: 10/15/20-4:19 下午
	   */
	  handleClickAreaCode() {
      this.areaFlag = true
      console.log('select phone area code')
    }
  },
  components: {
    ZMHeader,
	  ZMInfoLabel,
	  ZMAreaPhone
  }
}
</script>

<style scoped lang="scss">
  $label-fontSize: 12px;
  $label-color: #222222;
  .b-a {
    &:after {
      position: absolute;
      top: 50%;
      transform: scale(0.5) translateY(-100%);
      right: 0;
      content: '';
      height: 16px;
      border: 1px solid rgba(0,0,0,0.08);
    }
  }
  .m-16 {
    margin-top: 16px !important;
  }
  .m-8 {
    margin-top: 8px;
  }
  .down-img {
    display: inline-block;
    vertical-align: text-top;
    width: 16px;
    height: 16px;
  }
  .login-main {
    position: relative;
    overflow: hidden;
    margin: auto;
    .navigation_arrow_left {
      display: inline-block;
      /*box-sizing: border-box;*/
      margin: 10px 0 10px 16px;
      width: 24px;
      height: 24px;
      background: url('./images/close.png') no-repeat center;
      background-size: 100%;
    }
    .login-content {
      margin: 4px 16px;
      &-banner {
        margin: 4px auto;
        width: auto;
        height: 108px;
        background: url("./images/loginBanner.png") no-repeat center;
        background-size: 100%;
      }
      &-b {
        width: auto;
        position: relative;
        font-size: $label-fontSize;
        color: $label-color;
        height: 47px;
        line-height: 47px;
        &-left {
          position: relative;
          display: inline-block;
          width: 88px;
          text-align: center;
        }
        &-phone {
          margin-left: 8px;
          position: relative;
          outline: none;
          border: none;
          /*height: 42px;*/
        }
        &-va {
          position: absolute;
          right: 16px;
          width: auto;
          font-size: 10px;
          color: #E6E6E6;
          transform: scale(0.83);
          /*-webkit-transform-origin-x: 0;*/
        }
      }
    }
    .login-btn {
      font-family: PingFangSC-Semibold;
      margin: 8px 16px;
      background: #A2F5CB;
      border-radius: 4px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      color: #FFFFFF;
      font-size: 14px;
    }
    .login-pa {
      text-align: center;
      font-size: $label-fontSize;
      color: $label-color;
    }
  }

</style>
