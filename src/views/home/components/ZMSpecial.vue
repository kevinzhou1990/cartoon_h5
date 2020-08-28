/**
* @info: ZM-home-专题
* @author: PengGeng
* @date: 8/28/20-3:07 下午
*/
<template>
  <div class="special-main" v-if="specialData" @click="handleSpecialInfo">
    <div class="speical-bg" :style="{background: 'url('+specialData.banner+')'}">
      <span class="speical-bg-text">{{ specialData.special && specialData.special.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMSpecial',
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
          SPECIAL_ID: (this.specialData.special && this.specialData.special.special_id) || ''
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.special-main {
  position: relative;
  font-family: 'pingfang-blod';
  font-size: 14px;
  color: #FFFFFF;
  margin: 20px auto;
  .speical-bg {
    position: relative;
    border-radius: 4px;
    height: 172px;
    margin:0 16px;
    background: url("../../../assets/img/defaultBanner.png") no-repeat center;
    background-size: 100%;
    &-text {
      position: absolute;
      bottom: 16px; left: 16px;
    }
  }
}
</style>
