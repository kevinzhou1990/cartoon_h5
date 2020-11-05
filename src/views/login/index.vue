<template>
  <transition name="fade">
    <div class="login-main box" v-show="show">
        <z-m-header :title-text="loginValueTitle" hasBorder>
          <a slot="left" class="navigation_arrow_left" @click.stop="handleClickClose"></a>
        </z-m-header>
        <div class="login-content">
          <img class="login-content-banner" :src="loginImg" alt="">
          <div class="m-16 login-content-b zm-b-radius">
        <span class="login-content-b-left b-a" @click="handleClickAreaCode">{{ telCode }}
          <img class="down-img" :src="downImg" alt="">
        </span>
            <input
                v-model="telPhoneNum"
                type="text"
                :change="changeTelPhoneNum(telPhoneNum)"
                @focus="changLoginImg('tel')"
                class="login-content-b-phone"
                maxlength="11"
                placeholder="请输入手机号"/>
          </div>
          <transition name="login-type" mode="out-in">
              <div class="login-content-b zm-b-radius m-8" v-if="loginType===0" key="validate">
                <span class="login-content-b-left">验证码</span>
                <input
                    v-model="validateNum"
                    type="text"
                    :change="changeValidateNum(validateNum)"
                    class="login-content-b-phone"
                    @focus="changLoginImg('sms')"
                    maxlength="6"
                    placeholder="请输入验证码"
                />
                <span
                    class="login-content-b-va"
                    :class="{'theme-color' : showValidateFlag, 'time-color': isShowCountDown }"
                    @click.stop="handleClickGetValidate(1)">
                {{ validateSMSText }}
        </span>
              </div>
              <div class="login-content-b zm-b-radius m-8" v-else key="password">
                <span class="login-content-b-left">密码</span>
                <input
                    v-model="passwordVal"
                    :type="passwordShowFlag ? 'tel': 'password'"
                    class="login-content-b-phone"
                    maxlength="20"
                    placeholder="请输入密码"
                    @focus="changLoginImg('pass')"
                />
                <span
                    class="login-content-b-right"
                    :class="passwordShowFlag ? 'eye_open': 'eye_close'"
                    @click.stop="handleClickHidePassword"
                ></span>
              </div>
          </transition>
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
          <span @click="goToForgetPassword">忘记密码？</span>
        </div>
    <z-m-info-label :login-type="loginType"></z-m-info-label>
    <z-m-area-phone v-model="areaFlag" @telCode="getTelCode"></z-m-area-phone>
    <z-m-login-vali-alert
        v-model="valiAlert"
        :img-code="imgCode"
        :scource="1"
        @getSMS="getSMSCode"
    ></z-m-login-vali-alert>
  </div>
  </transition>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import ZMInfoLabel from '@/views/login/components/ZMInfoLabel'
