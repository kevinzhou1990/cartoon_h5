<template>
  <div class="agree-main box">
    <z-m-header :title-text="titleContent"></z-m-header>
    <div class="agree-main-content">就这样子吧，等待中。。。。。。</div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
export default {
  name: 'userAgreement',
  data() {
    return {
		  titleContent: '用户协议'
    }
  },
  components: {ZMHeader},
  mounted() {
    this.titleContent = this.$route.query.agreeType === 1 ? '用户协议' : '隐私保护协议'
  }
}
</script>

<style scoped lang="scss">
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
