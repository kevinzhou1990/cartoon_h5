<template>
  <div class="header-main h-h title-wrap">
    <div style="display: flex;">
      <a class="navigation_arrow"></a>
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
    showRight: {
      type: Boolean,
      default: false
    },
    titleText: {
      type: String,
      default: '我是头部'
    }
  }
}
</script>

<style scoped lang="scss">
.h-h {
  font-weight: bold;
  font-size: 18px;
  color: #222222;
  letter-spacing: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
}
.header-left {
  flex: 1;
  text-align: center;
}
.header-right {
  /*display: block;*/
  width: 44px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  margin: 10px 0;
  background: #E6E6E6;
}
.navigation_arrow {
  display: inline-block;
  /*box-sizing: border-box;*/
  margin: 10px 0 10px 16px;
  width: 24px;
  height: 24px;
  background: url(../images/nav_arrow.png) no-repeat center;
  background-size: 100%
}
.title-wrap {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: #fff;
}
.header-main-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-right: 16px;
}
</style>
