/**
* @info: 推荐漫画 table
* @author: PengGeng
* @date: 8/10/20-4:19 下午
*/
<template>
  <div class="main-content">
    <div style="display: flex; flex-flow: row wrap;">
      <div
        class="main-content-item"
        v-for="item in dataList"
        :key="item.cartoon_id"
        @click.stop="handleZMInfo(item.cartoon_id, 4)"
      >
        <span
          class="main-content-item-img"
          :style="{background: 'url('+item.cover+')','background-size': 'contain'}"
        ></span>
        <span class="main-content-item-title">{{ item.title }}</span>
        <span class="main-content-item-chapter">{{ item.publish_status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMTable',
  mixins: [myMixins],
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    /**
     * @info: TODO 去漫画详情
     * @author: PengGeng
     * @date: 8/11/20-10:01 上午
     */
    handleClickInfo(val) {
      console.log('go to comics info......', val);
      this.$router.push({
        path: '/detail',
        query: {
          cartoon_id: val
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@mixin chapterSize {
  font-weight: bold;
  color: #bbbbbb;
  font-size: 12px;
  /*transform: scale(0.83);*/
  /*-webkit-transform-origin: 0;*/
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
      width: 109px;
      border-radius: 4px;
      background: url('../../../assets/img/defaultBook.png') no-repeat;
      background-size: 100%;
    }

    &-title {
      display: inline-block;
      padding: 8px 0 2px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-chapter {
      padding: 2px 0 8px 0;
      @include chapterSize;
    }
  }
}
</style>
