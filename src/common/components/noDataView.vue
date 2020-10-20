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

  .img {
    width: 160px;
    height: 160px;
  }
}

.comment-content {
  height: 500px;

  .img {
    background: url('../../assets/img/no_comment.png') no-repeat;
    background-size: 100%;
    margin: 117px auto 8px;
  }
}

.collect-content {
  .img {
    background: url('../../assets/img/no_collect.png') no-repeat;
    background-size: 100%;
    margin: 16px auto 0;
  }
}

.ranking-content {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  .img {
    background: url('../../assets/img/chapterFull.png') no-repeat;
    background-size: 100%;
  }
}

.history-content {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  .img {
    background: url('../../assets/img/no_history.png') no-repeat;
    background-size: 100%;
  }
}
</style>
