/**
* @info: ZM-home-专题
* @author: PengGeng
* @date: 8/28/20-3:07 下午
*/
<template>
  <div class="special-main" v-if="specialData" @click="handleSpecialInfo">
    <!-- 修改背景图 -->
    <div
      class="speical-bg"
      :style="{
        background: 'url(' + specialData.banner + ') ,url(' + defaultCBanner + ') ',
        'background-size': '100%'
      }"
    >
      <div class="speical-bg-li"></div>
      <span class="speical-bg-text">{{ specialData.special && specialData.special.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMSpecial',
  data() {
    return {
      defaultCBanner: require('../../../assets/img/defaultCBanner.png') // banner
    };
  },
  props: {
    specialData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    /**
     * @info: 点击首页漫画专题
     * @author: PengGeng
     * @date: 8/28/20-4:07 下午
     */
    handleSpecialInfo() {
      this.$router.push({
        path: '/topic',
        query: {
          id: (this.specialData.special && this.specialData.special.special_id) || ''
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.special-main {
  position: relative;
  font-family: 'pingfang-blod';
  font-size: 14px;
  color: #ffffff;
  margin: 20px auto;
  .speical-bg {
    position: relative;
    border-radius: 4px;
    height: 172px;
    margin: 0 16px;
    background: url('../../../assets/img/defaultCBanner.png') no-repeat center;
    background-size: 100%;
    &-li {
      position: absolute;
      width: 343px;
      height: 60px;
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%);
      border-radius: 0 0 4px 4px;
      bottom: 0;
    }
    &-text {
      position: absolute;
      bottom: 16px;
      left: 16px;
    }
  }
}
</style>
