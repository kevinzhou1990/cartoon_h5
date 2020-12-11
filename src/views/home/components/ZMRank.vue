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
            <img class="rank-item-content-item-img" :src='articleItem.cover' onerror="this.src='data:image/png;base64,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'; this.onerror=null" />
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
    // window.showDefaultImg = function(a) {
    //   console.log('111')
    //   a.src = '../images/newDefaultBook.png'
    //   a.onerror = null // 防止死循环
    // }
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
  $label-fontSize: 12px;
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
          background: url("../../../assets/img/newDefaultBook.png") no-repeat center;
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
              min-width: 72px;
              height: 22px;
              right: 0;
              background: #FFFFFF;
              border-radius: 10px 0 0 10px;
              text-align: center;
              &-text {
                display: block;
                padding: 0 8px;
                color: #12E079;
                line-height: 22px;
                white-space: nowrap;
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
