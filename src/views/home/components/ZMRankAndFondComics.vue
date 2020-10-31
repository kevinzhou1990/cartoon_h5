/**
* @info: ZM-home-label
* @author: PengGeng
* @date: 8/19/20-6:11 下午
*/
<template>
  <div class="label-main">
    <div class="label-main-left" @click.stop="handleRankInfo">
      <span class="label-main-cont">排行</span>
    </div>
    <div class="label-main-right" @click.stop="handleDiscoverInfo">
      <span class="label-main-cont">发现</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMRankAndFondComics',
  methods: {
    /**
     * @info: go to ranking
     * @author: PengGeng
     * @date: 8/24/20-2:50 下午
     */
    handleRankInfo() {
      this.$router.push('/ranking');
    },
    /**
     * @info: go to discover
     * @author: PengGeng
     * @date: 8/24/20-2:51 下午
     */
    handleDiscoverInfo() {
      this.$router.push('/discovery');
      console.log('go to discover info');
    }
  }
};
</script>

<style scoped lang="scss">
@mixin textContent {
  position: relative;
  /*display: block;*/
  font-family: 'pingfang-blod';
  font-size: 14px;
  color: #222222;
  letter-spacing: 0;
  line-height: 56px;
}
@mixin iconLoaction {
  display: inline-block;
  vertical-align: middle;
  content: ' ';
  margin: auto 8px;
  width: 24px;
  height: 24px;
}
.label-main {
  display: flex;
  margin: auto 16px;
  text-align: center;
  &-left {
    width: 50%;
    height: 56px;
    background: url('../images/ranking_bg.png') no-repeat center;
    background-size: 100%;
    .label-main-cont {
      @include textContent;
      &:before {
        @include iconLoaction;
        background: url('../images/ranking_icon.png') no-repeat center;
        background-size: 100%;
      }
    }
  }
  &-right {
    width: 50%;
    height: 56px;
    background: url('../images/find_bg.png') no-repeat center;
    background-size: 100%;
    .label-main-cont {
      @include textContent;
      &:before {
        @include iconLoaction;
        background: url('../images/find_icon.png') no-repeat center;
        background-size: 100%;
      }
    }
  }
}
</style>
