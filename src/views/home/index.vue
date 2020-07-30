<template>
  <div class="index">
    <mt-header title="漫画威龙" />
    <mh-Contents />
  </div>
</template>

<script>
import Contents from '@/common/components/contents';
export default {
  name: 'home',
  components: {
    'mh-Contents': Contents
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
