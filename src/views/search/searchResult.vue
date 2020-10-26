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
    <div class="result-list" v-if="dataList.length">
      <mt-loadmore :bottom-method="nextPage" :bottom-all-loaded="allLoaded" ref="loadmore">
      <z-m-search-result-list
          :cartoonList="dataList"
          :count="count"
      ></z-m-search-result-list>
      </mt-loadmore>
    </div>
    <section v-else style="position: relative; margin-top: 68px;">
      <no-data-view
          :type="'search'"
          :textContent="textContent"
      ></no-data-view>
      <z-m-history-list :words-data="everyoneData"></z-m-history-list>
    </section>
    <z-m-search-recommend
        v-if="recommendList.length"
        :recommendList="recommendList"
    ></z-m-search-recommend>
  </div>
</template>

<script>
import ZMSearch from './components/search'
import ZMSearchResultList from '@/views/search/components/ZMSearchResultList'
import ZMSearchRecommend from '@/views/search/components/ZMSearchRecommend'
import noDataView from '@/common/components/noDataView'
import ZMHistoryList from '@/views/search/components/ZMHistoryList'
import { getSearchData } from '@/common/api/search'
export default {
  name: 'searchResult',
  data(){
    return {
	    textContent: '没有找到你要的结果～',
		  searchVal: '',
      dataList: [],
	    recommendList: [],
	    totalPages: 0,
	    count: 0,
      currentPage: 1,
	    allLoaded: false,
	    pageSize: 30,
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
    this.getData()
  },
  methods: {
	  /**
	   * @info: 请求搜索的结果集
	   * @author: PengGeng
	   * @date: 10/13/20-2:47 下午
	   */
	  async getData() {
      const reqData = {
			  page: this.currentPage,
			  page_size: this.pageSize
      }
      const resData = await getSearchData(this.searchVal, reqData)
      if (resData.code === 0){
        this.dataList.push(...resData.data.cartoon_list)
        this.totalPages = resData.data.total_pages
        this.recommendList = resData.data.recommend_list
        this.everyoneData.wordsList = resData.data.hot_keywords || []
        this.count = resData.data.count
        if (this.currentPage >= this.totalPages){
          this.allLoaded = true
        }
      } else {
        this.$toast(resData.msg || '系统出错,请稍后重试')
      }
    },
	  nextPage() {
      this.currentPage++
      this.getData()
		  this.$refs.loadmore.onTopLoaded()
    }
  }
}
</script>

<style scoped lang="scss">
.result-list {
  position: relative;
  height: auto;
  overflow:scroll;
  -webkit-overflow-scrolling: touch;
}
.search-result-main {
  position: relative;
  overflow: hidden;
}
</style>
