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
    <z-m-loading v-if="showFlag" style="margin-top: 68px;"></z-m-loading>
    <template>
        <is-scroll
                 ref="ZMScroll"
                 v-if="dataList.length"
                 class="result-list"
                 :topAjax=false
                 :bottom-ajax="bottomAjax"
                 :is-bottom-ajax="isBottomAjax"
                 @to-bottom-ajax="nextPage">
          <div slot="srcoll-main">
            <z-m-search-result-list
                :cartoonList="dataList"
                :count="count"
            ></z-m-search-result-list>
            <z-m-no-data v-if="!bottomAjax"></z-m-no-data>
          </div>
        </is-scroll>
      <section v-else style="position: relative; margin-top: 68px;">
        <no-data-view
            :type="'search'"
            :textContent="textContent"
        ></no-data-view>
        <z-m-history-list :words-data="everyoneData"></z-m-history-list>
      </section>
      <z-m-search-recommend
          v-if="recommendList.length && currentPage === totalPages"
          :recommendList="recommendList"
      ></z-m-search-recommend>
    </template>
  </div>
</template>

<script>
import ZMSearch from './components/search'
import isScroll from '@/common/components/scrollAjax/index';
import ZMSearchResultList from '@/views/search/components/ZMSearchResultList'
import ZMSearchRecommend from '@/views/search/components/ZMSearchRecommend'
import noDataView from '@/common/components/noDataView'
import ZMHistoryList from '@/views/search/components/ZMHistoryList'
import ZMLoading from '@/views/search/components/loading/loading'
import { getSearchData } from '@/common/api/search'
import ZMNoData from '@/common/components/ZMNoData'
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
	    pageSize: 30,
	    everyoneData: {
		    leftName: '大家都在搜',
		    rightFlag: false,
		    wordsList: ['桃花运是冒险', '桃花运是冒险1', '桃花运是冒险2', '桃花运是冒险3', '桃花运是冒险4']
	    },
	    showFlag: false,
      bottomAjax: true,
      isBottomAjax: true
    }
  },
  components: {
	  ZMSearch,
	  ZMSearchResultList,
	  ZMSearchRecommend,
	  noDataView,
	  ZMHistoryList,
	  ZMLoading,
	  ZMNoData,
    isScroll
  },
  mounted() {
    this.searchVal = this.$route.query.searchValue || ''
    sessionStorage.setItem('name', this.searchVal)
    this.getData()
    // this.$nextTick(() => {
    //   this.$refs.ZMScroll && this.$refs['ZMScroll'].resetInit()
    // })
  },
  methods: {
	  /**
	   * @info: 请求搜索的结果集
	   * @author: PengGeng
	   * @date: 10/13/20-2:47 下午
	   */
	  async getData() {
		  // console.log(Load)
		  this.showFlag = true
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
	      this.showFlag = false
        if (this.currentPage >= this.totalPages){
          this.bottomAjax = false
          this.isBottomAjax = false
        }
        this.$refs.ZMScroll && this.$refs['ZMScroll'].resetInit()
      } else {
        this.$toast(resData.msg || '系统出错,请稍后重试')
      }
    },
	  nextPage() {
      if (!this.bottomAjax) return
      this.currentPage++
      this.getData()
    }
  }
}
</script>

<style scoped lang="scss">
.result-list {
  height: 100%;
  padding-bottom: 0!important;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
.search-result-main {
  position: relative;
  overflow: hidden;
}
</style>
