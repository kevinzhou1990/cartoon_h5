<template>
  <div class="scroll-box" ref="scrollBox">
    <div
      ref="scrollItem"
      class="item"
      :class="{ active: isSelected == name }"
      v-for="(item, name, index) in tabListData"
      :key="name"
      @click.stop="start(name, index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    tabListData: {
      type: Object,
      default: () => {}
    },
    acticeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      lastSpot: 0,
      currentIndex: 0, // 选择tab的下标
      isSelected: this.acticeIndex,
      // dataList: this.tabListData,
      scrollItemTimer: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.tabListData, '======');
      const _index =
        this.tabListData && Object.keys(this.tabListData).indexOf(this.acticeIndex + '');
      const key = this.acticeIndex;
      console.log(Object.keys(this.tabListData));
      if (_index > -1) {
        this.start(key, _index);
      }
      // const _index = this.dataList && Object.keys(this.dataList).indexOf(this.acticeIndex + '');
      // const key = this.acticeIndex;
      // this.start(key, _index);
    });
  },
  methods: {
    start(key, index) {
      this.isSelected = key;
      this.currentIndex = index;
      this.$emit('getRecommendData', this.isSelected);
      /**
       * 1)先让选中的元素滚到可视区域的最左边 scrollLeft
       * 2)接着向右移动容器一半的距离 containWidth / 2
       * 3)最后向左移动item一半的距离 offsetWidth / 2
       */
      this.lastSpot = this.$refs.scrollBox.scrollLeft;
      const nextSpace = 7; //每次移动距离
      // console.log(this.currentIndex, nextSpace);
      this.scrollItemTimer = setInterval(() => {
        this.$nextTick(() => {
          if (this.$refs && this.$refs.scrollItem) {
            let offsetWidth = this.$refs.scrollItem[this.currentIndex].offsetWidth; //item
            let scrollLeft =
              this.$refs.scrollItem && this.$refs.scrollItem[this.currentIndex].offsetLeft; //选中的元素滚到可视区域的最左边
            const containWidth = this.$refs.scrollBox.offsetWidth; //容器的宽度
            let resultSpot = scrollLeft + offsetWidth / 2 - containWidth / 2; //最终要停留的点
            if (Math.abs(this.lastSpot - resultSpot) < nextSpace) {
              clearInterval(this.scrollItemTimer);
            }
            if (resultSpot >= this.lastSpot) {
              this.lastSpot = this.lastSpot + nextSpace;
            } else {
              this.lastSpot = this.lastSpot - nextSpace;
            }
            this.$refs.scrollBox.scrollTo(this.lastSpot, 0);
          }
        });
      }, 15);
    }
  },
  destroyed() {
    clearInterval(this.scrollItemTimer);
  }
};
</script>

<style scoped lang="scss">
$BORDER_COLOR: red;
$item-selected-color: #222222;
$item-color: #bbbbbb;
.bar-zindex {
  position: relative;
  left: 0;
  top: 44px;
  z-index: 9;
  background: #ffffff;
  &:before {
    content: ' ';
    position: absolute;
    /*display:inline-block;*/
    min-width: 475px;
    bottom: 0;
    height: 1px;
    color: #eee;
    left: 0;
    right: 0;
    border-bottom: 1px solid #eee;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.scroll-box {
  position: fixed;
  font-family: 'pingfang-blod';
  width: 100%;
  background-color: #ffffff;
  z-index: 9;
  height: 56px;
  line-height: 52px;
  border-top: solid 1px #eeeeee;
  border-bottom: solid 1px #eeeeee;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  color: $item-color;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none;
  }
  .item {
    display: inline-block;
    padding: 0 16px;
    white-space: nowrap;
    max-width: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 56px;
    line-height: 52px;
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
  }
}
</style>
