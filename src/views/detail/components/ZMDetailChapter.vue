/**
* @info: 追漫详情章节
* @author: PengGeng
* @date: 8/12/20-5:25 下午
*/
<template>
  <div class="main-chapter zm-b-radius">
    <div class="main-chapter-text">更新至234话 / 每周六更新</div>
    <div class="main-chapter-info">
      <span style="padding: 0 12px 0 16px;">#234</span>
      <span style="padding: 0 16px 0 12px;">那年夏天</span>
      <span class="main-chapter-info-time">2020/8/20</span>
      <span class="main-chapter-info-r">最近更新</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMDetailChapter'
}
</script>

<style scoped lang="scss">
  $font-color: #BBBBBB !default;
  @mixin font10px($font-color) {
    display: inline-block;
    font-size: 10px;
    color: $font-color;
    transform: scale(0.83);
    -webkit-transform-origin-x: 0;
  }
  .main-chapter {
    display: inline-block;
    margin: 24px 16px;
    height: 118px;
    width: 343px;
    align-content: center;
    &-text {
      box-sizing: border-box;
      font-size: 10px;
      margin: 16px 0 8px 16px;
      color: #BBBBBB;
      letter-spacing: 0;
      transform: scale(0.83);
      -webkit-transform-origin-x: 0;
    }
    &-info {
      box-sizing: border-box;
      margin: 16px 0 8px 16px;
      width: 311px;
      height: 56px;
      background: #F5F5F5;
      border-radius: 4px;
      font-size: 12px;
      color: #222222;;
      line-height: 56px;
      &-time {
        @include font10px(#BBBBBB);
        padding: 0 19px 0 16px;
      }
      &-r {
        @include font10px(#12E079);
        &:after {
          display: inline-block;
          content: ' ';
          padding: 2px;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          background: url("../../../assets/img/more_chapter.png") no-repeat;
          background-size: 100%;
          transform: scale(0.83);
          -webkit-transform-origin-y: 0;
        }
      }
    }
  }
</style>
