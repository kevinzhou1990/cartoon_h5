<template>
  <div class="dashed-box">
    0
    <span class="gold-box">1</span>
    <span class="green-box">2</span>
  </div>
</template>

<script>
export default {
  name: 'indexTest.vue'
}
</script>

<style scoped lang="scss">
  .dashed-box {
    position: relative;
    background: red;
    height: 100px;
    z-index: -1;
  }
  .gold-box {
    position: fixed;
    z-index: 2;
    background: gold;
    width: 100%;
    height: 100px;
    top: 50px;
  }
  .green-box {
    position: absolute;
    z-index: 6;
    background: lightgreen;
    width: 20%;
    height: 1000px;
    top: 300px;
    opacity: 0.9;
  }
</style>
