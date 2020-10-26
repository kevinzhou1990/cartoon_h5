<template>
  <div class="main-content">
    <div class="main-content-img" :class="mainClass"></div>
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
	  /**
	   * @info: 底部文字
	   * @author: PengGeng
	   * @date: -12:03 下午
	   */
    textContent: {
      type: String,
      default: '没有找到匹配的结果～'
    },
	  /**
	   * @info: 不同的业务没有数据显示的是不同的图片
	   * @author: PengGeng
	   * @date: 10/26/20-11:53 上午
     * @ params type [String] 1.comment 评论; 2.collect 收藏 3.search 搜索 4.ranking 排行榜 5.history 历史
	   */
    type: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
.main-content {
  position: relative;
  text-align: center;
  padding: 0;
  margin: auto;
  font-family: 'pingfang-blod';
  font-size: 12px;
  &-text {
    margin-top: 8px;
    color: #999999;
  }
}
@mixin img-comm {
  display: inline-block;
  width: 160px;
  height: 160px;
}
.comment-content {
  @include img-comm;
  background: url('../../assets/img/no_comment.png') no-repeat;
  background-size: 100%;
  /*margin: 117px auto 8px;*/
}

.collect-content {
  @include img-comm;
  background: url('../../assets/img/no_collect.png') no-repeat;
  background-size: 100%;
  margin: 16px auto 0;
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
}

.history-content {
  @include img-comm;
  background: url('../../assets/img/no_history.png') no-repeat;
  background-size: 100%;
}
</style>
