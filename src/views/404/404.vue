<template>
  <div class="error-page">
    <div>
      <div>
        <img src="../../assets/img/defaultRecordAa@3x.png" alt="" />
      </div>
      <p>404：糟糕！页面不见了</p>
      <span @click="$router.replace({ path: 'home' })">回到首页</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  img {
    width: 160px;
  }
  p {
    font-size: 12px;
    color: #999999;
    text-align: center;
    margin-top: 8px;
  }
  span {
    margin-top: 64px;
    color: rgb(18, 224, 121);
    position: relative;
    display: inline-block;
    text-align: center;
    width: 160px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    border-radius: 22px;
    &:before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      border: 1px solid rgb(18, 224, 121);
      color: rgb(18, 224, 121);
      height: 200%;
      transform-origin: left top;
      transform: scale(0.5);
      border-radius: 44px;
    }
  }
}
</style>
