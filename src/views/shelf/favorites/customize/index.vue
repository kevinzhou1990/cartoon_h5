<template>
  <div>
    <div class="main-container zm-b-b" v-for="item in customizeList" :key="item.group_id" @click="jumpDetails(item.group_id)" v-if="item.group_id">
      <div class="item-img bg" :style="{background: item.cover_url ? 'url('+item.cover_url+')' : '','background-size': '100%'}"></div>
      <div class="item-container">
        <div class="name ellipsis">{{item.name}}</div>
        <div class="collect-tip ellipsis">{{item.shelf_num}}本收藏</div>
      </div>
      <div class="more" @click.stop="more">
        <svg-icon icon-class="more_bc" size="small" />
      </div>
    </div>

    <div class="main-container">
      <div class="item-img">
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
import { getGroupList } from '@/common/api/shelf'
export default {
  name: 'customize',
  components: { SvgIcon },
  data() {
    return {
      customizeList: []
    };
  },
  mounted() {
    this.getGroup()
  },
  methods: {
    //跳转自定义收藏详情
    jumpDetails(id){
      this.$router.push({ path: '/favorites/' + id });
    },
    //获取自定义收藏列表
    async getGroup(){
      const data = await getGroupList();
      if (data.code === 0) {
        this.customizeList = data.data.list;
      } else {
        this.$toast(data.msg || '系统出错,请稍后重试');
      }
    },
    more(){
      console.log('跳转引导页')
    }
  }
};
</script>

<style lang="scss" scoped>
  $CONTAINERHEIGHT: 108px;
  $IMGWIDTH: 60px;
  $IMGHEIGHT: 76px;
  $PADDING: 16px;
  .main-container{
    position: relative;
    padding: $PADDING;
    font-family: PingFangSC-Semibold;
    height: calc(#{$CONTAINERHEIGHT} - #{$PADDING * 2});
    .item-img{
      width: $IMGWIDTH;
      height: $IMGHEIGHT;
      border-radius: 4px;
      float: left;
      position: relative;
      &:before {
        content: " ";
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
      background: url("../../../../assets/img/defaultBook.png") no-repeat;
    }
    .add {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .item-container{
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
      .collect-tip{
        width: 230px;
        color: #BBBBBB;
        margin-top: 8px;
        margin-left: -20px;
        transform: scale(0.83);
      }
    }
    .more {
      position: absolute;
      right: $PADDING;
      top: 50%;
      transform: translate(0%, -50%);
    }
  }

</style>
