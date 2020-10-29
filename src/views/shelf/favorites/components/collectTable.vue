<template>
  <div class="main-content">
    <template v-if="dataList.length">
      <div class="container">
        <div
          class="main-content-item"
          v-for="item in dataList"
          :key="item.cartoon_id"
          @click="handleZMInfo(item.cartoon_id, ref, refId)"
        >
          <div class="update-tip" v-if="item.has_new && type === 'myCollect'">更新</div>
          <span
            class="main-content-item-img"
            :style="{background: item.cover ? 'url('+item.cover+')' : '','background-size': '100%'}"
          ></span>
          <span class="main-content-item-title">{{ item.title }}</span>
          <span class="main-content-item-status" v-if="type === 'myCollect'">{{ item.publish_status }}</span>
          <span class="main-content-item-status" v-else>收藏 {{item.shelf_num_text}}</span>
        </div>
      </div>
      <div class="container-end" v-if="type !== 'myCollect' || dataList.length > 5">不要再扯了，真的没有了～</div>
    </template>

    <no-data-view v-else type="collect" class="no-data" textContent="你还一本漫画都没有收藏哦～"></no-data-view>
  </div>
</template>

<script>
import noDataView from '@/common/components/noDataView';
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'collectTable',
  mixins: [ myMixins ],
  components: { noDataView },
  props: {
    type: {
      type: String,
      default: ''
    },
    refId: {
      type: String || Number,
      default: undefined
    },
    dataList: {
      type: Array
    }
  },
  computed: {
    ref(){
      let arr = {
        'myCollect': 5,
        'hotCollect': 4
      };

      return arr[this.type]
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
    .container{
      display: flex;
      flex-flow: row wrap;
      .main-content-item {
        font-family: 'pingfang-blod';
        display: flex;
        flex-direction: column;
        width: 109px;
        padding: 8px 4px;
        position: relative;
        .update-tip{
          width: calc(36px / 0.83);
          height: calc(18px / 0.83);
          line-height: calc(18px / 0.83);
          background: #12e079;
          color: #FFFFFF;
          text-align: center;
          border-radius: 2px;
          transform: scale(0.83);
          position: absolute;
          top: 12px;
          right: 8px;
        }
        .main-content-item-img {
          height: 145px;
          width: 109px;
          border-radius: 4px;
          background: url('../../../../assets/img/defaultBook.png') no-repeat;
          background-size: 100%;
        }
        .main-content-item-title {
          font-size: 14px;
          display: inline-block;
          padding: 8px 0 2px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .main-content-item-status {
          padding: 2px 0 8px 0;
          color: #bbbbbb;
          width: 120%;
          transform: scale(0.83);
          -webkit-transform-origin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .container-end{
      color: #BBBBBB;
      margin: 40px auto;
      text-align: center;
      transform: scale(0.83);
    }
  }
</style>
