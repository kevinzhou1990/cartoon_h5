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
      <div class="login-content-b zm-b-radius m-8" v-if="loginType===0">
        <span class="login-content-b-left">验证码</span>
        <input v-model="validateNum" type="tel" class="login-content-b-phone" maxlength="6"  placeholder="请输入验证码"/>
        <span
            class="login-content-b-va"
            :class="{'theme-color' : showValidateFlag}"
            @click.stop="handleClickGetValidate">
          获取验证码
        </span>
      </div>
      <div class="login-content-b zm-b-radius m-8" v-else>
        <span class="login-content-b-left">密码</span>
        <input
            v-model="passwordVal"
            :type="passwordShowFlag ? 'tel': 'password'"
            class="login-content-b-phone"
            maxlength="20"
            placeholder="请输入密码"
            @focus="changePasswordVal"
        />
        <span
            class="login-content-b-right"
            :class="passwordShowFlag ? 'eye_open': 'eye_close'"
            @click.stop="handleClickHidePassword"
        ></span>
      </div>
    </div>
    <div
        class="login-btn m-8"
        :class="{'theme-bg': isClickLoginBtnFlag}"
        @click.stop="handleClickLogin"
    >
      {{loginBtnValue}}
    </div>
    <div
        class="login-pa"
        v-if="loginType===0"
        @click.stop="handleClickLoginType(1)">密码登陆</div>
    <div
        v-else
        class="login-label"
        >
      <span @click.stop="handleClickLoginType(0)">手机号登录</span>
      <span>忘记密码？</span>
    </div>
    <z-m-info-label :login-type="loginType"></z-m-info-label>
    <z-m-area-phone v-model="areaFlag"></z-m-area-phone>
    <z-m-login-vali-alert v-model="valiAlert"></z-m-login-vali-alert>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import ZMInfoLabel from '@/views/login/components/ZMInfoLabel'
import ZMAreaPhone from '@/views/login/components/ZMAreaPhone'
import ZMLoginValiAlert from '@/views/login/components/ZMLoginValiAlert'
const downImg = require('./images/more.png')
export default {
  name: 'index.vue',
  data(){
    return {
      loginTitle: '手机号登陆',
      loginBtnText: '登录/注册',
      loginType: 0, // 0 手机号登陆； 1 密码登陆
      downImg,
      telPhoneNum: '', // 手机号码
	    validateNum: '', // 验证码
	    areaFlag: false, // 显示区号组件
      showValidateFlag: false, // 现实验证按钮可以点击
	    passwordVal: '', // 密码
	    hidePasswordVal: '', // 掩码
	    passwordShowFlag: false, // 是否显示明文
	    valiAlert: false // 现实图形验证码
    }
  },
  computed: {
    // 登陆的文字
    loginBtnValue() {
      return this.loginType === 0 ? '登录/注册' : '登录'
    },
    // 是高亮现实login btn
	  isClickLoginBtnFlag() {
	    if (this.showValidateFlag && (this.validateNum.length || this.passwordVal.length)) {
        return true
      } else {
        return false
      }
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
    },
	  /**
	   * @info: 获取验证码
	   * @author: PengGeng
	   * @date: 10/16/20-10:29 上午
	   */
	  handleClickGetValidate() {
      if (!this.showValidateFlag) return
      this.valiAlert = true
      console.log('click validate btn')
    },
	  /**
	   * @info: 切换登陆类型
	   * @author: PengGeng
	   * @date: 10/16/20-12:10 下午
	   */
	  handleClickLoginType(val) {
      this.loginType = val
		  this.validateNum = '' // 验证码
      this.passwordVal = '' // 密码
    },
	  /**
	   * @info: 隐藏或者明文展示
	   * @author: PengGeng
	   * @date: 10/16/20-2:28 下午
     *
	   */
	  handleClickHidePassword() {
		  this.passwordShowFlag = !this.passwordShowFlag
    },
	  /**
	   * @info: 得到密码文本框的焦点
	   * @author: PengGeng
	   * @date: 10/16/20-2:44 下午
	   */
	  changePasswordVal() {

    },
	  /**
	   * @info: 登陆
	   * @author: PengGeng
	   * @date: 10/16/20-10:33 上午
	   */
	  handleClickLogin() {

    }
  },
  components: {
    ZMHeader,
	  ZMInfoLabel,
	  ZMAreaPhone,
	  ZMLoginValiAlert
  },
  watch: {
    // 监听手机号
    telPhoneNum(val, oldValue){
      if (val) {
        this.showValidateFlag = true
      } else {
	      this.showValidateFlag = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  $label-fontSize: 12px;
  $label-color: #222222;
  .theme-color {
    color: #12E079 !important;
  }
  .theme-bg {
    background: #12E079 !important;
  }
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
        &-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 16px;
          width: auto;
        }
        .eye_open {
          width: 16px;
          height: 16px;
          background: url("./images/open_eye.png") no-repeat center;
          background-size: 100%;
        }
        .eye_close {
          width: 16px;
          height: 16px;
          background: url("./images/close_eye.png") no-repeat center;
          background-size: 100%;
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
      padding-top: 16px;
      text-align: center;
      font-size: $label-fontSize;
      color: $label-color;
    }
    .login-label {
      padding: 16px 64px 0 64px;
      display: flex;
      justify-content: space-between;
    }
  }

</style>
