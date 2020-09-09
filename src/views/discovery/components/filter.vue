<template>
  <div class="filter-component">筛选</div>
</template>

<script>
export default {
  name: 'DiscoveryFilter',
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('getFilterItem');
    console.log('mounted filter');
  }
};
</script>

<style lang="scss" scoped>
</style>
