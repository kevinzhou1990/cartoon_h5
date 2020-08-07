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
@import url('/assets/style/index.scss');
@import url('/assets/style/1px.scss');
/*1px border 开始*/
/* 下border */
.zm-b-b {
  .zm-1px-b(#eee);
}

/* 上border */
.zm-b-t {
  .zm-1px-t(#eee);
}

/* 左border */
.zm-b-l {
  .zm-1px-l(#eee);
}

/* 右border */
.zm-b-r {
  .zm-1px-r(#eee);
}

/* 全部border */
.zm-b {
  .zm-1px(#eee);
}

/*1px border 结束*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
