<template>
  <div class="main">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="main-wrap" />
      </keep-alive>
    </transition>
    <mt-tabbar>
      <mt-tab-item id="home">首页</mt-tab-item>
      <mt-tab-item id="bookshelf">书架</mt-tab-item>
      <mt-tab-item id="mine">我的</mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      selected: '',
      transitionName: ''
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
