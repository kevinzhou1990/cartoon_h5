<template>
  <div class="main-content" :class="`${ mainClass }`">
    <div class="img"></div>
    <p class="main-content-text">{{ textContent }}</p>
  </div>
</template>

<script>
export default {
  name: 'noData',
  computed: {
    mainClass() {
      if (this.type){
        return `${this.type}-content`;
      }
    }
  },
  props: {
    textContent: {
      type: String,
      default: '没有找到匹配的结果～'
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
    margin-top: 8px;
    font-family: 'pingfang-blod';
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
    margin: 80px auto 8px;
  }
}

.collect-content {
  .img {
    background: url('../../assets/img/no_collect.png') no-repeat;
    background-size: 100%;
    width: 120px;
    height: 120px;
    margin: 16px auto 0;
  }
}

.ranking-content {
  .img {
    background: url('../../assets/img/chapterFull.png') no-repeat;
    background-size: 100%;
    width: 120px;
    height: 120px;
    margin: 120px auto 0;
  }
}

.history-content {
  .img {
    background: url('../../assets/img/no_collect.png') no-repeat;
    background-size: 100%;
    width: 120px;
    height: 120px;
    margin: 144px auto 0;
  }
}
</style>
