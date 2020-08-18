<template>
  <div
    :class="`header-main h-h title-wrap ${hasBorder ? 'zm-b-b' : ''} ${show ? 'header-main-hidden' : ''}`"
    :style="{ background: backgroundColor }"
  >
    <div style="display: flex;">
      <slot name="left">
        <a :class="showNavFlag ? 'navigation_arrow_white' : 'navigation_arrow'" @click="goBack"></a>
      </slot>
      <section class="header-main-content">
        <slot name="center">
          <p class="header-left">{{ titleText }}</p>
        </slot>
        <slot name="right" v-if="showRight">
          <div class="header-right"></div>
        </slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMHeader',
  props: {
    showNavFlag: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    showRight: {
      type: Boolean,
      default: false
    },
    titleText: {
      type: String,
      default: '我是头部'
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      window.history.go(-1);
      // this.$router.back()
    }
  }
};
</script>

<style scoped lang="scss">
.h-h {
  font-family: 'pingfang-blod';
  font-size: 18px;
  color: #222222;
  letter-spacing: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  z-index: 999;
}
.header-left {
  flex: 1;
  text-align: center;
}
.header-right {
  width: 44px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  margin: 10px 0;
  background: #e6e6e6;
}
.navigation_arrow {
  display: inline-block;
  /*box-sizing: border-box;*/
  margin: 10px 0 10px 16px;
  width: 24px;
  height: 24px;
  background: url('../../assets/img/nav_arrow.png') no-repeat center;
  background-size: 100%;
}
.navigation_arrow_white {
  display: inline-block;
  /*box-sizing: border-box;*/
  margin: 10px 0 10px 16px;
  width: 24px;
  height: 24px;
  background: url(../../assets/img/nav_arrow_white.png) no-repeat center;
  background-size: 100%;
}
.title-wrap {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: #fff;
  transition: top 0.2s;
  &.header-main-hidden {
    top: -44px;
  }
}
.header-main-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-right: 16px;
}
</style>
