<template>
  <div class="main">
    <z-m-search></z-m-search>
    <z-m-history-list></z-m-history-list>
    <z-m-history-list></z-m-history-list>
  </div>
</template>

<script>
import ZMSearch from './components/search'
import ZMHistoryList from './components/ZMHistoryList'
export default {
  name: 'search-index',
  components: {
	  ZMSearch,
	  ZMHistoryList
  }
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  margin: 0 auto;
  padding: 0;
}
</style>
