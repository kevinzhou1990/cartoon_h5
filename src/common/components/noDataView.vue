<template>
  <div class="main-content">
    <div class="main-content-container">
      <div class="main-content-img" :class="mainClass"></div>
      <p class="main-content-text">{{ textContent }}</p>
    </div>
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
    //底部文字
    textContent: {
      type: String,
      default: '没有找到匹配的结果～'
    },
    //对应缺省图片
    type: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
$IMGHEIGHT: 160px;
$TEXTHEIGHT: 17px;
$MARGINTOP: 8px;

.main-content {
  position: relative;
  text-align: center;
  padding: 0;
  margin: auto;
  font-family: 'pingfang-blod';
  font-size: 12px;
  height: 100%;
  min-height: calc(#{$IMGHEIGHT + $TEXTHEIGHT + $MARGINTOP});
  &-container{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  }
  &-text {
    margin-top: $MARGINTOP;
    color: #999999;
  }
}
@mixin img-comm {
  width: 160px;
  height: $IMGHEIGHT;
}
.comment-content {
  @include img-comm;
  background: url('../../assets/img/no_comment.png') no-repeat;
  background-size: 100%;
}

.collect-content {
  @include img-comm;
  background: url('../../assets/img/no_collect.png') no-repeat;
  background-size: 100%;
}

.search-content {
  @include img-comm;
  background: url('../../assets/img/no_search.png') no-repeat;
  background-size: 100%;
}
.ranking-content {
  @include img-comm;
  background: url('../../assets/img/chapterFull.png') no-repeat;
  background-size: 100%;
  /*margin-top: 226px;*/
}

.history-content {
  @include img-comm;
  background: url('../../assets/img/no_history.png') no-repeat;
  background-size: 100%;
}
</style>
