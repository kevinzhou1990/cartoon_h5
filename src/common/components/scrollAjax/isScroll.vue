<template>
  <div class="main">
    <div class="main-scroll" ref="refreshScroll" style="transform: translate3d(0px, 0px, 0px)">
      <div
          style="text-align: center; color: #222222; line-height: 50px; margin-top: -50px; transition: .2s; z-index: 99;"
          @transitionend="transitionend"
          v-show="topAjax"
          :style="topWrapStyle"
      >
        <span>{{ topTips }}</span>
      </div>
      <div style="overflow: auto;">
        <slot name="srcoll-main"></slot>
      </div>
      <div
          style="text-align: center; color: #222222; line-height: 50px; height: 50px; transition: .2s;"
          v-show="bottomAjax"
      >
        <span>{{ bottomTips }}</span>
      </div>
    </div>
<!--    <div class="main-bottom">-->
<!--      bottom-->
<!--    </div>-->
  </div>
</template>

<script>
import {throttle} from 'lib/utils'
export default {
  props: {
    bottomAjax: { // 是否现实上拉加载
      type: Boolean,
      default: false
    },
	  isBottomAjax: { // 是否可以触发上拉加载
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      topTips: '下拉刷新数据',
      topAjax: true, // 是否可以往下拉
      startY: 0, // 手指点击屏幕的到顶部的距离
      move: 0, // 手指滑动的距离
      topScrollLength: 50, // 手指滑动超过50 开始请求
      topWrapStyle: {
        height: 50 + 'px',
        transition: 'none'
      },
      bottomTips: '上拉加载数据'
    }
  },
  mounted() {
	  this.$refs['refreshScroll'].addEventListener('touchstart', this.touchStart, true)
	  this.$refs['refreshScroll'].addEventListener('touchend', this.touchEnd, true)
    // document.getElementsByClassName('main')[0].addEventListener('scroll', this.scroll, true)
  },
  methods: {
    touchStart(e) {
      if (document.getElementsByClassName('main-scroll')[0].scrollTop > 0) {
        e.stopPropagation()
      }
      let touch = e.changedTouches[0]
      this.bottomTips = '上拉加载'
      this.topTips = '下拉刷新' // 下拉提示文字
      this.startY = touch.clientY // 获得当前按下点的纵坐标
      console.log('touchStart.......', this.startY)
      this.$refs['refreshScroll'].addEventListener('touchmove', this.touchMove, true)
    },
    touchMove(e) {
      let touch = e.changedTouches[0]
      this.move = touch.clientY - this.startY // 滑动的距离
      if (this.move > 20 && this.move < 80){ // 滑动到多少距离后显示什么文字
        this.topTips = '下拉刷新'
        this.$refs['refreshScroll'].style.transform = `translate3d(0px, ${this.move}px, 0px)`
        this.topWrapStyle.height = `${this.move}px`
        this.topWrapStyle.marginTop = `${this.move - 50}px`
      }
      if (this.move > this.topScrollLength){
        this.topTips = '释放更新'
      }
      console.log('touchMove.....', this.move)
    },
    touchEnd() {
      let timer = ''
      if (timer) {
        clearTimeout(timer)
      }
      this.$refs['refreshScroll'].style.transition = 'ease 0.5s'
      this.$refs['refreshScroll'].style.transform = `translate3d(0px, 0px, 0px)`
      console.log('this.move', this.move)
      this.topWrapStyle.transition = 'height 500ms'
	    this.topWrapStyle.height = `50px`
      if (this.move >= this.topScrollLength && this.topAjax && this.getScrollTop() <= 30){
        this.topTips = '更新中...'
	      throttle(this.$emit('on-top-ajax'), 500)
        // timer = setTimeout(() => {
        //   console.log('进来了。。。。')
        //
        //
        //   // 触发上拉加载的动作。。。。。TODO
        // }, 500)
      }
      if (this.getContentScrollHeight() - this.getScrollTop() - this.getClientHeight() <= 50){
        console.log('进来了。。。。')
        timer = setTimeout(() => {
          if (this.isBottomAjax) {
            this.bottomTips = '数据加载中...'
	          this.$emit('to-bottom-ajax')
          }
        })
      }
      console.log('touchEnd.....')
    },
    transitionend () {
      console.log('transitionend')
      this.$refs['refreshScroll'].style.transition = 'height 200ms'
      this.topWrapStyle.transition = 'none'
      this.topWrapStyle.marginTop = '-50px'
    },
    // 获取滚动条当前的位置
    getScrollTop() {
      let scrollTop = 0
      if (document.getElementsByClassName('main-scroll') && document.getElementsByClassName('main-scroll')[0].scrollTop) {
        scrollTop = document.getElementsByClassName('main-scroll')[0].scrollTop
      } else {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      }
      return scrollTop
    },
    // 获取当前可是范围的高度
    getClientHeight() {
      let clientHeight = 0
      if (document.body.clientHeight && this.$refs['refreshScroll'].clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, this.$refs['refreshScroll'].clientHeight)
      } else {
        clientHeight = Math.max(document.body.clientHeight, this.$refs['refreshScroll'].clientHeight)
      }
      return clientHeight
    },
    // 获取文本内容完整的高度
    getContentScrollHeight() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    },
    scroll() {
      console.log('scroll进来了。。。。。')
      if (this.getScrollTop()){
        this.topAjax = false
        this.$refs['refreshScroll'].removeEventListener('tochstart', this.touchStart, true)
        this.$refs['refreshScroll'].removeEventListener('touchend', this.touchend, true)
      } else {
        this.topAjax = true
        this.topWrapStyle.transition = 'none'
        this.topWrapStyle.marginTop = '-50px'
        this.$refs['refreshScroll'].addEventListener('tochstart', this.touchStart, true)
        this.$refs['refreshScroll'].addEventListener('touchend', this.touchend, true)
      }
      if (this.getScrollTop() + this.getClientHeight() >= this.getContentScrollHeight()) {
        console.log('scroll进来了。。。。。')
	      this.$emit('to-bottom-ajax')
        // throttle(function () {
        //   console.log('触发了吗？')
        // }, 200)
        // TODO 还是请求上拉翻页的数据
      }
      // setTimeout(() => {
      //   this.bottomAjax = false
      // }, 2000)
    },
    // 初始化滑动数据
    resetInit() {
      if (this.topWrapStyle.height > 50) {
        this.topWrapStyle.transition = 'hhight 500ms'
        this.topWrapStyle.height = '50px'
        this.topTips = '下拉刷新'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    padding-bottom: 44px;
    box-sizing: border-box;
    .main-scroll {
      position: relative;
      overflow-y: auto;
      height: 100%;
      .srcoll-content {
        position: relative;
        text-align: center;
        height: 55px;
        margin: 10px auto;
        line-height: 50px;
        color: red;
        border-bottom: 1px solid #eeeeee;
      }
    }
    .main-bottom {
      position: fixed;
      height: 44px;
      line-height: 44px;
      bottom: 0;
      z-index: 9999;
      overflow: hidden;
      background: #cccccc;
      width: 100%;
      text-align: center;
    }
  }
</style>
