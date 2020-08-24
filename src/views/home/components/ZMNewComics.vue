/**
* @info: 追漫首页-新漫控件
* @author: PengGeng
* @date: 8/4/20-3:17 下午
*/
<template>
  <div class="new-main">
  <span class="new-main-label">{{ newComicsName }}</span>
    <div class="new-main-content">
      <div class="new-main-content-item"
           v-for="item in newComicsList"
           :key="item.cartoon_id"
           @click="handleZMInfo(item.cartoon_id)"
      >
        <span class="new-main-content-item-img" :style="{background: 'url('+item.cover+')'}"></span>
        <span class="new-main-content-item-title">{{ item.title }}</span>
        <span class="new-main-content-item-author">{{ item.author | authorFormate }}</span>
        <span class="new-main-content-item-des">{{ item.intro }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../common/filters/home'
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMNewComics',
  mixins: [myMixins],
  props: {
    newCamicsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newComicsName: '新漫即将抵达',
      newComicsList: []
    }
  },
  created() {
    this.newComicsName = this.newCamicsData.name
    this.newComicsList = this.newCamicsData.cartoon_list
  },
  methods: {}
}
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
  ::-webkit-scrollbar { width: 0 !important }
  &-content {
    display: flex;
    margin: 6px 8px 20px 8px;
    overflow-x: scroll;
    &-item {
      display: flex;
      flex-direction: column;
      width: 152px;
      padding: 0 8px;
      &-img {
        width: 152px;
        height: 152px;
        background: url("../images/newDefaultBook.png") no-repeat;
        background-size: 100%;
        border-radius: 4px;
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
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        font-size: 10px;
        color: #BBBBBB;
        font-weight: bold;
        letter-spacing: 0;
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
