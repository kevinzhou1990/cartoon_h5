<template>
  <div class="main">
    <z-m-search></z-m-search>
    <z-m-history-list :words-data="histroyData"></z-m-history-list>
    <z-m-history-list :words-data="everyoneData"></z-m-history-list>
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
  },
  data() {
    return {
      histroyData: {
        leftName: '历史搜索',
        rightName: '删除',
        wordsList: ['抢爷异闻录', '抢爷异闻录1', '抢爷异闻录2', '抢爷异闻录3', '抢爷异闻录5']
      },
      everyoneData: {
        leftName: '大家都在搜',
        rightName: '',
	      wordsList: ['桃花运是冒险', '桃花运是冒险1', '桃花运是冒险2', '桃花运是冒险3', '桃花运是冒险4']
      }
    }
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
