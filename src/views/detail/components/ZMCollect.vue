<template>
  <div class="collect-main">
    <div class="collect-content">
      <div style="padding-left: 8px;">
        <div class="collect-content-left">
          <div
            style="font-size: 14px; color: rgba(255,255,255,0.60); padding: 5px 8px;"
            v-if="zmCollectData && zmCollectData.evalNum === 0"
          >
            暂无评分
          </div>
          <template v-else>
            <span class="collect-content-left-p" @click="handleScoreInfo">{{
              zmCollectData && zmCollectData.score
            }}</span>
            <div class="collect-content-left-img" @click="handleScoreInfo">
              <div class="collect-content-left-img-text">
                {{ zmCollectData && zmCollectData.evalNum }}人评分
              </div>
              <div style="display: flex;">
                <img class="img" v-for="(name, index) in starts" :key="index" :src="name" alt />
              </div>
            </div>
          </template>
        </div>
        <div class="collect-content-bottom">
          <img class="collect-content-bottom-img" src="../images/save_collect.png" alt />
          <span class="collect-content-bottom-text"
            >{{ zmCollectData && zmCollectData.shelfNum }}人收藏</span
          >
        </div>
      </div>
      <div class="collect-content-line"></div>
      <div class="collect-content-right" @click.stop="handleCollect">
        <img
          :src="zmCollectData && zmCollectData.hasFavor === 0 ? collect : collected"
          alt
          width="17px"
          height="18px"
        />
        <!--        <span style="background: url('../images/save_collect.png') no-repeat; height: 24px; width: 24px; z-index: 9;"></span>-->
        <span class="collect-content-right-c">{{
          zmCollectData && zmCollectData.hasFavor === 0 ? '收藏' : '已收藏'
        }}</span>
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
      collect: require('@/assets/img/save_ba.png'),
      startBG: require('../images/star-bg.png'),
      startHalf: require('../images/start-half.png'),
      start: require('../images/start.png')
    };
  },
  computed: {
    starts() {
      // 1 实心 2 半心 3 空心 共 5 个
      let startArr = [this.start, this.start, this.start, this.start, this.start];
      let startNum = 0;
      if (this.zmCollectData && this.zmCollectData.score) {
        startNum = Math.round(this.zmCollectData.score) / 2;
        if (startNum - Math.floor(startNum) === 0.5) {
          startArr[Math.floor(startNum)] = this.startHalf;
        }
        for (let i = 0; i < Math.floor(startNum); i++) {
          startArr[i] = this.startBG;
        }
      }
      return startArr;
    }
  },
  methods: {
    /**
     * @info: 去评分详情
     * @author: PengGeng
     * @date: 8/26/20-10:21 上午
     * @params remarkType 0 评论  1 评分
     */
    handleScoreInfo() {
      const cartoonId =
        (this.$store.state.reader &&
          this.$store.state.reader.comic &&
          this.$store.state.reader.comic.cartoon_id) ||
        this.$route.query.cartoon_id;
      this.$router.push({
        path: '/comments',
        query: {
          cartoonId,
          remarkType: 1
        }
      });
    },
    /**
     * @info: 点击了收藏
     * @author: PengGeng
     * @date: 8/26/20-10:38 上午
     */
    handleCollect() {
      this.$router.push('/download');
      console.log('handle click collect');
    }
  }
};
</script>

<style scoped lang="scss">
.collect-main {
  position: relative;
  width: 207px;
  height: 56px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 16px 0;

  .collect-content {
    display: flex;
    z-index: 2;
    &-left {
      display: flex;
      font-family: pingfang-blod;
      color: #ffffff;
      width: 119px;
      &-p {
        font-size: 20px;
        color: #ffffff;
        padding: 4px 8px;
      }
      &-img {
        padding: 4px 0;
        font-size: 12px;
        /*transform: scale(0.83);*/
        /*-webkit-transform-origin-x: 0;*/
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
      padding: 0 6px 0 8px;
      line-height: 16px;
      &-img {
        width: 16px;
        height: 16px;
      }
      &-text {
        padding-left: 4px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        /*transform: scale(0.83);*/
        /*-webkit-transform-origin-x: 0;*/
      }
    }
    &-line {
      position: relative;
      display: inline-block;
      height: 24px;
      margin: 16px 0;
      color: #ffffff;
      opacity: 0.1;
      &:before {
        content: ' ';
        position: absolute;
        left: 0;
        width: 0.02666667rem;
        color: #eee;
        border-left: 0.02666667rem solid #ffffff;
        top: 0;
        bottom: 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      padding: 9px 0px 9px 24px;
      align-items: center;
      &-c {
        padding: 4px 0;
      }
    }
  }
}
</style>
