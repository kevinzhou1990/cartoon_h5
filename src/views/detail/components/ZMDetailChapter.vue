/**
* @info: 追漫详情章节
* @author: PengGeng
* @date: 8/12/20-5:25 下午
*/
<template>
  <div class="main-chapter zm-b-radius" @click.prevent="handleComicsNewChapter">
    <div class="main-chapter-text">{{ statusText }}</div>
    <div class="main-chapter-info" v-if="detailNews">
      <span class="main-chapter-info-title">{{ detailNews.title || '--' }}</span>
      <span class="main-chapter-info-content">{{ detailNews.intro || '--' }}</span>
      <span class="main-chapter-info-time">{{ updateTimes }}</span>
      <span class="main-chapter-info-r">最近更新</span>
    </div>
  </div>
</template>

<script>
import { timestampToTime } from '@/lib/utils'
export default {
  name: 'ZMDetailChapter',
  props: {
    statusText: {
      type: String,
      default: ''
    },
    detailNews: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    updateTimes () {
      if (!this.detailNews.updated_at) return '--'
      return timestampToTime(this.detailNews.updated_at, 'date')
    }
  },
  methods: {
    /**
     * @info: 点击更新最新章节
     * @author: PengGeng
     * @date: 8/24/20-6:33 下午
     */
    handleComicsNewChapter() {
      this.$router.push({
		    path: '/reader',
		    query: {
			    cartoon_id: this.detailNews.cartoon_id,
			    capterId: this.detailNews.chapter_id
		    }
      })
      console.log('最新章节点击。。。。。');
    }
  }
};
</script>

<style scoped lang="scss">
$font-color: #bbbbbb !default;
@mixin font10px($font-color) {
  display: inline-block;
  font-size: 10px;
  color: $font-color;
  transform: scale(0.83);
  -webkit-transform-origin-x: 0;
}
.main-chapter {
  display: inline-block;
  margin: 24px 16px;
  height: 118px;
  width: 343px;
  align-content: center;
  &-text {
    box-sizing: border-box;
    font-size: 10px;
    margin: 16px 0 8px 16px;
    color: #bbbbbb;
    letter-spacing: 0;
    transform: scale(0.83);
    -webkit-transform-origin-x: 0;
  }
  &-info {
    display: flex;
    box-sizing: border-box;
    margin: 16px 0 8px 16px;
    width: 311px;
    height: 56px;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 12px;
    color: #222222;
    line-height: 56px;
    &-title {
      padding: 0 12px 0 16px;
      width: 47px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-content {
      box-sizing: content-box;
      padding: 0 16px 0 0;
      width: 48px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-time {
      @include font10px(#bbbbbb);
      /*max-width: 50px;*/
      /*padding: 0 19px 0 16px;*/
    }
    &-r {
      @include font10px(#12e079);
      &:after {
        display: inline-block;
        content: ' ';
        padding: 2px;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        background: url('../../../assets/img/more_chapter.png') no-repeat;
        background-size: 100%;
        transform: scale(0.83);
        -webkit-transform-origin-y: 0;
      }
    }
  }
}
</style>
