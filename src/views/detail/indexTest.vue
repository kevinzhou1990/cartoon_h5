<template>
    <div class="scroll-box zm-b-b" ref="scrollBox">
      <div
          ref="scrollItem"
          class="item"
          :class="{ active: currentIndex == index }"
          v-for="(item, name, index) in dataList"
          :key="index"
          @click.stop="start(index)"
      >
        {{ item }}
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      lastSpot: 0,
      currentIndex: 0,
      dataList: {'2': '热播', '3': '专题 ', '4': '经典漫画', '5': '喜欢的人都在看', '6': '你可能喜欢 ', '7': '2020热播'}
    }
  },
  methods: {
    start(index) {
      this.currentIndex = index
      /**
     * 1)先让选中的元素滚到可视区域的最左边 scrollLeft
     * 2)接着向右移动容器一半的距离 containWidth / 2
     * 3)最后向左移动item一半的距离 offsetWidth / 2
     */
      this.lastSpot = this.$refs.scrollBox.scrollLeft
      console.log(this.lastSpot)
      const nextSpace = 7 //每次移动距离
      let scrollItemTimer = setInterval(() => {
        this.$nextTick(() => {
          let offsetWidth = this.$refs.scrollItem[this.currentIndex].offsetWidth //item
          let scrollLeft = this.$refs.scrollItem[this.currentIndex].offsetLeft //选中的元素滚到可视区域的最左边
          const containWidth = this.$refs.scrollBox.offsetWidth //容器的宽度
          let resultSpot = scrollLeft + offsetWidth / 2 - containWidth / 2 //最终要停留的点
          if (Math.abs(this.lastSpot - resultSpot) < nextSpace) {
            clearInterval(scrollItemTimer)
          }
          if (resultSpot >= this.lastSpot) {
            this.lastSpot = this.lastSpot + nextSpace
          } else {
            this.lastSpot = this.lastSpot - nextSpace
          }
          this.$refs.scrollBox.scrollTo(this.lastSpot, 0)
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
  .scroll-box {
    position: fixed;
    font-family: 'pingfang-blod';
    width: 100%;
    background-color: #FFFFFF;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    /*height: 56px;*/
    line-height: 56px;
    color: $item-color;
    &::-webkit-scrollbar{ width:0 !important; }
    .item {
      display: inline-block;
      padding: 0 16px;
      white-space: nowrap;
    }
    .item:nth-last-of-type(1) {
      margin-right: 0;
    }
  }
  .active {
    position: relative;
    color: $item-selected-color;
    transition-duration: 0.3s;
    &:after {
      content: ' ';
      display: block;
      border-bottom: 2px solid $item-selected-color;
      /*width: 24px;*/
      margin: 0 8px;
      transition: linear 3s ease-out;
    }
  }
</style>
