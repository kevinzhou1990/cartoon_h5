<template>
  <transition name="fade">
    <div class="f-main box zm-b-b" v-show="forgetFlag">
      <z-m-header :title-text="titleContent" hasBorder left-btn-flag @goBack="back"></z-m-header>
      <template v-if="!nexSuccessFlag">
        <div class="login-content">
          <div class="m-16 login-content-b zm-b-radius">
          <span class="login-content-b-left b-a" @click="handleClickAreaCode">{{telCode}}
            <img class="down-img" :src="downImg" alt="">
          </span>
            <input
                v-model="telPhoneNum"
                type="text"
                class="login-content-b-phone"
                maxlength="11"
                placeholder="请输入手机号"
                :change="changeTelPhoneNum(telPhoneNum)"
            />
          </div>
          <div class="login-content-b zm-b-radius m-8">
            <span class="login-content-b-left">验证码</span>
            <input
                v-model="validateNum"
                type="text"
                class="login-content-b-phone"
                maxlength="6"
                :change="changeValidateNum(validateNum)"
                placeholder="请输入验证码"
            />
            <span
                class="login-content-b-va"
                :class="{'theme-color' : showValidateFlag, 'time-color': isShowCountDown}"
                @click.stop="handleClickGetValidate(2)">
            {{ isShowCountDown ? times: '获取验证码' }}
          </span>
          </div>
        </div>
        <div
            class="login-btn m-8"
            :class="{'theme-bg': isClickLoginBtnFlag}"
            @click.stop="handleClickNextStep"
        >
          下一步
        </div>
      </template>
      <template v-else>
        <div class="login-content">
          <span class="login-content-label">密码为6-20位，需要包含数字、字母组合</span>
          <div class="login-content-p zm-b-radius m-8">
            <input
                v-model="newPasswordVal"
                :type="passwordShowFlag ? 'text': 'password'"
                class="login-content-p-pas"
                minlength="6"
                maxlength="20"
                placeholder="请输入新密码"
                @focus="changePasswordVal"
            />
            <span
                class="login-content-p-right"
                :class="passwordShowFlag ? 'eye_open': 'eye_close'"
                @click.stop="handleClickHidePassword"
            ></span>
          </div>
          <div
              class="login-btn m-8"
              :class="{'theme-bg': isSetBtnFlag}"
              @click.stop="handleClickSurePassword"
          >
            设置完成
          </div>
        </div>
      </template>
      <z-m-area-phone v-model="areaFlag" @telCode="getTelCode"></z-m-area-phone>
      <z-m-login-vali-alert
          v-model="valiAlert"
          :img-code="imgCode"
          :scource="2"
          @getSMS="getSMSCode"
      ></z-m-login-vali-alert>
  </div>
  </transition>
</template>

<script>
import ZMAreaPhone from '@/views/login/components/ZMAreaPhone'
import ZMHeader from '@/common/components/ZMHeader'
import ZMLoginValiAlert from '@/views/login/components/ZMLoginValiAlert'
import myMixins from '@/views/login/mixins/index'
import { checkValidateCode, fountPassword } from '../api/index'
import { encryptDes } from '../common/index'
export default {
  name: 'forgetPassword',
  mixins: [myMixins],
  data() {
    return {
	    forgetFlag: false,
		  titleContent: '忘记密码',
      nexSuccessFlag: false, // 下一步的btn高亮
      nextCheckCode: '', // 调用设置密码完成需要使用
	    isSetBtnFlag: false, // 设置
	    newPasswordVal: '' // 新密码
    }
  },
  components: {
    ZMHeader,
    ZMAreaPhone,
	  ZMLoginValiAlert
  },
  mounted() {
    this.forgetFlag = true
  },
  methods: {
	  back() {
		  this.forgetFlag = false
      setTimeout(() => {
	      this.$router.back()
      }, 200)
    },
	  /**
	   * @info: 点击下一步
	   * @author: PengGeng
	   * @date: 10/17/20-11:09 上午
	   */
	  async handleClickNextStep() {
      const reqData = {
			  country_code: this.telCode,
			  mobile: this.telPhoneNum,
        code: this.validateNum,
	      source: 2
      }
      const resData = await checkValidateCode(reqData)
      if (resData && resData.code === 0){
        this.nextCheckCode = resData.data.rand_code || ''
	      this.nexSuccessFlag = true
        // 清楚定时器
        clearInterval(this.timer)
      } else {
        this.$toast(resData.msg || '系统繁忙,请稍后重试')
      }
      console.log('click validate update password next')
    },
	  /**
	   * @info: input focus
	   * @author: PengGeng
	   * @date: 10/17/20-11:56 上午
	   */
	  changePasswordVal() {
      console.log('input focus password')
	  },
	  /**
	   * @info: 隐藏或显示密码
	   * @author: PengGeng
	   * @date: 10/17/20-4:00 下午
	   */
	  handleClickHidePassword() {
		  this.passwordShowFlag = !this.passwordShowFlag
	  },
    getSMSCode(randCode) {
      this.handleClickGetValidate(2, randCode)
    },
	  /**
	   * @info: 确认设置完成
	   * @author: PengGeng
	   * @date: 10/17/20-4:00 下午
	   */
	  async handleClickSurePassword() {
      const reqData = {
        country_code: this.telCode,
        mobile: this.telPhoneNum,
			  password: encryptDes(this.newPasswordVal),
        code: this.nextCheckCode
      }
      const resData = await fountPassword(reqData)
      if (resData && resData.code === 0){
        this.$toast('密码设置成功')
        this.back()
      } else {
        this.$toast(resData.msg || '系统繁忙,请稍后重试')
      }
    }
  },
  watch: {
	  newPasswordVal(val) {
      if (val.length >= 6) {
        this.isSetBtnFlag = true
      } else {
        this.isSetBtnFlag = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .fade-enter-active {
    animation: fadeInRight 0.5s;
  }
  .fade-leave-active {
    animation: fadeOutLeft 0.5s;
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
  @keyframes fadeOutLeft {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }
  $label-fontSize: 12px;
  $label-color: #222222;
  ::-webkit-input-placeholder {
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #BBBBBB;
  }
  .theme-color {
    color: #12E079 !important;
  }
  .time-color {
    color: #999999 !important;
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
.f-main {
  position: relative;
  overflow: hidden;
  margin: auto;
  .login-content {
    margin: 4px 16px;
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
    &-label {
      display: block;
      padding: 12px 0;
      color: #BBBBBB;
      font-size: 10px;
      text-align: center;
      transform: scale(0.83);
      /*-webkit-transform-origin-x: 0;*/
    }
    &-p {
      position: relative;
      font-size: $label-fontSize;
      color: $label-color;
      height: 47px;
      line-height: 47px;
      width: 343px;
      &-pas {
        position: relative;
        margin: auto 16px;
        outline: none;
        border: none;
        /*height: 42px;*/
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
        background: url("../images/open_eye.png") no-repeat center;
        background-size: 100%;
      }
      .eye_close {
        width: 16px;
        height: 16px;
        background: url("../images/close_eye.png") no-repeat center;
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
}
</style>
