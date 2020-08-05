/**
* @info:
* @author: PengGeng
* @date: 8/4/20-4:29 下午
*/
<template>
  <div class="hot-main">
    <z-m-home-label :label-name="labelName" @hot-more="handelClickHotMore"></z-m-home-label>
    <div class="hot-main-content">
      <div class="hot-main-content-item" v-for="index in 6" :key="index">
        <span class="hot-main-content-item-img"></span>
        <span class="hot-main-content-item-title">黑色放音机全黑色放音机全</span>
        <span class="hot-main-content-item-chapter">更新至290话</span>
      </div>
    </div>
    <div class="hot-main-btn">
      <span class="hot-main-btn-content">换一批</span>
    </div>
  </div>
</template>

<script>
import ZMHomeLabel from './ZMHomeLabel'

export default {
  name: 'ZMHotComics',
  data() {
    return {
      labelName: '七月热番'
    }
  },
  components: {
    ZMHomeLabel
  },
  methods: {
    /**
     * @info: 热番更多
     * @author: PengGeng
     * @date: 8/5/20-11:52 上午
     */
    handelClickHotMore() {
      console.log('点击了更多！')
    }
  }
}
</script>

<style scoped lang="scss">
  $main-color: #222222;
  $main-fontSize: 18px;
  $title-fontSize: 14px;
  $chapter-color: #BBBBBB;
  $chapter-fontSize: 10px;
  .hot-main {
    position: relative;
    padding: 20px 8px;
    color: $main-color;
    font-size: $main-fontSize;

    &-content {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 12px 8px 8px 0px;

      &-item {
        width: 109px;
        display: flex;
        padding: 4px 0 4px 8px;
        flex-direction: column;

        &-img {
          width: 109px;
          height: 145px;
          background: url("../images/headerBg.png") no-repeat;
          background-size: cover;
          /*padding: 8px;*/
          border-radius: 4px;
          margin-bottom: 4px;
        }

        &-title {
          padding: 4px 0 2px 0;
          font-size: $title-fontSize;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &-chapter {
          padding: 2px 0 8px 0;
          font-size: $chapter-fontSize;
          transform: scale(0.83);
          -webkit-transform-origin-x: 0;
          color: $chapter-color;
          font-weight: bold;
        }
      }
    }

    &-btn {
      display: flex;
      justify-content: center;

      &-content {
        width: 160px;
        height: 44px;
        text-align: center;
        border: 1px solid #12E079;
        border-radius: 22px;
        line-height: 44px;
        font-size: 12px;
        color: #12E079;
        font-weight: bold;

        &:before {
          display: inline-block;
          content: '';
          margin-right: 4px;
          margin-bottom: 2px;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          background: url("../images/replace.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }
</style>
