const downImg = require('../images/more.png')
export default {
  data() {
    return {
      downImg,
	    telPhoneNum: '', // 手机号码
	    validateNum: '', // 验证码
	    areaFlag: false, // 显示区号组件
	    showValidateFlag: false, // 现实验证按钮可以点击
	    valiAlert: false, // 现实图形验证码
	    passwordVal: '', // 密码
	    hidePasswordVal: '', // 掩码
	    passwordShowFlag: false, // 是否显示明文
	    isShowCountDown: false, // 是否显示倒计时
	    times: 60,
	    timer: null
    }
  },
  computed: {
    // 是高亮现实login btn
    isClickLoginBtnFlag() {
      if (this.showValidateFlag && (this.validateNum.length || (this.passwordVal && this.passwordVal.length))) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
	  /**
	   * @info: 倒计时
	   * @author: PengGeng
	   * @date: 10/20/20-6:04 下午
	   */
    countDown() {
		  this.showValidateFlag = false
      clearInterval(this.timer)
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
	   * @info: 获取验证码
	   * @author: PengGeng
	   * @date: 10/16/20-10:29 上午
	   */
	  handleClickGetValidate() {
		  if (!this.showValidateFlag) return
		  // this.valiAlert = true // TODO 是否现实弹出弹框输入验证码
		  this.isShowCountDown = true
		  this.isShowCountDown && this.countDown()
		  console.log('click validate btn')
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
  }
}
