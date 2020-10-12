/**
* @info: 搜索结果
* @author: PengGeng
* @date: 10/12/20-2:16 下午
*/
<template>
  <div class="search-result-main">
    <z-m-search style="position: fixed; z-index: 9999; background: #FFFFFF; overflow: hidden;"
                :searchVal="searchVal"
    ></z-m-search>
    <z-m-search-result-list v-if="dataList.length"></z-m-search-result-list>
    <section v-else>
      <no-data-view
          :type="'history'"
      ></no-data-view>
      <z-m-history-list :words-data="everyoneData"></z-m-history-list>
    </section>
    <z-m-search-recommend></z-m-search-recommend>
  </div>
</template>

<script>
import ZMSearch from './components/search'
import ZMSearchResultList from '@/views/search/components/ZMSearchResultList'
import ZMSearchRecommend from '@/views/search/components/ZMSearchRecommend'
import noDataView from '@/common/components/noDataView'
import ZMHistoryList from '@/views/search/components/ZMHistoryList'
export default {
  name: 'searchResult',
  data(){
    return {
		  searchVal: '',
      dataList: [],
	    everyoneData: {
		    leftName: '大家都在搜',
		    rightFlag: false,
		    wordsList: ['桃花运是冒险', '桃花运是冒险1', '桃花运是冒险2', '桃花运是冒险3', '桃花运是冒险4']
	    }
    }
  },
  components: {
	  ZMSearch,
	  ZMSearchResultList,
	  ZMSearchRecommend,
	  noDataView,
	  ZMHistoryList
  },
  mounted() {
    this.searchVal = this.$route.query.searchValue || ''
    sessionStorage.setItem('name', this.searchVal)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.search-result-main {
  position: relative;
  overflow: hidden;
}
</style>
