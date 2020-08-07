<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {}
};
</script>

<style lang="scss">
$BORDER_COLOR: rgb(0,0,0);
@import url('/assets/style/index.scss');
@import './src/assets/style/1px.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
