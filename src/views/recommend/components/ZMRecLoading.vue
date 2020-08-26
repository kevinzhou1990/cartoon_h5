<template>
  <div class="rec-main">
    <img class='rec-img' src="../images/recLoading.gif" alt="" />
  </div>
</template>

<script>
export default {
  name: 'recLoading'
}
</script>

<style scoped lang="scss">
.rec-main {
  position: relative;
  margin: 0 auto;
  .rec-img {
    position: fixed;
    top: 44px;
    width: 375px;
    z-index: 999;
  }
}
</style>
