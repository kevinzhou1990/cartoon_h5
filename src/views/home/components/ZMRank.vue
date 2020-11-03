<template>
  <div style="position: relative;" ref="rank-main" v-if="rankList.length">
    <div class="rank-main" ref="rank-scroll">
      <div
          class="rank-item"
          v-for="(item, index) in rankList"
          :key="index"
      >
        <div class="rank-item-label" @click.stop="handleRankList(item.cate.rank_id)">
          <span class="rank-item-label-l">{{ item.cate.name || '--' }}</span>
          <div class="rank-item-label-r">
            <span>全部</span>
            <img class="r-img" src="../images/more.png" alt="">
          </div>
        </div>
        <div class="rank-item-content"
             v-if="item.article.length"
             v-for="articleItem in item.article"
             :key="articleItem.cartoon_id"
        >
          <div class="rank-item-content-item" @click.stop="handleZMInfo(articleItem.cartoon_id, 1, item.cate.rank_id)">
            <div class="rank-item-content-item-img" :style="{ background: 'url('+articleItem.cover+') no-repeat center / cover' }"></div>
            <div class="rank-item-content-item-info">
              <div class="info-rank">
                <div class="info-rank-l"><span class="l-c">{{`0${ articleItem.rank }`}}</span></div>
                <div class="info-rank-r" v-show="articleItem.days>=7">
                  <span class="info-rank-r-text">连续霸榜{{ articleItem.days | weekFromate}}周</span>
                </div>
              </div>
              <span class="info-content">{{ articleItem.title }}</span>
              <span class="info-chpater">{{ articleItem.status_text || '--'}}</span>
<!--              <span class="info-chpater pt8" >{{ articleItem.read_num | personNums  }}万人阅读</span>-->
              <span class="info-chpater pt8" >{{ articleItem.read_num_text }}人阅读</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rank-all" ref="rank-all" @click.stop="handleRankList">
        <div class="rank-all-text">查看全部排行榜</div>
        <div class="rank-all-img"></div>
      </div>
    </div>
<!--    <div style="position: absolute; display: block; top: 0; right: 0; overflow: hidden;">-->
<!--      <div class="rank-all" ref="rank-all">-->
<!--        <div class="rank-all-text">查看全部排行榜</div>-->
<!--        <div class="rank-all-img"></div>-->
<!--      </div>-->
<!--    </div>-->
  </div>

</template>

<script>
import '@/common/filters/home'
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMRank',
  mixins: [myMixins],
  props: {
    rankData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      viewWidth: 0, // 视图的宽度
	    startMoveX: 0, // 手指触摸屏幕是的距离
      moveX: 0, // 向X轴滑动的距离
	    scrollX: 0, // 水平X轴向左滚动的距离
      clientWidth: 0, // 可视区域的宽度
      rankList: [] // 榜单数组
    }
  },
  mounted() {
    this.rankList = (this.rankData && this.rankData.rank_list) || []
    // 做横向滚动时 所设置的监听事件
    // // this.$refs['rank-scroll'].addEventListener('touchstart', this.touchStart)
    // // this.$refs['rank-scroll'].addEventListener('touchend', this.touchEnd)
    // this.$nextTick(() => {
	  //   // this.$refs['rank-scroll'].addEventListener('scroll', this.onScroll)
	  //   this.viewWidth = this.$refs['rank-scroll'].scrollWidth
    //   this.clientWidth = this.$refs['rank-scroll'].offsetWidth
    // })
  },
  methods: {
	  /**
	   * @info: 点击排行榜
	   * @author: PengGeng
	   * @date: 9/22/20-11:19 上午
	   */
	  handleRankList(val = 'ALL') {
		  const rankValue = typeof val === 'number' ? val : 'ALL'
		  this.$router.push({
        path: '/ranking',
        query: {
          rank: rankValue
        }
      })
    },
	  touchStart(e) {
      const touch = e.changedTouches[0]
      this.startMoveX = touch.pageX
      console.log('touchStart-x', this.startMoveX)
		  this.$refs['rank-scroll'].addEventListener('touchmove', this.touchMove)
    },
	  touchMove(e) {
		  this.moveX = e.changedTouches[0].pageX
      console.log('touchMove-x', this.moveX)
      console.log('touchMoce-width', this.startMoveX)
		  if ((this.clientWidth + this.scrollX) >= this.viewWidth && this.startMoveX - this.moveX <= 100) {
			  this.$refs['rank-all'].style.marginRight = (this.startMoveX - this.moveX) - 108 + 'px'
        this.$refs['rank-scroll'].style.right = (this.startMoveX - this.moveX) + 'px'
			  console.log('开始出发了')
		  }
    },
	  touchEnd() {
		  console.log('结束了')
      if ((this.startMoveX - this.moveX) > 50){
        console.log('进入排行榜')
      }
		  this.$refs['rank-all'].style.marginRight = '-108px'
		  this.$refs['rank-scroll'].style.right = '0px'
		  // if(this.moveX)
    },
	  onScroll() {
      this.scrollX = this.$refs['rank-scroll'] && this.$refs['rank-scroll'].scrollLeft// const clientScrollWidth = this.$ref['rank-scroll'].scrollWidth
      console.log('onScroll-scrollLeft', this.scrollX)
    }
  }
}
</script>

