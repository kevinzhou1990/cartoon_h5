<template>
  <div class="main-content">
    <div class="main-content-img" :class="[type === 'comment' ? 'main-content-comment-img' : '']"></div>
    <span class="main-content-text">{{ textContent }}</span>
  </div>
</template>

<script>
export default {
  name: 'noData',
  props: {
    textContent: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  .main-content {
    height: 500px;
    text-align: center;
    overflow: hidden;
    &-img {
      width: 180px;
      height: 180px;
      margin: 0 auto;
    }
    &-comment-img {
      background: url("../../assets/img/no_comment.png") no-repeat;
      margin-top: 80px;
      background-size: 100%;
    }

    &-text {
      padding: 16px 0;
      font-weight: bold;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
    }
  }
</style>
