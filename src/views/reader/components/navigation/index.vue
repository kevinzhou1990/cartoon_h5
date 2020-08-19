<template>
  <div
    :class="`navigation-wrap navigation-wrap-${funcPos} ${show ? 'navigation-wrap-' + funcPos + '-hidden' : ''}`"
  >
    <div :class="`navigation-content ${touching ? 'navigation-content-touch' : ''}`">
      <div :class="`navigation-contents ${touching}`" @click="openContents">
        <SvgIcon iconClass="catalog_ba" size="small" />
      </div>
      <div
        :class="`navigation-process ${touching ? 'navigation-process-touch': ''}`"
        @touchstart="handlerTouchStart"
        @touchmove="handlerTouchMove"
        @touchend="handlerTouchEnd"
      >
        <div
          :style="`height:${readerProgress}%;`"
          :class="`${readerProgress > 97 ? 'reader-process' : ''}`"
        ></div>
        <div :class="`tag ${'tag-'+touching}`">40/70</div>
      </div>
      <div :class="`navigation-next ${touching}`">
        <span>下一话</span>
      </div>
      <div
        :class="`setting-icon ${funcPos} ${show || touching ? 'hidden' : ''}`"
        @click="switchFull"
      >
        <SvgIcon iconClass="set_ba" size="small" />
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Navigation',
  components: { SvgIcon },
  props: {
    funcPos: { type: String, default: 'right', required: true },
    show: { type: Boolean, default: true }
  },
  data() {
    return {
      touching: '',
      readerProgress: 20,
      initY: 0,
      initHeight: 0
    };
  },
  methods: {
    switchFull() {
      this.$emit('switchFull');
    },
    openContents() {
      this.$emit('contents');
    },
    handlerTouchStart(e) {
      e.preventDefault();
      this.initY = Math.round(e.changedTouches[0].clientY);
      this.initHeight = Math.round(272 * (this.readerProgress / 100));
      this.touching = 'touch';
    },
    handlerTouchMove(e) {
      const posY = Math.round(e.touches[0].clientY);
      // 移动距离
      const gap = posY - this.initY;
      if (gap + this.initHeight > 272) return;
      this.readerProgress = ((gap + this.initHeight) / 272) * 100;
    },
    handlerTouchEnd(e) {
      console.log(e, 'end');
      this.touching = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-wrap {
  text-size-adjust: none;
  position: fixed;
  top: calc(50% - 160px);
  width: 40px;
  z-index: 999;
  &-left {
    left: 16px;
    transition: left 0.2s;
    .navigation-contents,
    .navigation-next {
      transition: left 0.2s;
      left: 0;
      &.touch {
        left: -56px;
      }
    }
  }
  &-left-hidden {
    left: -56px;
  }
  &-right {
    right: 16px;
    transition: right 0.2s;
    .navigation-contents,
    .navigation-next {
      transition: right 0.2s;
      right: 0;
      &.touch {
        right: -56px;
      }
    }
  }
  &-right-hidden {
    right: -56px;
  }
  .navigation-content-touch {
    position: relative;
    height: 272px;
    .navigation-contents,
    .navigation-next {
      position: absolute;
    }
    .navigation-contents {
      top: 0;
    }
    .navigation-next {
      bottom: 0;
    }
  }

  .navigation-process {
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 16px 0 16px 0;
    &-touch {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
      height: 272px;
      & > div {
        background: rgba(255, 255, 255, 1);
        border-radius: 8px 8px 0 0;
      }
    }
    & > div {
      background: rgba(255, 255, 255, 1);
      border-radius: 8px 8px 0 0;
    }
    .reader-process {
      border-radius: 8px;
    }
    .tag {
      display: none;
      box-sizing: border-box;
      padding-right: 15px;
      font-family: 'pingfang-blod';
      background-image: url('./img/bubble_aa.png');
      background-size: 100%;
      background-position: 0 0;
      position: absolute;
      background-color: transparent;
      color: #fff;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      right: 56px;
      width: 94px;
      height: 40px;
      &.tag-touch {
        display: block;
        margin-top: -21px;
      }
    }
  }
  .navigation-contents,
  .navigation-next {
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
    span {
      transform: scale(0.875);
      display: inline-block;
      height: 40px;
      width: 40px;
    }
  }
  .setting-icon {
    position: fixed;
    bottom: 75px;
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
    &.right {
      right: 16px;
      transition: right 0.2s;
      &.hidden {
        right: -56px;
      }
    }
    &.left {
      left: 16px;
      transition: left 0.2s;
      &.hidden {
        left: -56px;
      }
    }
  }
}
</style>
