/**
* @info: 无网络加载页面
* @author: PengGeng
* @date: 8/11/20-2:42 下午
*/
<template>
  <div class="main">
    <div class="main-content">
      <div class="main-content-img"></div>
      <span class="main-content-text">{{ textContent || noNetworkContent }}</span>
    </div>
    <div class="main-btn" @click="handleClickRefresh">刷新下</div>
  </div>
</template>

<script>
export default {
  name: 'noNetwork',
  props: {
    textContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      noNetworkContent: '页面不见了，请检查一下网络'
    }
  },
  methods: {
    /**
     * @info: 点击刷新
     * @author: PengGeng
     * @date: 8/11/20-11:01 上午
     */
    handleClickRefresh() {
      console.log('click refresh btn ......')
    }
  }
}
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    width: 100%;
    margin: 80px auto;

    &-content {
      display: flex;
      flex-direction: column;
      padding: 0 98px;

      &-img {
        width: 180px;
        height: 180px;
        background: url("../../assets/img/network.png") no-repeat;
        background-size: 100%;
      }

      &-text {
        padding: 16px 0;
        font-weight: bold;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
      }
    }

    .main-btn {
      position: relative;
      margin: 48px auto;
      width: 160px;
      height: 44px;
      font-size: 14px;
      color: #12E079;
      text-align: center;
      line-height: 44px;
      border: 1px solid #12E079;
      border-radius: 22px;
    }
  }
</style>
