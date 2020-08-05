/**
* @info: 追漫首页-新漫控件
* @author: PengGeng
* @date: 8/4/20-3:17 下午
*/
<template>
  <div class="new-main">
    <span class="new-main-label">{{ newComics }}</span>
    <div class="new-main-content">
      <div class="new-main-content-item" v-for="index in 10" :key="index">
        <span class="new-main-content-item-img"></span>
        <span class="new-main-content-item-title">黑白放映机</span>
        <span class="new-main-content-item-author">陈俊滨</span>
        <span class="new-main-content-item-des">欢迎来到这神秘又诡异的放映厅，入座后即将开始放</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMNewComics',
  data() {
    return {
      newComics: '新漫即将抵达'
    }
  }
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
  &-content {
    display: flex;
    padding: 6px 8px 20px 8px;
    overflow: scroll;
    &-item {
      display: flex;
      flex-direction: column;
      width: 152px;
      padding: 0 8px;
      &-img {
        width: 152px;
        height: 152px;
        background: url("../images/headerBg.png") no-repeat;
        background-size: 100%;
        border-radius: 4px;
      }
      &-title {
        margin-top: -5px;
        font-size: 14px;
        font-weight: bold;
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
        /*!*! autoprefixer: off *!*/
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
