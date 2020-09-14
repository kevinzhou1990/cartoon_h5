<template>
  <div class="filter-component">
    <div class="filter-tags"></div>
    <div class="filter-pleace"></div>
    <div class="filter-status">
      <!-- <span v-for="item in status" :key="item.id">{{item.name}}</span> -->
    </div>
    <div class="filter-sort"></div>
  </div>
</template>

<script>
export default {
  name: 'DiscoveryFilter',
  computed: {
    status() {
      return this.$store.state.discovery.status;
    },
    detail() {
      return this.$store.state.reader.imagesList;
    }
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch('getFilterItem');
    await this.$store.dispatch('getChapterDetail', 890);
    console.log(this.$store.state, this.detail, '======');
  }
};
</script>

<style lang="scss" scoped>
</style>
