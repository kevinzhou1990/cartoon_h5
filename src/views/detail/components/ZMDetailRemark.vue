/**
* @info: 追漫详情评论
* @author: PengGeng
* @date: 8/12/20-5:25 下午
*/
<template>
  <div class="main-remark">
    <div class="remark-title">
      <span style="font-size: 18px;">漫画评论区</span>
      <span class="remark-title-num">{{ commentNum || 0 }}</span>
    </div>
    <div class="remark-content zm-b-radius" v-if="remarkData">
      <div class="remark-content-top">
        <img src="../images/share.png" class="remark-content-top-img" />
        <span style="padding: 0 16px; white-space: nowrap;">{{ remarkData.nickname }}</span>
        <span class="remark-content-top-time">{{ remarkData.created_at }}</span>
        <img class="remark-content-top-like" src="../images/glike.png" alt />
        <span class="remark-content-top-num">{{ remarkData.praise_num }}</span>
      </div>
      <div style="padding: 0 16px 0 53px;">{{ remarkData.content }}</div>
    </div>
    <div class="no-remark" v-else>
      <div class="no-remark-text">发表首条评论，沙发就是你的～</div>
      <div class="btn" @click="handleClickRemark">我要评论</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMDetailRemark',
  props: {
    commentNum: {
      type: Number,
      default: 0
    },
    remarkData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isRemarkData: false
    };
  },
  methods: {
    /**
     * @info: TODO 点击我要评论
     * @author: PengGeng
     * @date: 8/12/20-7:04 下午
     */
    handleClickRemark() {
      console.log('click remark btn go to remark......');
    }
  }
};
</script>

<style scoped lang="scss">
$font-color: #bbbbbb !default;
@mixin font10px($font-color) {
  color: $font-color;
  font-size: 10px;
  transform: scale(0.83);
  -webkit-transform-origin-x: 0;
}
.main-remark {
  position: relative;
  font-size: 12px;
  color: #222222;
  font-weight: bold;
  padding-bottom: 20px;
  .remark-title {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    &-num {
      position: absolute;
      right: 12px;
      color: #bbbbbb;
      font-size: 10px;
      line-height: 26px;
      transform: scale(0.83);
      -webkit-transform-origin-x: 0;
      margin-right: 4px;
      &:after {
        display: inline-block;
        content: ' ';
        margin-left: 4px;
        width: 16px;
        height: 16px;
        background: url('../../../assets/img/more.png') no-repeat;
        background-size: 100%;
        vertical-align: middle;
      }
    }
  }
  .remark-content {
    display: inline-block;
    width: 343px;
    height: 98px;
    margin: 12px 16px 0 16px;
    &-top {
      display: flex;
      padding: 16px 16px 11px 16px;
      line-height: 24px;
      &-img {
        width: 24px;
        height: 24px;
      }
      &-time {
        white-space: nowrap;
        @include font10px(#bbbbbb);
      }
      &-like {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        line-height: 24px;
        padding: 2px 2px 2px 70px;
      }
      &-num {
        @include font10px(#bbbbbb);
        /*padding-left: 76px;*/
      }
    }
  }
  .no-remark {
    font-size: 12px;
    color: #bbbbbb;
    letter-spacing: 0;
    text-align: center;
    &-text {
      padding: 24px 0;
    }
    .btn {
      display: inline-block;
      width: 160px;
      height: 44px;
      border: 1px solid #12e079;
      border-radius: 22px;
      font-size: 14px;
      line-height: 44px;
      align-content: center;
      color: #12e079;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
</style>