import ZMAreaPhone from '@/views/login/components/ZMAreaPhone'
import ZMLoginValiAlert from '@/views/login/components/ZMLoginValiAlert'
import myMixins from '@/views/login/mixins/index'
import { loginByPass, loginByValidateCode } from './api/index'
import { encryptDes } from './common/index'
const defaultLoginImg = require('./images/loginBanner.png')
const passLoginImg = require('./images/banner_close.png')
const openEyeLoginImg = require('./images/more.png') // todo 修改为偷看的图片
const telLoginImg = require('./images/refresh.png') // todo 修改为思考的图片
export default {
  name: 'Login-index',
  mixins: [myMixins],
  data(){
    return {
	    show: false,
      loginType: 0, // 0 手机号登陆； 1 密码登陆
	    loginImg: defaultLoginImg
    }
  },
  computed: {
    // 登陆的文字
    loginBtnValue() {
      return this.loginType === 0 ? '登录/注册' : '登录'
    },
    // 登陆title
    loginValueTitle() {
	    return this.loginType === 0 ? '手机号登陆' : '密码登录'
    }
  },
  mounted() {
    this.$nextTick(() => {
		  this.show = true
    })
    // this.test()
  },
  methods: {
	  getSMSCode(val, randCode) {
		  this.handleClickGetValidate(1, val, randCode)
    },
	  /**
	   * @info: 取消登陆
	   * @author: PengGeng
	   * @date: 10/15/20-4:19 下午
	   */
	  handleClickClose() {
      this.show = false
      const BackRouter = this.$store.state.login.backRouter || '/home'
      this.$router.push(BackRouter)
      console.log('handle click close....', BackRouter)
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
		  this.changLoginImg(this.passwordShowFlag ? 'eyeopen' : 'eyeclose')
    },
	  /**
	   * @info: 得到密码文本框的焦点
	   * @author: PengGeng
	   * @date: 10/16/20-2:44 下午
     * @param val type [String] tel 手机号input 琢磨手势的图片;  pass/eyeclose 密码文本框 不看手势的图片;   sms 短信验证码/明文 使用偷看手势图片;
	   */
	  changLoginImg(val) {
      const valData = {
        'tel': telLoginImg,
        'pass': passLoginImg,
        'eyeclose': passLoginImg,
        'eyeopen': openEyeLoginImg,
        'sms': openEyeLoginImg
      }
      this.loginImg = valData[val] || defaultLoginImg
    },
	  /**
	   * @info: 登陆
	   * @author: PengGeng
	   * @date: 10/16/20-10:33 上午
	   */
	  async handleClickLogin() {
		  if (this.loginType === 0) {
			  if (!this.telPhoneNum || !this.validateNum) {
				  this.$toast('手机号或验证码不能为空')
				  return
			  }
      } else {
			  if (!this.telPhoneNum || !this.passwordVal) {
				  this.$toast('手机号或密码不能为空')
				  return
			  }
      }
      const reqValiData = {
	      country_code: this.telCode,
	      mobile: this.telPhoneNum,
	      code: this.validateNum
      }
      const reqPassData = {
	      country_code: this.telCode,
	      mobile: this.telPhoneNum,
	      password: encryptDes(this.passwordVal)
      }
      const fetchAPIName = this.loginType === 0 ? loginByValidateCode(reqValiData) : loginByPass(reqPassData)
      const resData = await fetchAPIName
      if (resData && resData.code === 0){
        this.countTimeSMS = 0
        this.$toast(resData.msg)
        // 成功后移除定时器
        clearInterval(this.timer)
        this.$store.commit('SET_USERS_INFO', resData.data.user || {})
        // 登陆成功，回倒原来的页面
        this.$router.replace(this.$store.state.login.backRouter)
      } else {
        this.$toast(resData.msg || '系统繁忙请稍后重试')
      }
    },
	  /**
	   * @info: 忘记密码
	   * @author: PengGeng
	   * @date: 10/17/20-10:33 上午
	   */
    goToForgetPassword() {
      this.$router.push({
        path: '/ZM/forgetPassword',
        query: {
          SOURCE: 2
        }
      })
    }
  },
  components: {
    ZMHeader,
	  ZMInfoLabel,
	  ZMAreaPhone,
	  ZMLoginValiAlert
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
    //  非协议的router才存入上一次的路由
    if (from.path !== '/ZM/userAgreement') { vm.$store.commit('SET_LAST_ROUTER', from.path) }
    })
  }
}
</script>

<style scoped lang="scss">
  .fade-enter-active {
    animation: fadeInUp 0.5s;
  }
  .fade-leave-active {
    animation: fadeInDown 0.5s;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 100%, 0);
    }
  }
  .login-type-enter-active{
    animation: fadeInRight 0.5s;
  }
  .login-type-leave-active{
    animation: fadeOutLeft 0.5s;
  }
  .login-type-fade-enter {
    animation: fadeInRight 0.5s;
  }
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  $label-fontSize: 12px;
  $label-color: #222222;
  .time-color {
    color: #999999 !important;
  }
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
        /*background: url("./images/loginBanner.png") no-repeat center;*/
        /*background-size: 100%;*/
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
