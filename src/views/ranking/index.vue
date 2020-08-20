<template>
  <div class="ranking">
    <ZMHeader titleText="排行榜" />
    <div class="ranking-wrap"></div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
export default {
  name: 'Ranking',
  components: { ZMHeader }
};
</script>

<style lang="scss" scoped>
.ranking {
  padding-top: 44px;
  .ranking-wrap {
    display: flex;
  }
}
</style>
