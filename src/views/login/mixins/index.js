import {getSMSCode, getImgCode} from '../api/index'
// import { sleepTimes } from '@/views/login/common'

const downImg = require('../images/more.png')
const timeTypeData = {
  1: 'loginTimes',
  2: 'forgetTimes',
  3: 'modifTimes'
}
export default {
  data() {
    return {
      downImg,
	    telPhoneNum: '', // 手机号码
	    validateNum: '', // 验证码
	    telCode: '+86', // 国家区号
	    areaFlag: false, // 显示区号组件
	    showValidateFlag: false, // 现实验证按钮可以点击
	    valiAlert: false, // 显示图形验证码
	    imgCode: '',
	    passwordVal: '', // 密码
	    hidePasswordVal: '', // 掩码
	    passwordShowFlag: false, // 是否显示明文
	    isShowCountDown: false, // 是否显示倒计时
	    times: 60,
	    timer: null,
	    source: 1, // 获取验证码的
	    countTimeSMS: 0 // 第几次获取短信验证码
    }
  },
  mounted() {
    this.source = this.$route.query.SOURCE || 1
	  const entryTime = new Date().getTime()
	  const countDownTimes = Number(localStorage.getItem(timeTypeData[this.source]))
	  const sleepTimes = countDownTimes && Math.floor((entryTime - countDownTimes) / 1000)
	  if (sleepTimes && sleepTimes > 0 && sleepTimes < 60) {
		  console.log('sleepTimes', sleepTimes)
		  this.isShowCountDown = true
		  // console.log(sleepTimes(entryTime, countDownTimes))
		  this.times = 60 - sleepTimes
		  this.countDown()
	  }
  },
  computed: {
    // 是高亮现实login btn
    isClickLoginBtnFlag() {
      if ((this.showValidateFlag || this.isShowCountDown) && (this.validateNum.length || (this.passwordVal && this.passwordVal.length))) {
        return true
      } else {
        return false
      }
    },
	  // 发送短信验证码的文字
    validateSMSText() {
      const btnValue = this.countTimeSMS >= 1 ? '重新获取' : '获取验证码'
      return this.isShowCountDown ? this.times : btnValue
    }
  },
  methods: {
	  /**
	   * @info: 处理手机号码输入
	   * @author: PengGeng
	   * @date: 10/21/20-11:44 上午
	   */
	  changeTelPhoneNum(val) {
		  this.telPhoneNum = val.toString().replace(/[^\d]/g, '') || ''
	  },
	  /**
	   * @info: 处理验证码输入
	   * @author: PengGeng
	   * @date: 10/21/20-11:45 上午
	   */
	  changeValidateNum(val) {
		  this.validateNum = val.toString().replace(/[^\d]/g, '') || ''
	  },
	  /**
	   * @info: 倒计时
	   * @author: PengGeng
	   * @date: 10/20/20-6:04 下午
	   */
    countDown() {
		  this.countTimeSMS++
		  this.showValidateFlag = false
		  // clearInterval(this.timer)
		  this.timer = setInterval(() => {
			  this.times--
			  console.log('times', this.times)
			  if (this.times === 0) {
				  clearInterval(this.timer)
				  this.isShowCountDown = false
				  this.showValidateFlag = true
				  this.times = 60
				  console.log('timer销毁')
			  }
		  }, 1000)
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
	   * @info: 获取国家区号
	   * @author: PengGeng
	   * @date: 10/21/20-4:53 下午
	   */
	  getTelCode(val) {
		  this.telCode = val
		  console.log('this.telCode', this.telCode)
	  },
	  /**
	   * @info: 获取验证码
	   * @author: PengGeng
	   * @date: 10/16/20-10:29 上午
	   * source=1 注册/登陆，source=2 找回密码 source=3 修改密码
	   */
	  async handleClickGetValidate(source = 1, randCode = undefined) {
		  if (!this.showValidateFlag) return
		  this.source = source
		  const reqData = {
			  phone: this.telPhoneNum,
			  source,
			  country: this.telCode,
			  rand_code: randCode
		  }
		  const resData = await getSMSCode(reqData)
		  if (resData && resData.code === 0) {
			  resData.msg && this.$toast(resData.msg)
			  this.isShowCountDown = true
			  this.isShowCountDown && this.countDown()
			  // 存入点击获取短信验证码的时间
			  localStorage.setItem(timeTypeData[source], new Date().getTime())
		  } else if (resData.code === 1320) {
			  // 是否现实弹出弹框输入验证码
			  this.valiAlert = true
			  this.getImgCode()
		  } else {
	      this.$toast(resData.msg || '系统繁忙,请稍后重试')
		  }
	    // else if (resData.code === 1320) {
      // 	  this.$toast(resData.msg || '手机号码未注册')
      //   }
		  console.log('click validate btn')
	  },
	  /**
	   * @info: 获取图片验证码
	   * @author: PengGeng
	   * @date: 10/21/20-4:00 下午
	   */
	  async getImgCode() {
      const resData = await getImgCode()
		  if (resData && resData.code === 0) {
        this.imgCode = resData.data.image
		  } else {
	      this.$toast(resData.msg || '系统繁忙,请稍后重试')
		  }
	  }
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
  },
  beforeRouteLeave(to, from, next){
    clearInterval(this.timer)
    next()
  }
}
