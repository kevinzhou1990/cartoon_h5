<template>
  <div class="main" ref="remarkScroll">
    <div class="main-height" :style="topWrapStyle" @transitionend="transitionend" v-show="topAjax"></div>
    <div class="main-content"></div>
    <div class="main-catalogue">
      <div class="left">
        <img class="left-dn" src="../images/download.png" alt="">
        <span class="left-text">缓存</span>
      </div>
      <div class="center">
        阅读 第一话
      </div>
      <div class="left">
        <img class="left-dn" src="../images/catalog-icon.png" alt="">
        <span class="left-text">目录</span>
      </div>
    </div>
    <div class="main-other" ref="ohterEl" :class="{ bgColor: isShowBgColor }">
      <z-m-detail-chapter></z-m-detail-chapter>
      <z-m-detail-remark></z-m-detail-remark>
      <z-m-comics-scroll :title-content="authorTitle"></z-m-comics-scroll>
      <z-m-comics-scroll :title-content="maybeLikeTitle"></z-m-comics-scroll>
      <z-m-no-data></z-m-no-data>
    </div>
  </div>
</template>

<script>
import ZMDetailChapter from '@/views/detail/components/ZMDetailChapter'
import ZMDetailRemark from '@/views/detail/components/ZMDetailRemark'
import ZMComicsScroll from '@/views/detail/components/ZMComicsScroll'
import ZMNoData from '@/common/components/ZMNoData'

/*
 * @info 函数节流, 固定时间调取一次
 * @fn {function} 要执行的函数
 * @wait {number | ms} 要等待的毫秒数
 * */
window.throttle = function(fn, wait = 300) {
  let canRun = true
  return function() {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, wait)
  }
}
export default {
  name: 'ZMScroll',
  components: {
    ZMDetailChapter,
    ZMDetailRemark,
    ZMComicsScroll,
    ZMNoData
  },
  data() {
    this.startTouchValue = 0 // 手指触摸到屏幕距离顶部的距离
    this.touchDistance = '1.33333333rem' // 滑动的距离
    this.startTouchDistance = 310 // 手指触摸到屏幕多少距离才能出发滑动时间
    return {
      topWrapStyle: {
        height: this.touchDistance,
        transition: 'none'
      },
      scrollHeight: document.documentElement.scrollTop,
      topAjax: true,
      authorTitle: '作者其他漫画',
      maybeLikeTitle: '喜欢《神灯精灵…》的也会喜欢',
      isShowBgColor: false
      // otherHeight: 0
    }
  },
  beforeMount() {
    // document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  mounted() {
    this.scrolOnEventChange()
    this.$el.addEventListener('touchstart', this.touchStart, true)
    this.$el.addEventListener('touchend', this.touchEnd, true)
    this.$nextTick(() => {
      this.otherHeight = this.$refs.ohterEl.getBoundingClientRect().y
    })
  },
  methods: {
    touchStart(e) {
      const touch = e.changedTouches[0]
      this.startTouchValue = touch.pageY
      if (this.startTouchValue < this.startTouchDistance) return
      e.stopPropagation()
      this.$el.addEventListener('touchmove', this.touchMove)
      console.log('我开始滑动了。。。。', this.startTouchValue)
    },
    touchMove(e) {
      if (this.startTouchValue < this.startTouchDistance) return
      const touch = e.changedTouches[0].pageY
      // console.log('touch', touch, 'startTouchValue', this.startTouchValue)
      let height = touch - this.startTouchValue
      if (height > 44 && height < 180) {
        this.topWrapStyle.height = `${height}px`
        this.$parent.$refs.mainContent.style.height = (284 + height - 56) + 'px'
      }
      // if (height < 0) {
      //   // this.$parent.$refs.mainContent.style.height = (284 + (height) - 58) + 'px'
      //   console.log('this.otherHeight', document.getElementsByClassName('main-other')[0].getBoundingClientRect().y)
      //   this.$parent.$refs.mainContent.style.height = document.getElementsByClassName('main-other')[0].sc- 28 + (-height) + 'px'
      //   // this.$refs.ohterEl.style.background = 'red'
      //   // this.$parent.$refs.mainContent.style.height = (284 - 28) + 'px'
      // }
      console.log('touchMove', height)
      console.log('我在滑动中。。。。')
    },
    touchEnd(e) {
      if (this.startTouchValue < this.startTouchDistance) return
      const touch = e.changedTouches[0].pageY
      this.$el.removeEventListener('touchmove', this.touchMove)
      if (this.$el.scrollTop > 0) {
        this.startTouchValue = touch
        return
      }
      this.$parent.$refs.mainContent.style.height = 284 + 'px'
      this.topWrapStyle.transition = 'height 200ms'
      this.topWrapStyle.height = `${this.touchDistance}`
      console.log('我结束滑动了。。。。')
    },
    transitionend() {
      this.topWrapStyle.transition = 'none'
    },
    scrolOnEventChange() {
      // this.$refs.remarkScroll.addEventListener('scroll', this.getPageScroll, true)
      window.addEventListener('scroll', this.getPageScroll, true)
    },
    getPageScroll() {
      let yScroll
      let self = window
      if (self.pageYOffset) {
        yScroll = self.pageYOffset
      // xScroll = self.pageXOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) {
        yScroll = document.documentElement.scrollTop
      } else if (document.body) {
        yScroll = document.body.scrollTop
      }
      console.log('滚动距离' + yScroll)
      if (yScroll >= 20){
        this.isShowBgColor = true
      } else {
        this.isShowBgColor = false
      }
      return yScroll
    }
  },
  watch: {
    scrollHeight(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.getPageScroll, true)
    window.pageYOffset = 0
    document.documentElement.scrollTop = 0
    console.log('destroyed...', document.documentElement.scrollTop)
  }
}
</script>

<style scoped lang="scss">
  .main {
    /*  overflow-scrolling: touch;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*position: absolute;*/
    font-weight: bold;
    margin: 0 auto;
    color: #222222;
    z-index: 6;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    overflow-scrolling: touch;
    box-sizing: border-box;

    &-height {
      display: block;
      height: 50px;
      margin-top: -50px;
      line-height: 50px;
    }

    &-content {
      margin-top: 256px;
      background: #FFFFFF;
      opacity: 0;
    }

    &-catalogue {
      display: flex;
      justify-content: center;
      background: #FFFFFF;
      margin: 0 16px;
      width: 343px;
      height: 56px;
      border-radius: 4px;
      box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.10);

      .left {
        display: flex;
        padding: 16px 22px;

        &-dn {
          width: 24px;
          height: 24px;
        }

        &-text {
          padding-left: 8px;
          white-space: nowrap;
          line-height: 24px;
        }
      }

      .center {
        position: relative;
        margin: 10px 22px;
        width: 135px;
        height: 36px;
        background: #12E079;
        border-radius: 4px;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        color: #FFFFFF;
      }
    }

    &-other {
      /*background: #FFFFFF;*/
    }

    .bgColor {
      background: #FFFFFF;
    }
  }
</style>
