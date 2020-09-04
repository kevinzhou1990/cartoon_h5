<template>
  <div class="test-main">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="(item,index) in list" :key="index">{{ item }}</li>
      </ul>
  </mt-loadmore>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';

export default {
  data() {
    return {
      lastSpot: 0,
      currentIndex: 0,
      dataList: {
        '2': '热播',
        '3': '专题 ',
        '4': '经典漫画',
        '5': '喜欢的人都在看',
        '6': '你可能喜欢 ',
        '7': '2020热播'
      },
	    allLoaded: false
    };
  },
  components: {
    Loadmore
  },
  computed: {
	  list (){
      let num = []
      for (let i = 1; i < 20; i++){
	      num.push(i)
      }
      return num
    }
  },
  methods: {
	  loadTop() {
      console.log('loadTop.......')
		  this.$refs.loadmore.onTopLoaded()
    },
	  loadBottom() {
      console.log('loadBottom.....')
		  this.allLoaded = true;// 若数据已全部获取完毕
		  this.$refs.loadmore.onBottomLoaded()
    },
    start(index) {
      this.currentIndex = index;
      /**
       * 1)先让选中的元素滚到可视区域的最左边 scrollLeft
       * 2)接着向右移动容器一半的距离 containWidth / 2
       * 3)最后向左移动item一半的距离 offsetWidth / 2
       */
      this.lastSpot = this.$refs.scrollBox.scrollLeft;
      console.log(this.lastSpot);
      const nextSpace = 7; //每次移动距离
      let scrollItemTimer = setInterval(() => {
        this.$nextTick(() => {
          let offsetWidth = this.$refs.scrollItem[this.currentIndex]
            .offsetWidth; //item
          let scrollLeft = this.$refs.scrollItem[this.currentIndex].offsetLeft; //选中的元素滚到可视区域的最左边
          const containWidth = this.$refs.scrollBox.offsetWidth; //容器的宽度
          let resultSpot = scrollLeft + offsetWidth / 2 - containWidth / 2; //最终要停留的点
          if (Math.abs(this.lastSpot - resultSpot) < nextSpace) {
            clearInterval(scrollItemTimer);
          }
          if (resultSpot >= this.lastSpot) {
            this.lastSpot = this.lastSpot + nextSpace;
          } else {
            this.lastSpot = this.lastSpot - nextSpace;
          }
          this.$refs.scrollBox.scrollTo(this.lastSpot, 0);
        });
      }, 15);
    }
  }
};
</script>

<style scoped lang="scss">
$BORDER_COLOR: red;
$item-selected-color: #222222;
$item-color: #bbbbbb;
.test-main {
  position: relative;
  overflow: auto;
  width: 100%;
  text-align: center;
  touch-action: none;
}
.scroll-box {
  position: fixed;
  font-family: 'pingfang-blod';
  width: 100%;
  background-color: #ffffff;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  /*height: 56px;*/
  line-height: 56px;
  color: $item-color;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
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
