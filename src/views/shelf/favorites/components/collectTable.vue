<template>
  <div class="main-content">
    <template v-if="dataList.length">
      <common-info
        :dataList = "dataList"
        :refs = "refs"
        :refId = "refId"
        :showCollect = "type === 'hotCollect'"
        :showStatus = "type === 'myCollect'"
        :hasUpdate = "type === 'myCollect'"
      ></common-info>

      <div class="container-end" v-if="type !== 'myCollect' || dataList.length > 5">不要再扯了，真的没有了～</div>
    </template>

    <no-data-view v-else type="history" class="no-data" textContent="一本漫画也没有哦～"></no-data-view>
  </div>
</template>

<script>
import noDataView from '@/common/components/noDataView';
import myMixins from '@/common/mixin/myMixins';
import commonInfo from '@/common/components/WKTableItem'
export default {
  name: 'collectTable',
  mixins: [ myMixins ],
  components: { noDataView, commonInfo },
  props: {
    type: {
      type: String,
      default: ''
    },
    refs: {
      default: undefined
    },
    refId: {
      type: String,
      default: undefined
    },
    dataList: {
      type: Array
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped lang="scss">
  .main-content {
    position: relative;
    width: auto;
    padding: 0 12px 16px;

    .container-end{
      color: #BBBBBB;
      margin: 40px auto;
      text-align: center;
    }

    .no-data{
      touch-action: none;
      height: calc(100vh - 76px);
    }
  }
</style>
