<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$route.meta.keepAlive, this.$route.name);
  }
};
</script>

<style lang="scss">
$BORDER_COLOR: #eee;
@import './assets/style/1px.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
