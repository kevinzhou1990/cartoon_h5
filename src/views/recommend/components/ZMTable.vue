<template>
  <div class="main-content">
    <div style="display: flex; flex-flow: row wrap;">
      <div class="main-content-item" v-for="index in 7" :key="index">
        <img class="main-content-item-img" src="@/assets/img/defaultBook.png">
        <span class="main-content-item-title">黑色放音机全哈哈哈哈</span>
        <span class="main-content-item-chapter">更新至290话</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMTable.vue'
}
</script>

<style scoped lang="scss">
  @mixin chapterSize {
    font-weight: bold;
    color: #BBBBBB;
    font-size: 10px;
    transform: scale(0.83);
    -webkit-transform-origin: 0;
  }
.main-content {
  position: relative;
  width: auto;
  padding: 16px 12px;
  /*display: flex;*/
  &-item {
    display: flex;
    flex-direction: column;
    width: 109px;
    padding: 8px 4px;
    &-img {
      height: 145px;
      border-radius: 4px;
    }
    &-title {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-chapter {
      @include chapterSize
    }
  }
}
</style>
