<template>
  <div class="main" v-if="showADFlag">
    <div class="bg"></div>
    <div class="content">
      <img v-if="adData.img" class="content-imgad" @click="handleClickADUrl" :src="adData.img" />
      <img class="content-close" src="../images/close_ad.png" @click.stop="showAlertAD">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ZMHomeAlertAD',
    props: {
      adData: {
        type: Object,
        default: () => {}
      },
      showADFlag: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'showADFlag',
      event: 'close'
    },
    data() {
      return {
      }
    },
    methods: {
      /**
       * @info: 关闭广告
       * @author: PengGeng
       * @date: 2020/12/18-下午4:28
       */
      showAlertAD() {
        this.$store.commit('home/SET_AD_FLAG', true)
        // sessionStorage.setItem('showADFlag', true)
        this.$emit('close', false)
      },
      /**
       * @info: 点击详情
       * @author: PengGeng
       * @date: 2020/12/18-下午4:28
       */
      handleClickADUrl() {
        // const BANNER_DATA = this.bannerList;
        // 1-标签，2=专题，3=漫画详情页；4-内部URL；5-外部URL
        const bannerType = this.adData['jump_type'];
        console.log(bannerType);
        const JUMP_ADDRESS = {
          1: () => {
            this.$router.push({ path: '/discovery', query: { tag: this.adData.tag_id } });
            console.log('jump to 标签');
          },
          2: () => {
            this.$router.push({
              path: '/topic',
              query: {
                id: this.adData.special_id || 0
              }
            });
            console.log('jump to 专题');
          },
          3: () => {
            this.$router.push({
              path: '/detail',
              query: {
                cartoon_id: this.adData.cartoon_id || ''
              }
            });
            console.log('jump to 漫画详情页');
          },
          4: () => {
            window.location.href = this.adData.jump_address
              ? this.adData.jump_address
              : this.$toast('暂时不支持跳转，谢谢！');
            console.log('jump to 内部URL');
          },
          5: () => {
            window.location.href = this.adData.jump_address
              ? this.adData.jump_address
              : this.$toast('暂时不支持跳转，谢谢！');
            console.log('jump to 外部URL');
          }
        };
        if (this.adData && this.adData['jump_type']) {
          this.$store.commit('home/SET_AD_FLAG', true)
          JUMP_ADDRESS[this.adData['jump_type']]();
        } else {
          this.$toast('暂时不支持跳转，谢谢！');
        }
      }
    }
  };
</script>

<style scoped lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  touch-action: none;
  width: 100%;
  height: 100%;
  z-index: 10000;
  .bg {
    position: relative;
    background: #000000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 410px;
    /*background: red;*/
    top: 50%;
    left: 50%;
    z-index: 10001;
    transform: translate(-50%, -50%);
    &-imgad {
      width: auto;
      display: inline-block;
      border-radius: 8px;
    }
    &-close {
      position: relative;
      margin: 16px auto;
      width: 44px;
      height: 44px;
    }
  }
}
</style>
