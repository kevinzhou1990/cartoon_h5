/**
* @info: 搜索推荐
* @author: PengGeng
* @date: 10/12/20-4:50 下午
*/
<template>
  <div class="recommend-main">
    <div class="recommend-main-text">为你推荐</div>
    <div class="recommend-main-content">
      <div class="recommend-main-content-item" v-for="index in 6" :key="index">
        <div class="recommend-main-content-item-img"></div>
        <span class="recommend-main-content-item-info">狐妖小红娘</span>
        <span class="recommend-main-content-item-author">半仙小鸡</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMSearchRecommend'
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
        background: url("../../../assets/img/defaultBook.png") no-repeat center;
        background-size: 100%;
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
        font-size: 10px;
        transform: scale(0.83);
        color: #BBBBBB;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-word;
        -webkit-transform-origin-x: 0;
      }
    }
  }
}
</style>
