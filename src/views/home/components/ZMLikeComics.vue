/**
* @info: ZM-home-like
* @author: PengGeng
* @date: 8/5/20-5:27 下午
*/
<template>
  <div class="like-main">
    <z-m-home-label :label-name="labelName" :rec-id="recId"></z-m-home-label>
    <div
        class="like-main-banner"
        :style="{background: 'url('+likeBannerData.cover+')', 'background-size': '100%'}"
        @click="handleZMInfo(likeBannerData.cartoon_id)"
    >
      <div class="like-main-banner-img">
        <div class="like-main-banner-img-text">
          <span>{{ likeBannerData.title || '-' }}</span>
          <span class="like-main-banner-img-text-l">{{ likeBannerData.author | authorFormate }} | {{ likeBannerData.publish_status || '--'}}</span>
        </div>
      </div>
    </div>
    <div class="like-main-other">
      <div
          class="like-main-other-item"
          v-for="item in likeComicsList"
          :key="item.cartoon_id"
          @click="handleZMInfo(item.cartoon_id)"
      >
        <span class="like-main-other-item-img" :style="{background: 'url('+item.cover+')', 'background-size': 'contain'}"></span>
        <span class="like-main-other-item-title">{{ item.title || '--'}}</span>
        <span class="like-main-other-item-chapter">{{ item.publish_status || '--'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../common/filters/home'
import ZMHomeLabel from './ZMHomeLabel'
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMLikeComics',
  mixins: [myMixins],
  props: {
    likeComicsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      labelName: '喜欢《海贼王》的人都在看',
      likeComicsList: [],
      likeBannerData: null,
      bannerTitleName: '玛蒂娜生活日记',
      recId: 5
      // bannerChapterContent: '流失之光工作室  |  更新至06话'
    }
  },
  components: {
    ZMHomeLabel
  },
  created() {
    this.labelName = this.likeComicsData.name
    this.recId = this.likeComicsData.rec_id || 5
    this.likeComicsList = this.likeComicsData.cartoon_list
    this.likeBannerData = this.likeComicsData.top || {}
  },
  methods: {}
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
  ::-webkit-scrollbar { width: 0 !important }
  &-other {
    display: flex;
    justify-content: space-between;
    margin: 0 4px;
    overflow-x: scroll;
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
