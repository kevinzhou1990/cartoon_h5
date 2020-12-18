/**
* 哇咔漫画列表样式（大图底下带漫画信息）
*/
<template>
  <div class="container" v-if="dataList.length" :class="flexWrap ? 'wrap-flex' : ''">
    <div
      v-for="item in dataList"
      :key="item.cartoon_id"
      class="main-content-item"
      @click="handleZMInfo(item.cartoon_id, refs, refId)"
    >
      <div class="update-tip" v-if="item.has_new && hasUpdate">更新</div>
      <span
        class="main-content-item-img"
        :style="{background: item.cover ? 'url('+item.cover+'), url(' + defaultLCover + ')' : '','background-size': '100%', 'background-repeat': 'no-repeat'}"
      ></span>
      <span class="main-content-item-title">{{ item.title }}</span>
      <span class="main-content-item-status" v-if="showStatus">{{ item.publish_status || item.status_text || '--'}}</span>
      <span class="main-content-item-status" v-if="showCollect">收藏 {{item.shelf_num_text || '--'}}</span>
    </div>
  </div>
</template>

<script>
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'commonList',
  mixins: [ myMixins ],
  props: {
    //正常布局还是横向布局
    flexWrap: {
      type: Boolean,
      default: true
    },
    //漫画来源
    refs: {
      type: String || Number,
      default: undefined
    },
    //漫画来源ID
    refId: {
      // type: String || Number,
      default: undefined
    },
    //漫画基本数据
    dataList: {
      type: Array,
      default: () => []
    },
    //是否显示'更新'角标提示
    hasUpdate: {
      type: Boolean,
      default: false
    },
    //显示收藏数（例：收藏 20）
    showCollect: {
      type: Boolean,
      default: false
    },
    //显示更新进度（例：更新至 第三话）
    showStatus: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
  .wrap-flex{
    flex-wrap: wrap;
    justify-content: flex-start!important;
  }

  .container {
    display: flex;
    justify-content: space-between;

    .main-content-item {
      font-family: 'pingfang-blod';
      font-size: 12px;
      display: flex;
      flex-direction: column;
      width: 109px;
      padding: 8px 4px;
      position: relative;

      .update-tip {
        width: 36px;
        height: 18px;
        line-height: 18px;
        background: #12e079;
        color: #FFFFFF;
        text-align: center;
        border-radius: 4px;
        position: absolute;
        top: 12px;
        right: 8px;
      }

      .main-content-item-img {
        height: 145px;
        width: 109px;
        border-radius: 4px;
        background-img: url('../../assets/img/defaultBook.png') no-repeat;
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
        padding-top: 2px;
        color: #bbbbbb;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