<style scoped lang="scss">
  $title-fontSize: 18px;
  $title-color: #222222;
  $label-color: #BBBBBB;
  $label-fontSize: 10px;
.pt8 {
  padding-top: 8px;
}

.rank-main {
  position: relative;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 40px auto;
  width: 100%;
  font-family: 'PingFangSC-Semibold';
  &::-webkit-scrollbar {
    display: none;
  }
  .rank-item {
    width: 250px;
    height: 385px;
    margin-left: 8px;
    background-image: linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 100%);
    border-radius: 8px;
    &-label {
      display: flex;
      justify-content: space-between;
      padding: 16px 8px 8px 8px;
      height: 25px;
      line-height: 25px;
      &-l {
        font-size: $title-fontSize;
        color: $title-color;
      }
      &-r {
        font-size: $label-fontSize;
        color: $label-color;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        .r-img {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: text-top;
        }
      }
    }
    &-content {
      position: relative;
      padding-left: 8px;
      box-sizing: content-box;
      &-item {
        display: flex;
        padding: 8px 0;
        &-img {
          width: 72px;
          height: 96px;
          border-radius: 4px;
          background: url("../images/newDefaultBook.png") no-repeat center;
          background-size: cover;
        }
        &-info {
          display: flex;
          flex-direction: column;
          padding-left: 8px;
          .info-rank {
            display: flex;
            justify-content: space-between;
            &-l {
              position: relative;
              width: 24px;
              height: 28px;
              background: url("../images/top.png") no-repeat center;
              background-size: 100%;
              .l-c {
                font-size: 12px;
                color: #FFFFFF;
                top: 50%;
                left: 50%;
                transform: translateY(-40%) translateX(-50%);
                position: absolute;
              }
            }
            &-r {
              position: absolute;
              width: 72px;
              height: 20px;
              right: 0;
              background: #FFFFFF;
              border-radius: 10px 0 0 10px;
              text-align: center;
              &-text {
                display: block;
                color: #12E079;
                transform: scale(0.83);
                line-height: 20px;
              }
              /*-webkit-transform-origin-x: 0;*/
            }
          }
          .info-content {
            width: 154px;
            height: 20px;
            padding-top: 4px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 14px;
            color: #222222;
          }
          .info-chpater {
            font-size: 10px;
            color: #BBBBBB;
            transform: scale(0.83);
            -webkit-transform-origin-x: 0;
          }
        }
      }
    }
  }
  .rank-all {
    position: relative;
    margin-left: 8px;
    min-width: 100px;
    height: 385px;
    background-image: linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 100%);
    border-radius: 8px 0 0 8px;
    vertical-align: middle;
    &-text {
      position: absolute;
      color: $label-color;
      left: 41px;
      top: 50%;
      transform: scale(0.83) translateY(-50%);
      -webkit-transform-origin-y: 0;
      vertical-align: middle;
      width: 12px;
      &:after {
        content: ' ';
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
        background: url("../images/more.png") no-repeat center;
        background-size: 100%;
        width: 16px;
        height: 16px;
      }
    }
    &-img {
      /*display: block;*/

    }
  }
}

</style>
