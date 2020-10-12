<template>
  <div class="c-h-main active-in" ref="zm-clear">
    <span class="left" style="transform: scale(0.83)" @click.stop="handleClickClear">清空记录</span>
    <span class="right" @click.stop="handleClickClose"></span>
  </div>
</template>

<script>

export default {
  name: 'ZMClearHistroy',
  props: {
    isShowActiveFlag: {
      type: Boolean,
      default: false
    }
  },
  // mode: {
  //   prop: 'isShowActiveFlag',
  //   event: 'change'
  // },
  // data() {
  //   return {
  //     isShow: this.isShowActiveFlag
  //   }
  // },
  methods: {
	  /**
	   * @info: 取消清空历史搜索按钮
	   * @author: PengGeng
	   * @date: 10/12/20-11:38 上午
	   */
	  handleClickClose() {
		  this.$refs['zm-clear'].classList.remove('active-in')
		  this.$refs['zm-clear'].classList.add('active-out')
      setTimeout(() => {
	      this.$parent.isShowActiveFlag = false
      }, 400)
      // this.$emit('handleClickClearFlag', false)
      // this.$refs['zm-clear']
    },
	  /**
	   * @info: 清空历史搜索
	   * @author: PengGeng
	   * @date: 10/12/20-11:38 上午
	   */
	  handleClickClear() {
      this.$emit('handle_click_clear')
    }
  }
}
</script>

<style scoped lang="scss">
.active-in {
  animation: slidein 500ms;
}
.active-out {
  animation: slideout 500ms;
}
@keyframes slidein {
  from { margin-right: -116px }
  to   { margin-right: 0 }
}
@keyframes slideout {
  from { margin-right: 0 }
  to   { margin-right: -130px }
}
.c-h-main {
  display: flex;
  width: 116px;
  height: 32px;
  /*justify-content: space-between;*/
  background: #F5F5F5;
  border-radius: 16px;
  .left {
    display: block;
    padding: 0;
    box-sizing: content-box;
    width: 82px;
    height: 37px;
    line-height: 36px;
    font-family: pingfang-blod;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    background: #FF3456;
    border-radius: 16px;
    -webkit-transform-origin-x: 0;
    -webkit-transform-origin-y: 0;
  }
  .right {
    width: 16px;
    /*height: 16px;*/
    background: url("../images/clear-icon.png") no-repeat center;
    background-size: 100%;
  }
}
</style>
