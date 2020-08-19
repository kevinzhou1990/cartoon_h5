/**
* @info: ZM-home-like
* @author: PengGeng
* @date: 8/5/20-5:27 下午
*/
<template>
  <div class="like-main">
    <z-m-home-label :label-name="labelName" @hot-more="handleClickLikeMore"></z-m-home-label>
    <div class="like-main-banner">
      <div class="like-main-banner-img">
        <div class="like-main-banner-img-text">
          <span>{{ bannerTitleName || '-' }}</span>
          <span class="like-main-banner-img-text-l">{{ bannerChapterContent || '-' }}</span>
        </div>
      </div>
    </div>
    <div class="like-main-other">
      <div class="like-main-other-item" v-for="index in 3" :key="index">
        <span class="like-main-other-item-img"></span>
        <span class="like-main-other-item-title">看脸时代</span>
        <span class="like-main-other-item-chapter">更新至290话</span>
      </div>
    </div>
  </div>
</template>

<script>
import ZMHomeLabel from './ZMHomeLabel'

export default {
  name: 'ZMLikeComics',
  props: {
    likeComicsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      labelName: '喜欢《海贼王》的人都在看',
      bannerTitleName: '玛蒂娜生活日记',
      bannerChapterContent: '流失之光工作室  |  更新至06话'
    }
  },
  components: {
    ZMHomeLabel
  },
  methods: {
    /**
     * @info: go to home like more
     * @author: PengGeng
     * @date: 8/5/20-5:29 下午
     */
    handleClickLikeMore() {
      console.log('go to home like more')
    }
  }
}
</script>

<style scoped lang="scss">
  $like-fontSize: 18px;
  $like-color: #222222;
  $banner-font-color: #FFFFFF;
  $banner-fontSize: 14px;
  $banner-l-fontSize: 10px;
  $chapter-color: #BBBBBB;
.like-main {
  position: relative;
  padding: 20px 8px;
  color: $like-color;
  font-size: $like-fontSize;
  font-weight: bold;
  &-banner {
    position: relative;
    margin: 12px 8px;
    width: 343px;
    height: 172px;
    background: url("../../../assets/img/defaultBanner.png") no-repeat;
    background-size: 100%;
    border-radius: 4px;
    &-img {
      position: absolute;
      color: $banner-font-color;
      font-size: $banner-fontSize;
      width: 240px;
      height: 60px;
      bottom: 4px;
      left: -8px;
      background: url("../images/title_bg.png") no-repeat;
      background-size: 100%;
      &-text {
        display: flex;
        flex-direction: column;
        padding-left: 24px;
        padding-top: 8px;
        padding-bottom: 14px;
        font-weight: bold;
        &-l {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          transform: scale(0.83);
          -webkit-transform-origin-x: 0;
        }
      }
    }
  }
  &-other {
    display: flex;
    justify-content: space-between;
    padding: 0 4px;
    &-item {
      display: flex;
      flex-direction: column;
      padding: 0 2px;
      &-img {
        width: 109px;
        height: 145px;
        border-radius: 4px;
        padding: 4px 2px;
        background: url("../../../assets/img/defaultBook.png") no-repeat;
        background-size: 100%;
      }
      &-title {
        width: 109px;
        color: $like-color;
        font-size: $banner-fontSize;
        padding: 4px 0 2px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-chapter {
        font-size: 10px;
        color: $chapter-color;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
      }
    }
  }
}
</style>
