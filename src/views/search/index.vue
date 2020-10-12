<template>
  <div class="main">
    <z-m-search @change="showSearchResult"></z-m-search>
    <z-m-search-result
        :searchResultList='searchResultList'
        v-if="showSRFlag"
    >
    </z-m-search-result>
    <section v-else>
      <z-m-history-list :words-data="histroyData"></z-m-history-list>
      <z-m-history-list :words-data="everyoneData"></z-m-history-list>
    </section>
  </div>
</template>

<script>
import ZMSearch from './components/search'
import ZMHistoryList from './components/ZMHistoryList'
import ZMSearchResult from '@/views/search/components/ZMSearchResult'
export default {
  name: 'search-index',
  components: {
	  ZMSearch,
	  ZMHistoryList,
	  ZMSearchResult
  },
  data() {
    return {
      histroyData: {
        leftName: '历史搜索',
        rightFlag: true,
        wordsList: ['抢爷异闻录', '抢爷异闻录1', '抢爷异闻录2', '抢爷异闻录3', '抢爷异闻录5']
      },
      everyoneData: {
        leftName: '大家都在搜',
	      rightFlag: false,
	      wordsList: ['桃花运是冒险', '桃花运是冒险1', '桃花运是冒险2', '桃花运是冒险3', '桃花运是冒险4']
      },
      showSRFlag: false,
      searchResultList: []
    }
  },
  methods: {
	  showSearchResult(val, resultValue = []) {
      this.showSRFlag = val
      if (val) this.searchResultList = resultValue.list
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
