<template>
  <div class="main-bar zm-b-t-b bar-zindex" ref="navBar">
    <div class="main-bar-content">
      <div class="main-bar-content-item"
           v-for="(value, name, index) in tabListData"
           :key="name"
           @click.stop="isSelected = name, start(index)"
           ref="scrollItem"
           :class="isSelected == name ? 'is-selected' : ''"
      >
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMTabBar',
  props: {
    tabListData: {
      type: Object,
      default: () => {}
    },
    acticeIndex: {
      type: String,
      default: '1'
    }
  },
  data() {
    this.startTouchValue = 0
    this.clientWidth = 0
    return {
      isSelected: this.acticeIndex
    }
  },
  mounted() {
    // this.$el.addEventListener('touchstart', this.touchStart, true)
    console.log(this.clientWidth)
  },
  methods: {
    getScrollOffset() {
      let xScroll
      let self = this.$el
      if (self.pageXOffset) {
        xScroll = self.pageXOffset
      // xScroll = self.pageXOffset;
      } else if (document.documentElement && document.documentElement.offsetLeft) {
        xScroll = document.documentElement.offsetLeft
      } else if (document.body) {
        xScroll = document.body.offsetLeft
      }
      debugger
      const scrollLeft = this.$refs[`navBar${this.isSelected}`][0].offsetLeft
      if (scrollLeft > 300) {
        this.$el.scrollLeft = 100
      // this.$refs[`navBar${val}`][0].scrollTo({
      //   left: 50,
      //   behavior: 'smooth'
      // })
      // nvaBarEl.scrollTo({
      //   left: 50,
      //   behavior: 'smooth'
      // })
      }
      console.log('scroll的距离' + xScroll)
      // if (window.pageXOffset) {
      //   return {
      //     x: window.pageXOffset,
      //     y: window.pageYOffset
      //   }
      // } else {
      //   return {
      //     x: document.body.scrollLeft + document.documentElement.scrollLeft,
      //     y: document.body.scrollTop + document.documentElement.scrollTop
      //   }
      // }
    },
    touchStart(e) {
      const touch = e.changedTouches[0]
      this.startTouchValue = touch.pageX
      if (this.startTouchValue > 300){

      }
      console.log(this.startTouchValue)
    },
    handleRecommendTabItem(val) {
      // const nvaBarEl = this.$el
      console.log(this.$refs.navBar.scrollLeft)
      this.$refs.navBar.scrollTo(7, 0)
      this.isSelected = val
      this.$emit('getRecommendData', this.isSelected)
    },
    start(index) {
      /**
       * 1)先让选中的元素滚到可视区域的最左边 scrollLeft
       * 2)接着向右移动容器一半的距离 containWidth / 2
       * 3)最后向左移动item一半的距离 offsetWidth / 2
       */
      let lastSpot = this.$refs.navBar.scrollLeft
      console.log(lastSpot)
      const nextSpace = 7 //每次移动距离
      let scrollItemTimer = setInterval(() => {
        this.$nextTick(() => {
          let offsetWidth = this.$refs.scrollItem[index].offsetWidth //item
          let scrollLeft = this.$refs.scrollItem[index].offsetLeft //选中的元素滚到可视区域的最左边
          const containWidth = this.$refs.navBar.offsetWidth //容器的宽度
          let resultSpot = scrollLeft + offsetWidth / 2 - containWidth / 2 //最终要停留的点
          if (Math.abs(lastSpot - resultSpot) < nextSpace) {
            clearInterval(scrollItemTimer)
          }
          if (resultSpot >= lastSpot) {
            lastSpot = lastSpot + nextSpace
          } else {
            lastSpot = lastSpot - nextSpace
          }
          this.$refs.navBar.scrollTo(lastSpot, 0)
        })
      }, 15)
    }
  }
}
</script>

<style scoped lang="scss">
  $BORDER_COLOR: red;
  $item-selected-color: #222222;
  $item-color: #BBBBBB;
  .is-selected {
    position: relative;
    color: $item-selected-color;
    &:after {
      content: ' ';
      display: block;
      border-bottom: 2px solid $item-selected-color;
      /*width: 24px;*/
      margin: 0 8px;
    }
  }

  .bar-zindex {
    /*position: relative;*/
    left: 0;
    top: 44px;
    z-index: 9;
    background: #ffffff;
  }

  .main-bar {
    position: fixed;
    font-size: 12px;
    font-weight: bold;
    height: 56px;
    line-height: 56px;
    color: $item-color;
    width: 100%;
    &-content {
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      width: 100%;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        width: 0 !important
      }

      &-item {
        padding: 0 16px;
        white-space: nowrap;
      }
    }
  }
</style>
