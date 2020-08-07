<template>
  <div class="box">
    <z-m-header :title-text="titleText" show-right>
      <div slot="right" class="right-change" @click="handleClickLightIcon">
        <img class="right-change-l" :src="showLightBgIcon[0]" alt="">
        <img class="right-change-r" :src="showLightBgIcon[1]" alt="">
      </div>
    </z-m-header>
    <div style="height: 1000px; bottom: 0;">

    </div>
  </div>
</template>

<script>
import ZMHeader from './components/ZMHeader'

export default {
  name: 'recommentd',
  components: {
    ZMHeader
  },
  data() {
    return {
      titleText: '更多推荐',
      isLightIcon: 'false', // false 右边高亮  true 左边高亮
      listBb: require('./images/list_bb.png'),
      listBa: require('./images/list_ba.png'),
      blockBb: require('./images/block_bb.png'),
      blockBa: require('./images/block_ba.png')
    }
  },
  computed: {
    showLightBgIcon() {
      if (this.isLightIcon) {
        return [this.listBb, this.blockBa]
      } else {
        return [this.listBa, this.blockBb]
      }
    }
  },
  methods: {
    handleClickLightIcon() {
      this.isLightIcon = !this.isLightIcon
      console.log('to do something。。。。')
    }
  }
}
</script>

<style lang="scss" scoped>
  $imgUrl: './images/';
  $imgName: block_bb !default;
  @mixin imgSet($imgName) {
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    padding: 0 2px;
    background: url(./images/#{$imgName}.png) no-repeat center;
    background: 100%;
  }

  .right-change {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    width: 44px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    margin: 10px 0;
    background: #E6E6E6;

    &-l {
      width: 16px;
      height: 16px;
      margin-top: 4px;
      margin-left: 6px;
    }

    &-r {
      width: 16px;
      height: 16px;
      margin-top: 4px;
      margin-right: 6px;
    }
  }
</style>
