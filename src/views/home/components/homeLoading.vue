<template>
    <div class="load-main">
      <img class="load-img" src="../images/homeLoading.gif" alt="" />
    </div>
</template>

<script>
export default {
  name: 'homeLoading'
}
</script>
<style scoped lang="scss">
  .load-main {
    position: relative;
    margin: 0 auto;
    .load-img {
      position: fixed;
      height: 667px;
      width: 375px;
      overflow: hidden; z-index: 999;
    }
  }
</style>
