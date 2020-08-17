<template>
  <div :class="`page-reader ${fullRead ? 'page-reader-full' : ''}`">
    <ZMHeader titleText="#001.魔神降临" :showRight="true" :hasBorder="true" :show="fullRead">
      <SvgIcon slot="left" iconClass="close_ab" class="icon-left" />
      <div slot="right" class="header-right">漫画详情</div>
    </ZMHeader>
    <Navigation :funcPos="funcPos" :show="fullRead" />
    <Setting
      :funcPos="funcPos"
      @changeFuncPos="changeFuncPos"
      :show="fullRead"
      @switchFull="switchFull"
    />
    <div class="reader-mask" @click="switchFull"></div>
    <div>
      <img src="@/assets/img/IMG_2332.png" alt style="width:100%;" />
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import Navigation from './components/navigation';
import Setting from './components/settings';
export default {
  name: 'Reader',
  components: { ZMHeader, SvgIcon, Navigation, Setting },
  data() {
    return {
      // 功能栏位置，right:右，left:左，默认：right
      funcPos: 'right',
      // 全屏阅读
      fullRead: false
    };
  },
  methods: {
    // 更改功能栏位置
    changeFuncPos() {
      this.funcPos = this.funcPos === 'right' ? 'left' : 'right';
    },
    // 全屏切换
    switchFull() {
      this.fullRead = !this.fullRead;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-reader-full {
  & > {
    transition: top 0.5s;
  }
  & >>> .header-main {
    top: -44px;
  }
}
.page-reader {
  padding-top: 44px;
  min-height: 100%;
  .header-right {
    font-size: 12px;
    width: 48px;
    background: none;
  }
  .icon-left {
    margin: 10px 0 10px 16px;
  }
  .reader-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    // background: red;
  }
}
</style>
