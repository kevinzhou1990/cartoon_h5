/**
* @info: 首页广告
* @author: PengGeng
* @date: 11/19/20-10:31 上午
*/
<template>
  <div
      class="ad_main"
      :style="{background: 'url('+adValue.img+') no-repeat center / cover'}"
      @click="handleClickADInfo"
  ></div>
</template>

<script>
  export default {
    name: 'ZMHomeAD',
    props: {
      adData: {
        type: Array | Object,
        default: () => {}
      }
    },
    data() {
      return {
        adValue: this.adData[0] || []
      }
    },
    methods: {
      /**
       * @info: 点击广告
       * @author: PengGeng
       * @date: 11/19/20-10:58 上午
       */
      handleClickADInfo() {
        const JUMP_ADDRESS = {
          1: () => {
            this.$router.push('/discovery')
            console.log('jump to 标签')
          },
          2: () => {
            this.$router.push({
              path: '/recommend',
              query: {
                SEC_ID: this.adValue.special_id || 0
              }
            });
            console.log('jump to 专题')
          },
          3: () => {
            this.$router.push({
              path: '/detail',
              query: {
                cartoon_id: this.adValue.cartoon_id || ''
              }
            })
            console.log('jump to 漫画详情页')
          },
          4: () => {
            window.location.href = this.adValue.jump_address ? this.adValue.jump_address : this.$toas('暂时不支持跳转，谢谢！')
            console.log('jump to 内部URL')
          },
          5: () => {
            window.location.href = this.adValue.jump_address ? this.adValue.jump_address : this.$toas('暂时不支持跳转，谢谢！')
            console.log('jump to 外部URL')
          }
        }
        if (this.adValue && this.adValue.jump_type) {
          JUMP_ADDRESS[this.adValue.jump_type]()
        } else {
          this.$toast('暂时不支持跳转，谢谢！')
        }
      }
    }
  };
</script>

<style scoped lang="scss">
.ad_main {
  position: relative;
  text-align: center;
  margin: auto 16px;
  padding: 0;
  width: auto;
  height: 86px;
}
</style>
