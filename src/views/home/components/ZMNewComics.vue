/**
* @info: 追漫首页-新漫控件
* @author: PengGeng
* @date: 8/4/20-3:17 下午
*/
<template>
  <div class="new-main">
    <span class="new-main-label">{{ newComicsName }}</span>
    <div class="new-main-content">
      <div
        class="new-main-content-item"
        v-for="item in newComicsList"
        :key="item.cartoon_id"
        @click="handleZMInfo(item.cartoon_id, 2, recId)"
      >
        <div class="new-main-content-item-img" :style="{ background: 'url('+item.cover+'), url(' + defaultCover + ') no-repeat', 'background-size': '100%'}">
          <div class="new-main-content-item-img-text">
            <div class="content">{{ item.on_time || '待上架' }}</div>
          </div>
        </div>
        <span class="new-main-content-item-title">{{ item.title }}</span>
        <span class="new-main-content-item-author">{{ item.author | authorFormate }}</span>
        <span class="new-main-content-item-des">{{ item.intro }}</span>
      </div>
    </div>
    <z-m-home-a-d v-if="ad_list.length" :ad-data="ad_list"></z-m-home-a-d>
  </div>
</template>

<script>
import '../../../common/filters/home';
import myMixins from '@/common/mixin/myMixins';
import ZMHomeAD from './ZMHomeAD'
export default {
  name: 'ZMNewComics',
  mixins: [myMixins],
  components: {
    ZMHomeAD
  },
  props: {
    newCamicsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newComicsName: '新漫即将抵达',
      newComicsList: [],
      recId: 1,
      ad_list: []
    };
  },
  created() {
    this.newComicsName = this.newCamicsData.name;
    this.newComicsList = this.newCamicsData.cartoon_list;
    this.recId = this.newCamicsData.rec_id || 1
    this.ad_list = this.newCamicsData.ad_list
  },
  methods: {}
};
</script>

<style scoped lang="scss">
$label-color: #222222;
$label-fontSize: 16px;
.new-main {
  position: relative;
  width: 100%;
  &-label {
    display: flex;
    font-size: $label-fontSize;
    color: $label-color;
    font-weight: bold;
    padding: 12px 0 6px 16px;
    letter-spacing: 0;
  }
  &-content {
    display: flex;
    margin: 6px 8px 20px 8px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 0 !important;
      display: none;
    }
    &-item {
      display: flex;
      flex-direction: column;
      width: 152px;
      padding: 0 8px;
      &-img {
        position: relative;
        width: 152px;
        height: 152px;
        background-img: url('../../../assets/img/newDefaultBook.png') no-repeat;
        background-size: 100%;
        border-radius: 4px;
        background-position: center;
        &-text {
          display: block;
          font-family: pingfang-blod;
          width: 152px;
          height: 40px;
          font-size: 14px;
          color: #ffffff;
          text-align: center;
          padding-top: 112px;
          & > .content {
            display: block;
            height: 40px;
            line-height: 50px;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%);
            border-radius: 0 0 4px 4px;
          }
        }
      }
      &-title {
        display: block;
        padding-top: 4px;
        font-size: 14px;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-author {
        display: inline-block;
        font-size: 10px;
        color: #bbbbbb;
        font-weight: bold;
        letter-spacing: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-des {
        font-size: 12px;
        color: #999999;
        font-weight: bold;
        overflow: hidden;
        /*!*word-break: break-word;*!*/
        text-overflow: ellipsis;
        display: -webkit-box;
        /*white-space: nowrap;*/
        -webkit-line-clamp: 2;
        /*! autoprefixer: off *!*/
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
