<template>
  <transition name="loading-pop">
    <div class="loading-container" v-if="show">
      <div class="loading"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Loading',
    data() {
      return {
        show: false
      };
    }
  };
</script>

<style lang="scss" scoped>
  .loading-pop-enter, .loading-pop-leave-active {
    opacity: 0
  }

  .loading-container {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    text-align: center;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
    .loading{
      width: 96px;
      height: 81px;
      background: url('./img/toastloading.webp') no-repeat;
      background-size: 100%;
    }
  }
</style>
