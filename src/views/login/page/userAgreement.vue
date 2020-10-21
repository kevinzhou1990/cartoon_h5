<template>
  <transition name="agreement">
    <div class="agree-main box" v-show="agreementFlag">
      <z-m-header :title-text="titleContent"></z-m-header>
      <div class="agree-main-content">就这样子吧，等待中。。。。。。</div>
    </div>
  </transition>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
export default {
  name: 'userAgreement',
  data() {
    return {
	    agreementFlag: false,
		  titleContent: '用户协议'
    }
  },
  components: {ZMHeader},
  mounted() {
    this.agreementFlag = true
    this.titleContent = this.$route.query.agreeType === 1 ? '用户协议' : '隐私保护协议'
  }
}
</script>

<style scoped lang="scss">
  .agreement-enter-active {
    animation: fadeInRight 0.5s;
  }
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
.agree-main {
  position: relative;
  margin: auto;
  overflow: hidden;
  &-content {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
}
</style>
