<template>
  <div class="main-content" :class="[type === 'comment' ? 'comment-content' : type === 'collect' ? 'collect-content' : type === 'ranking' ? 'chapter-content' : '']">
    <div class="img"></div>
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
};
</script>

<style scoped lang="scss">
.main-content {
  text-align: center;
  overflow: hidden;

  &-text {
    padding: 16px 0;
    font-weight: bold;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    text-align: center;
  }
}

.comment-content {
  height: 500px;

  .img {
    background: url('../../assets/img/no_comment.png') no-repeat;
    background-size: 100%;
    width: 180px;
    height: 180px;
    margin: 80px auto;
  }
}

.collect-content {
  .img {
    background: url('../../assets/img/no_collect.png') no-repeat;
    background-size: 100%;
    width: 120px;
    height: 120px;
    margin: 16px auto;
  }
}

.chapter-content {
  .img {
    background: url('../../assets/img/chapterFull.png') no-repeat;
    background-size: 100%;
    width: 120px;
    height: 120px;
    margin: 120px auto 8px;
  }
}
</style>
