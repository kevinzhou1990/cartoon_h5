<template>
  <div class="load box" v-show="show"></div>
</template>

<script>
export default {
  name: 'loading',
  data() {
	  return {
		  show: true
	  }
  }
}
</script>

<style scoped lang="scss">
  .load {
    display: flex;
    margin: auto;
    padding: 24px 0;
    width: 16px;
    height: 16px;
    background: url("../../images/loading.png") no-repeat center;
    background-size: 100%;
    animation: animal 1s infinite linear;
    transform-origin: center center;
  }
  @keyframes animal {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
</style>
