<template>
  <transition name="rest" appear mode="out-in">
    <div class="rest-main box">
      <z-m-header :title-text="titleContent" class="zm-b-b"></z-m-header>
        <template v-if="!nexSuccessFlag">
          <div class="rest-main-content">
            <span class="rest-main-content-text">当前登陆手机号</span>
            <span class="rest-main-content-tel">{{ telCode }} {{ maskPhoneNum }}</span>
          </div>
          <div class="rest-main-sms zm-b-radius m-8">
            <span class="rest-main-sms-left">验证码</span>
            <input
                v-model="validateNum"
                type="text"
                class="rest-main-sms-phone"
                maxlength="6"
                :change="changeValidateNum(validateNum)"
                placeholder="请输入验证码"
            />
            <span
                class="rest-main-sms-va"
                :class="{'theme-color' : showValidateFlag, 'time-color': isShowCountDown}"
                @click.stop="handleClickGetValidate(3)">
                 {{ isShowCountDown ? times: countTimeSMS >=1 ? '重新获取' : '获取验证码' }}
              </span>
            <div
                class="login-btn m-8"
                :class="{'theme-bg': isClickLoginBtnFlag}"
                @click.stop="handleClickNextStep(3)"
            >
              下一步
            </div>
          </div>
      </template>
      <template v-else>
        <transition name="rest">
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
        </transition>
      </template>
      <z-m-login-vali-alert
          v-model="valiAlert"
          :img-code="imgCode"
          :scource="3"
          @getSMS="getSMSCode"
      ></z-m-login-vali-alert>
    </div>
  </transition>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import myMixins from '../mixins/index'
import ZMLoginValiAlert from '@/views/login/components/ZMLoginValiAlert'
import {encryptDes} from '@/views/login/common'
import {updatePassword} from '@/views/login/api'
export default {
  name: 'restPassword',
  mixins: [myMixins],
  data() {
    return {
      isSetBtnFlag: false,
      times: 60,
      isShowCountDown: false,
      titleContent: '密码重置',
	    nextCheckCode: '', // 调用设置密码完成需要使用
	    newPasswordVal: '', // 新密码
      maskPhoneNum: ''
    }
  },
  mounted() {
    const userInfo = this.$store.state.login.userInfo
    this.maskPhoneNum = userInfo.mobile_text
    this.telPhoneNum = userInfo.mobile
	  this.telCode = userInfo.mobile_code
  },
	methods: {
    changeValidateNum(val){
      this.validateNum = val.toString().replace(/[^\d]/g, '') || ''
    },
		getSMSCode(randCode) {
			this.handleClickGetValidate(3, randCode)
		},
		/**
		 * @info: 隐藏或显示密码
		 * @author: PengGeng
		 * @date: 10/17/20-4:00 下午
		 */
		handleClickHidePassword() {
			this.passwordShowFlag = !this.passwordShowFlag
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
		 * @info: 确认设置完成
		 * @author: PengGeng
		 * @date: 10/17/20-4:00 下午
		 */
		async handleClickSurePassword() {
			if (!this.regExp.test(this.newPasswordVal)) {
				return this.$toast('密码格式不正确，请重新设置！')
			}
			const reqData = {
				// country_code: this.telCode,
				// mobile: this.telPhoneNum,
				password: encryptDes(this.newPasswordVal),
				code: this.nextCheckCode
			}
			const resData = await updatePassword(reqData)
			if (resData && resData.code === 0){
				this.$toast('密码重置成功')
        this.$router.push('/ZMLogin')
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
	},
  components: {
    ZMHeader,
	  ZMLoginValiAlert
  }
}
</script>

<style scoped lang="scss">
  $label-fontSize: 12px;
  $label-color: #222222;
  .rest-enter-active{
    animation: fadeInLeft 0.5s;
  }
  .rest-leave-active{
    animation: fadeOutLeft 0.5s;
  }
  .rest-leave {
    animation: fadeInRight 0.5s;
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
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
      transform: translate3d(-100%, 0,0);
    }
  }
  ::-webkit-input-placeholder {
    font-family: pingfang-blod;
    font-size: 12px;
    color: #bbbbbb;
  }
  .m-8 {
    margin-top: 8px;
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
  .rest-main{
    position: relative;
    width: auto;
    &-content {
      display: flex;
      flex-direction: column;
      text-align: center;
      &-text {
        padding: 16px 0 4px 0;
        font-family: PingFangSC-Semibold;
        color: #BBBBBB;
      }
      &-tel {
        padding: 4px 0 20px 0;
        color: #222222;
        font-size: 18px;
        font-family: PingFangSC-Semibold;
      }
    }
    &-sms {
      font-family: pingfang-blod;
      margin: auto 16px;
      width: auto;
      position: relative;
      font-size: 12px;
      color: #222222;
      height: 48px;
      line-height: 47px;
      &-left {
        position: relative;
        display: inline-block;
        width: 88px;
        text-align: center;
      }
      &-phone {
        /*margin-left: 8px;*/
        position: relative;
        outline: none;
        border: none;
        /*height: 42px;*/
      }
      &-va {
        position: absolute;
        right: 16px;
        width: auto;
        font-size: 12px;
        color: #E6E6E6;
        /*transform: scale(0.83);*/
        /*-webkit-transform-origin-x: 0;*/
      }
    }
    .login-btn {
      font-family: PingFangSC-Semibold;
      margin: 16px auto;
      background: #A2F5CB;
      border-radius: 4px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      color: #FFFFFF;
      font-size: 14px;
    }
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
          font-size: 12px;
          color: #E6E6E6;
          /*transform: scale(0.83);*/
          /*-webkit-transform-origin-x: 0;*/
        }
      }
      &-label {
        display: block;
        padding: 12px 0;
        color: #BBBBBB;
        font-size: 12px;
        text-align: center;
        /*transform: scale(0.83);*/
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
          width: auto;
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
  }
</style>
