<template>
  <div class="history-main">
    <div class="label">
      <span>历史记录</span>
      <span>删除</span>
    </div>
    <div class="content">
      <div class="content-bg" v-for="index in 6" :key="index">
        <span>抢爷异闻录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMHistoryList'
}
</script>

<style scoped lang="scss">
  $label-fontSize: 12px;
  $label-color: #999999;
  $content-color: #222222;
.history-main {
  position: relative;
  overflow: hidden;
  font-family: 'pingfang-blod';
  padding: 24px 8px 0 8px;
  font-size: 12px;
  color: $label-color;
  .label {
    display: flex;
    padding: 0 8px;
    justify-content: space-between;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    margin: 16px auto;
    &-bg {
      margin: 8px;
      /*max-width: 150px;*/
      height: 36px;
      line-height: 36px;
      background: #F5F5F5;
      border-radius: 18px;
      text-align: center;
      span {
        display: block;
        box-sizing: content-box;
        max-width: 118px;
        padding: 0 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        white-space: nowrap;
        color: $content-color;
        font-size: $label-fontSize;
      }
    }
  }
}
</style>
