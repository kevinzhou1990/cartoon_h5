<template>
  <div class="main">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="main-wrap" />
      </keep-alive>
    </transition>
    <div class="tabber flex">
      <div>首页</div>
      <div>书架</div>
      <div>我的</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      transitionName: ''
    };
  }
};
</script>

<style lang="scss" scoped>
.main {
  .tabber {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  .flex {
    display: flex;
    & > div {
      flex: 1;
      font-size: 10px;
    }
  }
}
</style>
