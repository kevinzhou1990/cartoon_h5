/**
* @info: 搜索推荐
* @author: PengGeng
* @date: 10/12/20-4:50 下午
*/
<template>
  <div class="recommend-main">
    <div class="recommend-main-text">为你推荐</div>
    <div class="recommend-main-content">
      <div class="recommend-main-content-item"
           v-for="item in recommendList"
           :key="item.cartoon_id"
           @click.stop="handleClickInfo(item.cartoon_id)"
      >
        <div class="recommend-main-content-item-img"
             :style="{background: 'url('+item.cover+'), url(' + defaultLCover + ') no-repeat center / contain'}"
        ></div>
        <span class="recommend-main-content-item-info">
          {{ item.title }}</span>
        <span class="recommend-main-content-item-author">
          {{ item.author|authorFormate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMSearchRecommend',
  mixins: [myMixins],
  props: {
	  recommendList: {
		  type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
	  handleClickInfo(val) {
		  this.handleZMInfo(val, 4)
    }
  }
}
</script>

<style scoped lang="scss">
.recommend-main {
  position: relative;
  padding: 16px 0 30px 12px;
  width: auto;
  margin-bottom: 30px;
  font-family: pingfang-blod;
  &-text {
    display: inline-block;
    color: #999999;
    /*padding: 14px 0;*/
    font-size: 12px;
    margin-bottom: 14px;
  }
  &-content {
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
      width: 0!important;
    }
    &-item {
      display: flex;
      flex-direction: column;
      margin: auto 4px;
      width: 90px;
      &-img {
        width: 90px;
        height: 120px;
        border-radius: 4px;
        background: url("../../../assets/img/defaultLBook.png") no-repeat center;
        background-size: contain !important;
      }
      &-info {
        font-size: 14px;
        padding: 8px 0 4px 0;
        color: #222222;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-word;
      }
      &-author {
        font-size: 12px;
        color: #BBBBBB;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-word;
        /*transform: scale(0.83);*/
        /*-webkit-transform-origin-x: 0;*/
      }
    }
  }
}
</style>
