/**
* @info: 搜索
* @author: PengGeng
* @date: 10/14/20-7:12 下午
*/
<template>
  <div class="main">
    <z-m-search @change="showSearchResult" :hot-data="everyoneData"></z-m-search>
    <z-m-search-result
        v-model='searchResultList'
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
import { commonSearchWords } from '@/common/api/search'
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
        wordsList: []
      },
      everyoneData: {
        leftName: '大家都在搜',
	      rightFlag: false,
	      wordsList: []
      },
      showSRFlag: false, // 是否现实搜索结果
      searchResultList: [] // 搜索的结果数据
    }
  },
  mounted() {
    this.getCommonSearchWords()
	  this.histroyData.wordsList = (localStorage.getItem('HISTROY_WORDS') && JSON.parse(localStorage.getItem('HISTROY_WORDS'))) || []
    setTimeout(() => {
      // this.$children[0].$refs.searchInput.focus()
	    // this.$children[0].$refs.searchInput.addEventListener('toucstart', () => {
		    this.$children[0].$refs.searchInput.focus()
      // })
    }, 100)
    // document.getElementById('search').addEventListener('click', () => {
    //   document.querySelectorAll('input')[0].focus()
    // })
  },
  activated() {
    // this.histroyData.wordsList = (localStorage.getItem('HISTROY_WORDS') && JSON.parse(localStorage.getItem('HISTROY_WORDS'))) || []
  },
  methods: {
    /**
		 * @info: 大家都在搜
		 * @author: PengGeng
		 * @date: 10/13/20-4:34 下午
		 */
    async getCommonSearchWords() {
      const resData = await commonSearchWords()
      if (resData.code === 0){
	      this.everyoneData.wordsList = resData.data.hot_keywords || []
      } else {
        this.$toast(resData.msg)
      }
    },
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
