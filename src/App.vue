<template>
  <div id="app">
    <router-view />
    <div style="height: 100px; width: 100px; margin: 20px;" class="zm-b">000</div>
    <div style="height: 100px; width: 100px; margin: 20px;" class="zm-b-t">111</div>
    <div style="height: 100px; width: 100px; margin: 20px;" class="zm-b-b">222</div>
    <div style="height: 100px; width: 100px; margin: 20px;" class="zm-b-l">333</div>
    <div style="height: 100px; width: 100px; margin: 20px;" class="zm-b-r">444</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {}
};
</script>

<style lang="scss">
$BORDER_COLOR: #eee;
@import url('/assets/style/index.scss');
@import './src/assets/style/1px.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
