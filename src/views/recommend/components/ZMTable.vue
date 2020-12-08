/**
* @info: 推荐漫画 table
* @author: PengGeng
* @date: 8/10/20-4:19 下午
*/
<template>
  <div class="main-content">
    <common-info
      :dataList = "dataList"
      refs = 4
      showStatus
    ></common-info>
  </div>
</template>

<script>
import myMixins from '@/common/mixin/myMixins'
import commonInfo from '@/common/components/WKTableItem'
export default {
  name: 'ZMTable',
  mixins: [myMixins],
  components: { commonInfo },
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
};
</script>

<style scoped lang="scss">
@mixin chapterSize {
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
      font-size: 14px;
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
