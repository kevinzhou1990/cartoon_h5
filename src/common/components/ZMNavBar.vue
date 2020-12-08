<template>
  <div class="main">
    <div class="scroll-box" :class="{'b-d': showBorderBottom }" ref="scrollBox">
      <div
          ref="scrollItem"
          class="item"
          :class="{ active: isSelected == item.index}"
          v-for="(item, index) in tabListData"
          :key="item.index"
          @click.stop="start(item.index, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    /**
     * tabListData type Array
     * eg: [{name: name, index: sec_id}]
     * name: String  名字
     * sec_id: Number ID
     */
    tabListData: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    showBorderBottom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      lastSpot: 0,
      currentIndex: 0, // 选择tab的下标
      isSelected: this.activeIndex,
      dataList: this.tabListData,
      scrollItemTimer: null
    };
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      let _index = 0
      if (this.dataList && this.dataList.length) {
        for (let i = 0; i < this.dataList.length; i++){
          if (this.dataList[i].index === that.activeIndex) {
            _index = i
            break
          }
        }
      }
      const navIndex = this.$store.state.recommend.SEC_ID || '';
      const key = navIndex || this.activeIndex;
      if (_index > -1) this.start(key, _index);
    });
  },
  methods: {
    start(key, index) {
      this.isSelected = key;
      this.currentIndex = key || 0;
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
            let offsetWidth = this.$refs.scrollItem[index].offsetWidth; //item
            let scrollLeft =
              this.$refs.scrollItem && this.$refs.scrollItem[index].offsetLeft; //选中的元素滚到可视区域的最左边
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
.b-d {
  border-top: solid 1px #eeeeee;
}
.main {
  position: relative;
  padding-top: 56px;
  width: 100%;
  box-sizing: border-box;
  .scroll-box {
    position: fixed;
    z-index: 9;
    top: 56px;
    left: 0;
    height: 56px;
    font-family: 'pingfang-blod';
    width: 100%;
    background-color: #ffffff;
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
      position: relative;
      display: inline-block;
      padding: 0 16px;
      white-space: nowrap;
      max-width: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 53px;
      line-height: 53px;
      border-bottom: solid 1px #eeeeee;
    }
    .item:nth-last-of-type(1) {
      margin-right: 0;
    }
    .active {
      position: relative;
      color: $item-selected-color;
      transition-duration: 0.3s;
      line-height: 54px;
      /*border-bottom: 1px solid rgba(#eeeeee, 0.5);*/
      /*border-width: 24px;*/
      /*border-bottom: 2px solid red;*/
      &:after {
        content: ' ';
        display: inline-block;
        position: absolute;
        left: 50%;
        bottom: -2px;
        width: 24px;
        transform: translateX(-50%);
        border-bottom: 3px solid $item-selected-color;
        z-index: 1000;
        /*border-bottom: 2px solid $item-selected-color;*/
        /*margin: 0 8px;*/
      }
    }
  }
}

</style>
