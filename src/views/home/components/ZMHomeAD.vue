/**
* @info: 首页广告
* @author: PengGeng
* @date: 11/19/20-10:31 上午
*/
<template>
  <div class="ad_main">
    <z-mswiper :banner-list="adData" :bannerHeight="bannerHeight" :banner-width="343"></z-mswiper>
  </div>
</template>

<script>
  import ZMswiper from '@/common/components/ZMswiper';
  // const defaultBanner = require('@/assets/img/defaultBanner.png');
  // eslint-disable-next-line no-unused-vars
  export default {
    name: 'ZMHomeAD',
    props: {
      adData: {
        type: Array | Object,
        default: () => {}
      }
    },
    components: {
      ZMswiper
    },
    data() {
      return {
        adValue: this.adData[0] || [],
        adBannerList: this.adData,
        bannerHeight: 86
      }
    },
    created() {
    },
    methods: {
      /**
       * @info: 点击广告
       * @author: PengGeng
       * @date: 11/19/20-10:58 上午
       */
      // handleClickADInfo(index) {
      //   const adValue = this.adBannerList[index]
      //   const JUMP_ADDRESS = {
      //     1: () => {
      //       this.$router.push('/discovery')
      //       console.log('jump to 标签')
      //     },
      //     2: () => {
      //       this.$router.push({
      //         path: '/recommend',
      //         query: {
      //           SEC_ID: adValue.special_id || 0
      //         }
      //       });
      //       console.log('jump to 专题')
      //     },
      //     3: () => {
      //       this.$router.push({
      //         path: '/detail',
      //         query: {
      //           cartoon_id: adValue.cartoon_id || ''
      //         }
      //       })
      //       console.log('jump to 漫画详情页')
      //     },
      //     4: () => {
      //       window.location.href = adValue.jump_address ? adValue.jump_address : this.$toast('暂时不支持跳转，谢谢！')
      //       console.log('jump to 内部URL')
      //     },
      //     5: () => {
      //       window.location.href = adValue.jump_address ? adValue.jump_address : this.$toast('暂时不支持跳转，谢谢！')
      //       console.log('jump to 外部URL')
      //     }
      //   }
      //   if (adValue && adValue.jump_type) {
      //     JUMP_ADDRESS[adValue.jump_type]()
      //   } else {
      //     this.$toast('暂时不支持跳转，谢谢！')
      //   }
      // }
    }
  };
</script>

<style scoped lang="scss">
.ad_main {
  position: relative;
  text-align: center;
  margin: auto 8px;
  padding: 0;
  /*width: auto;*/
  height: 86px;
  border-radius: 4px;
}
</style>
