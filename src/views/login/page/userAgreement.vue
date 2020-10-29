<template>
  <transition name="agreement">
    <div class="agree-main" :class="{'box': agreementFlag}">
      <z-m-header :title-text="titleContent" v-show="agreementFlag"></z-m-header>
      <div class="agree-main-content" v-html="userContent"></div>
    </div>
  </transition>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import { getAgreement } from '../api/index'

export default {
  name: 'userAgreement',
  data() {
    return {
	    agreementFlag: false,
		  titleContent: '用户协议',
      userContent: ''
    }
  },
  components: {ZMHeader},
  mounted() {
	  let u = navigator.userAgent;
	  let APPFlag = u.indexOf('isApp') > -1 // 判断是否是在APP里面运行
	  // let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	  // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    this.agreementFlag = !APPFlag
    this.titleContent = this.$route.query.agreeType === 1 ? '用户协议' : '隐私保护协议'
    this.getData(this.$route.query.agreeType)
  },
  methods: {
    async getData(type = 1) {
      const resData = await getAgreement(type)
      if (resData && resData.code === 0) {
        this.userContent = resData.data.content
      } else {
        this.$toast(resData.msg || '系统繁忙,请稍后重试')
      }
    }
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
