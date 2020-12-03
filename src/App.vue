<template>
  <!--  <div id="app" :class="isShow ? 'animation-active-in' : ''">-->
  <div id="app">
    <keep-alive v-if="isClient">
      <router-view v-if="$route.meta.keepAlive && isShow" />
    </keep-alive>
    <router-view v-if="(!$route.meta.keepAlive && isShow) || !isClient"></router-view>

    <div v-if="!isShow" class="app-loading"></div>
  </div>
</template>

<script>
import env from '../src/lib/utils/env';
export default {
  name: 'App',
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    isClient() {
      return env.isClient();
    }
  },
  mounted() {
    this.isShow = true;
    console.log(this.$route.meta.keepAlive, this.$route.name, this.isClient);
    console.log('漫画H5--202011241803');
  }
};
</script>

<style lang="scss">
$BORDER_COLOR: #eee;
@import './assets/style/1px.scss';

.app-loading {
  position: fixed;
  font-size: 40px;
  color: red;
  width: 100%;
  height: 100%;
  background: url('./views/home/images/homeLoading.gif') 100% 100% no-repeat;
  background-size: cover;
}

#app {
  font-family: 'pingfang-blod';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.box {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 44px;
  overflow: auto;
  & > .header-main {
    position: fixed !important;
    top: 0;
    left: 0;
  }
}
</style>
