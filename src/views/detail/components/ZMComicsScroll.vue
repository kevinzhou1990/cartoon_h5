<template>
  <div class="main">
    <div class="main-title">{{ titleContent }}</div>
    <div class="main-img">
      <div class="main-img-content" v-for="index in 5" :key="index">
        <img class="main-img-content-img" src="../../../assets/img/defaultBook.png" alt />
        <span class="main-img-content-title">狐妖小红娘</span>
        <span class="main-img-content-chapter">更新至2998话</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMComicsScroll',
  props: {
    titleContent: {
      type: String,
      default: ''
    },
    imageList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  position: relative;
  padding: 20px 12px 20px 12px;
  font-weight: bold;
  overflow-y: hidden;
  margin: 0 auto;
  width: 100%;
  &-title {
    font-size: 18px;
    color: #222222;
    letter-spacing: 0;
  }
  &-img {
    display: flex;
    padding-top: 12px;
    margin-right: 2px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    &-content {
      display: flex;
      flex-flow: column;
      padding: 4px;
      &-img {
        padding: 4px 0;
        width: 90px;
        height: 120px;
        border-radius: 4px;
      }
      &-title {
        padding: 4px 0;
        font-size: 14px;
        color: #222222;
      }
      &-chapter {
        font-size: 10px;
        color: #bbbbbb;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
      }
    }
  }
}
</style>
