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
      :style="`background-image:url('${likeBannerData.cover}');`"
      @click="handleZMInfo(likeBannerData.cartoon_id, 2, recId)"
    >
      <div class="like-main-banner-img">
        <div class="like-main-banner-img-text">
          <span>{{ likeBannerData.title || '-' }}</span>
          <span
            class="like-main-banner-img-text-l"
          >{{ likeBannerData.author | authorFormate }} | {{ likeBannerData.publish_status || '--'}}</span>
        </div>
      </div>
    </div>
    <div class="like-main-other">
      <div
        class="like-main-other-item"
        v-for="item in likeComicsList"
        :key="item.cartoon_id"
        @click="handleZMInfo(item.cartoon_id, 2, recId)"
      >
        <span
          class="like-main-other-item-img"
          :style="{background: 'url('+item.cover+')', 'background-size': '100%'}"
        ></span>
        <span class="like-main-other-item-title">{{ item.title || '--'}}</span>
        <span class="like-main-other-item-chapter">{{ item.publish_status || '--'}}</span>
      </div>
    </div>
    <z-m-home-a-d v-if="ad_list.length" :ad-data="ad_list" style="margin-top: 16px;"></z-m-home-a-d>
  </div>
</template>

<script>
import '../../../common/filters/home';
import ZMHomeLabel from './ZMHomeLabel';
import myMixins from '@/common/mixin/myMixins';
import ZMHomeAD from './ZMHomeAD'
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
      recId: 5,
      ad_list: []
      // bannerChapterContent: '流失之光工作室  |  更新至06话'
    };
  },
  components: {
    ZMHomeLabel,
    ZMHomeAD
  },
  created() {
    this.labelName = this.likeComicsData.name;
    this.recId = this.likeComicsData.rec_id || 5;
    this.likeComicsList = this.likeComicsData.cartoon_list;
    this.likeBannerData = this.likeComicsData.top || {};
    this.ad_list = this.likeComicsData.ad_list
  }
};
</script>

<style scoped lang="scss">
$like-fontSize: 18px;
$like-color: #222222;
$banner-font-color: #ffffff;
$banner-fontSize: 14px;
$banner-l-fontSize: 12px;
$chapter-color: #bbbbbb;
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
    background: url('../../../assets/img/defaultBanner.png') no-repeat;
    background-size: 100%;
    background-position: center;
    border-radius: 4px;
    &-img {
      position: absolute;
      color: $banner-font-color;
      font-size: $banner-fontSize;
      width: 240px;
      height: 60px;
      bottom: 4px;
      left: -8px;
      background: url('../images/title_bg.png') no-repeat;
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
        }
      }
    }
  }
  &-other {
    display: flex;
    justify-content: space-between;
    margin: 0 8px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
      width: 0 !important;
    }
    &-item {
      display: flex;
      flex-direction: column;
      margin: 0 4px;
      &-img {
        width: 109px;
        height: 145px;
        border-radius: 4px;
        padding: 4px 2px;
        background: url('../../../assets/img/defaultBook.png') no-repeat;
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
        font-size: 12px;
        color: $chapter-color;
      }
    }
  }
}
</style>
