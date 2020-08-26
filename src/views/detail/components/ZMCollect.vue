<template>
  <div class="collect-main">
    <div class="collect-content">
      <div>
        <div class="collect-content-left">
          <span class="collect-content-left-p" @click="handleScoreInfo">{{ zmCollectData && zmCollectData.score }}</span>
          <div class="collect-content-left-img">
            <div class="collect-content-left-img-text">{{ zmCollectData && zmCollectData.evalNum }}人评分</div>
            <div style="display: flex;">
              <img
                class="img"
                v-for="index in 5"
                :key="index"
                src="../images/save_start_collect.png"
                alt
              />
              <!--              <span style=" display: inline-block; background: url('../images/save_start_collect.png') no-repeat center;  background-size: 100%;"></span>-->
            </div>
          </div>
        </div>
        <div class="collect-content-bottom">
          <img class="collect-content-bottom-img" src="../images/save_collect.png" alt />
          <span class="collect-content-bottom-text">{{ zmCollectData && zmCollectData.shelfNum }}人收藏</span>
        </div>
      </div>
      <span class="collect-content-line zm-b-l"></span>
      <div class="collect-content-right" @click.stop="handleCollect">
        <img :src="collected" alt width="24px" height="24px" />
        <!--        <span style="background: url('../images/save_collect.png') no-repeat; height: 24px; width: 24px; z-index: 9;"></span>-->
        <span class="collect-content-right-c">收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMCollect',
  props: {
	  zmCollectData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      collected: require('@/assets/img/save_bb.png'),
      collect: require('@/assets/img/save_ba.png')
    }
  },
  methods: {
	  /**
	   * @info: 去评分详情
	   * @author: PengGeng
	   * @date: 8/26/20-10:21 上午
	   */
	  handleScoreInfo() {
      console.log('go to score info')
    },
	  /**
	   * @info: 点击了收藏
	   * @author: PengGeng
	   * @date: 8/26/20-10:38 上午
	   */
	  handleCollect() {
      console.log('handle click collect')
    }
  }
}
</script>

<style scoped lang="scss">
.collect-main {
  position: relative;
  width: 175px;
  height: 56px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 16px 0;

  .collect-content {
    display: flex;
    z-index: 2;
    &-left {
      width: 123px;
      display: flex;
      &-p {
        font-size: 20px;
        color: #ffffff;
        padding: 4px 8px;
      }
      &-img {
        padding: 4px 0;
        font-size: 10px;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        letter-spacing: 0;
        white-space: nowrap;
        &-text {
          color: rgba(255, 255, 255, 0.6);
        }
        .img {
          display: block;
          width: 10px;
          height: 10px;
        }
      }
    }
    &-bottom {
      display: flex;
      padding: 0 8px;
      line-height: 16px;
      &-img {
        width: 16px;
        height: 16px;
      }
      &-text {
        padding-left: 4px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 10px;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
      }
    }
    &-line {
      height: 24px;
      margin: 16px 0;
      color: #ffffff;
      opacity: 0.1;
    }
    &-right {
      display: flex;
      flex-direction: column;
      padding: 4px 12px;
      &-c {
        padding: 4px 0;
      }
    }
  }
}
</style>
