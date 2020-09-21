<template>
  <div>
    <div class="main-container zm-b-b" v-for="item in customizeList" :key="item.id">
      <div class="item-img bg" :style="{background: item.bg ? 'url('+item.bg+')' : '','background-size': '100%'}"></div>
      <div class="item-container">
        <div class="name">{{item.name}}</div>
        <div class="collect-tip">{{item.count}}本收藏</div>
      </div>
      <div class="more">
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
export default {
  name: 'customize',
  components: { SvgIcon },
  data() {
    return {
      customizeList: [
        {
          id: 0,
          name: '我的最爱',
          count: 10,
          bg: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png'
        },
        {
          id: 1,
          name: '自定义1',
          count: 2,
          bg: ''
        },
        {
          id: 2,
          name: '自定义2',
          count: 20,
          bg: ''
        }
      ]

    };
  },
  methods: {

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
      background: #f5f5f5;
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
      .name {
        font-size: 14px;
        color: #222222;
      }
      .collect-tip{
        color: #BBBBBB;
        margin-top: 8px;
        margin-left: -0.1408rem;
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
