<template>
  <div class="loading-container" v-if="show">
    <div class="loading">加载中...</div>
  </div>
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
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    50% {
      opacity: 0.5;
    }

    to {
      opacity: 1;
    }
  }

  .loading-container {
    animation: fadeIn .3s;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
  }
</style>
