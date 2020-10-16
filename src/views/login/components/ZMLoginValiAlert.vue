<template>
  <div class="vali-main"
       v-if="valiAlert"
  >
    <div class="vali-main-bg"></div>
    <div class='vali-main-content'>
      <div class="vali-main-content-close" @click.stop="handleClickClose"></div>
      <div class="vali-main-content-img">
        <div class="vali-img"></div>
        <div class="vali-btn">刷新验证码</div>
      </div>
      <div class="vali-main-content-text zm-b-radius">
        <span class="vali-main-content-text-label">验证码</span>
        <input
            class="vali-main-content-text-input"
            type="tel"
            placeholder="请输入图中的验证码"
            v-model="valiValue"
        />
      </div>
      <div
          class="vali-main-content-btn zm-b-t"
          :class="{'btn-color': valiValue}"
          @click.stop="handelClickNextSetp"
      >
        下一步
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ZMLoginValiAlert',
  props: {
	  valiAlert: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'valiAlert',
    event: 'close'
  },
  data() {
    return {
		  valiValue: ''
    }
  },
  methods: {
	  /**
	   * @info: 点击关闭按钮
	   * @author: PengGeng
	   * @date: 10/16/20-5:56 下午
	   */
	  handleClickClose() {
		  this.$emit('close', false)
		  this.valiValue = ''
    },
	  /**
	   * @info: 点击下一步
	   * @author: PengGeng
	   * @date: 10/16/20-4:38 下午
	   */
	  handelClickNextSetp() {
      if (!this.valiValue) return
      this.$emit('close', false)
      this.valiValue = ''
      console.log('click event next step')
    }
  }
}
</script>

<style scoped lang="scss">
.btn-color {
  color: #222222 !important;
}
.vali-main {
  overflow: hidden;
  &-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.5;
    z-index: 999;
  }
  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 311px;
    height: 233px;
    background: #FFFFFF;
    border-radius: 8px;
    z-index: 1000;
    transform: translate(-50%, -50%);
    &-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 16px;
      height: 16px;
      background: url("../images/close.png") no-repeat center;
      background-size: 100%;
    }
    &-img {
      display: flex;
      margin: 48px 16px 16px 16px;
      height: 48px;
      .vali-img {
        width: 179px;
        height: 48px;
        border-radius: 4px;
        background: #12E079;
      }
      .vali-btn {
        position: relative;
        padding-left: 8px;
        text-align: center;
        line-height: 48px;
        color: #12E079;
        &:before {
          display: inline-block;
          vertical-align: middle;
          content: '';
          margin: auto 8px;
          width: 16px;
          height: 16px;
          background: url("../images/refresh.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
    &-text {
      position: relative;
      width: 279px;
      height: 48px;
      margin: 16px;
      line-height: 48px;
      &-label {
        padding-left: 16px;
        font-size: 12px;
        color: #222222;
      }
      &-input {
        position: relative;
        padding-left: 32px;
        outline: none;
        border: none;
      }
    }
    &-btn {
      padding-top: 18px;
      text-align: center;
      font-size: 14px;
      color: #E6E6E6;
    }
  }
}

</style>
