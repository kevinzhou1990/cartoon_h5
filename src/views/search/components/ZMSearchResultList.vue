<template>
  <div class="list-main">
    <span class="list-result">找到3本相关的</span>
    <div class="list-main-content zm-b-b" v-for="index in 4" :key="index">
      <div class="list-main-content-img"></div>
      <div class="list-main-content-text">
        <span class="title">隐秘的角落</span>
        <div class="chapter">
          <span class="chapter-author">一二先生</span>
          <span class="chapter-num">更新至2910话</span>
        </div>
        <div class="list-main-content-text-label">
          <span
              class="s-border"
              :class="{'m-l8' : index > 1}"
              v-for="index in 4"
              :key="index"
          >
            悬疑
          </span>
        </div>
        <span class="list-main-content-text-com">小刀刀工作室</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMSearchResultList'
}
</script>

<style scoped lang="scss">
.m-l8 {
  margin-left: 8px;
}
.list-main {
  position: relative;
  display: inline-block;
  overflow: auto;
  margin-top: 58px;
  padding: 8px 0 16px 16px;
  font-family: pingfang-blod;
  .list-result {
    display: inline-block;
    color: #999999;
    padding-top: 24px;
    font-size: 12px;
  }
  &-content {
    display: flex;
    height: 96px;
    padding: 16px 0;
    &-img {
      height: 96px;
      width: 72px;
      border-radius: 4px;
      background: url("../../../assets/img/defaultBook.png") no-repeat center;
      background-size: 100%;
    }
    &-text {
      margin: 8px 0 8px 8px;
      display: flex;
      flex-direction: column;
      font-size: 10px;
      width: 263px;
      .title {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: nowrap;
      }
      .chapter {
        display: inline-block;
        width: 317px;
        line-height: 14px;
        color: #BBBBBB;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        &-author {
          display: inline-block;
          vertical-align: middle;
          margin-right: 16px;
          max-width: 207px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          white-space: nowrap;
        }
        &-num {
          display: inline-block;
          max-width: 90px;
          overflow: hidden;
          vertical-align: middle;
          text-overflow: ellipsis;
          word-break: break-word;
          white-space: nowrap;
        }
      }
      &-label {
        margin: 4px 0;
        color: #BBBBBB;
        font-size: 10px;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        .s-border {
          display: inline-block;
          min-width: 32px;
          padding: 2px;
          height: 20px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 4px;
          text-align: center;
          line-height: 20px;
        }
      }
      &-com {
        font-size: 10px;
        width: 317px;
        color: #BBBBBB;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: nowrap;
      }
    }
  }
}

</style>
