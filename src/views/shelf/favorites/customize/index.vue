<template>
  <div class="container">
    <div class="main-container zm-b-b" v-for="item in customizeList" :key="item.group_id" @click="jumpDetails(item.group_id)" v-if="item.group_id">
      <div
        class="bg-container bg"
        :style="{
          background: item.cover_url ? 'url(' + item.cover_url + '), url(' + defaultGroup + ')' : '',
          'background-size': '100%'
        }"
      ></div>
      <div class="item-container">
        <div class="name ellipsis">{{ item.name }}</div>
        <div class="collect-tip ellipsis">{{ item.shelf_num }}本收藏</div>
      </div>
      <div class="more" @click.stop="jumpDownloadPage">
        <svg-icon icon-class="more_bd" size="small" />
      </div>
    </div>

    <div class="main-container" v-if="customizeList.length >= 11">
      <div class="bg-container" data-type="new">
        <div class="add">
          <svg-icon icon-class="add_bb" />
        </div>
      </div>
      <div class="item-container">
        <div class="full-name">收藏夹数量已满</div>
      </div>
    </div>

    <div class="main-container" v-else @click="jumpDownloadPage">
      <div class="bg-container" data-type="new">
        <div class="add">
          <svg-icon icon-class="add_aa" />
        </div>
      </div>
      <div class="item-container">
        <div class="name">新建收藏夹</div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'customize',
  components: { SvgIcon },
  mixins: [ myMixins ],
  props: {
    customizeList: {
      type: Array
    }
  },
  data() {
    return {
      defaultGroup: require('../../../../assets/img/default_group.png')
    };
  },
  methods: {
    //跳转自定义收藏详情
    jumpDetails(id) {
      this.$router.push({ path: '/favorites/' + id });
    }
  }
};
</script>

<style lang="scss" scoped>
$CONTAINERHEIGHT: 108px;
$IMGWIDTH: 60px;
$IMGHEIGHT: 76px;
$PADDING: 16px;
.container {
  padding-top: 8px;

  .main-container {
    position: relative;
    padding: $PADDING;
    font-family: 'pingfang-blod';
    height: calc(#{$CONTAINERHEIGHT} - #{$PADDING * 2});

    .bg-container {
      width: $IMGWIDTH;
      height: $IMGHEIGHT;
      border-radius: 4px;
      float: left;
      position: relative;

      &[data-type=new]:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 199%;
        border: 1px solid #eeeeee;
        height: 199%;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-radius: 8px;
      }
    }

    .bg {
      background-image: url('../../../../assets/img/default_group.png');
    }

    .add {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .item-container {
      position: absolute;
      top: 50%;
      left: calc(#{$PADDING} * 2 + #{$IMGWIDTH});
      transform: translate(0%, -50%);

      .ellipsis {
        max-width: 230px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }

      .name {
        font-size: 14px;
        color: #222222;
      }

      .full-name {
        font-size: 14px;
        color: #e6e6e6;
      }

      .collect-tip {
        width: 230px;
        color: #bbbbbb;
        margin-top: 8px;
        /*transform: scale(0.83);*/
      }
    }

    .more {
      position: absolute;
      right: $PADDING;
      top: 50%;
      transform: translate(0%, -50%);
    }
  }
}
</style>
