<template>
  <div class="main">
    <home-loading v-if="!bannerList.length"></home-loading>
    <template v-else>
      <!-- 首页搜索组件 -->
      <div class="main-search">
        <z-m-search></z-m-search>
      </div>
      <!-- 首页滑动组件 -->
      <z-m-swiper :bannerList="bannerList" isBottomImg></z-m-swiper>
<!--      <mt-loadmore :bottom-method="nextPage" :bottom-all-loaded="allLoaded" :bottomDistance='100' ref="loadmore" :auto-fill="false">-->
      <is-scroll
          @on-top-ajax="resfreshPage"
          :bottom-ajax="bottomAjax"
          :is-bottom-ajax="isBottomAjax"
          @to-bottom-ajax="nextPage"
      >
        <div slot="srcoll-main">
          <section v-for="item in recList" :key="item.rec_id">
            <!-- 排行与发现 -->
            <z-m-rank-and-fond-comics v-if="item.style_id === 0"></z-m-rank-and-fond-comics>
            <!-- 首页新漫 -->
            <z-m-new-comics :new-camics-data="item" v-if="item.style_id === 1"></z-m-new-comics>
            <!-- 首页热番 -->
            <z-m-hot-comics :hot-comics-data="item" v-if="item.style_id === 2"></z-m-hot-comics>
            <!-- 专题 -->
            <z-m-special :special-data="item" v-if="item.style_id === 3"></z-m-special>
            <!-- 经典漫画 -->
            <z-m-classics-comics :classics-comics-data="item" v-if="item.style_id === 4"></z-m-classics-comics>
            <!-- 推荐喜欢看的 -->
            <z-m-like-comics :like-comics-data="item" v-if="item.style_id === 5"></z-m-like-comics>
            <!-- 你可能喜欢的 -->
            <z-m-maybe-like-comics :maybe-like-comics="item" v-if="item.style_id === 6 "></z-m-maybe-like-comics>
          </section>
          <!-- 无数据了 -->
          <z-m-no-data v-if="isNoMoreData" ></z-m-no-data>
        </div>
      </is-scroll>
<!--      </mt-loadmore>-->
<!--      <mt-loadmore :top-method="resfreshPage" :bottom-method="nextPage" :bottom-all-loaded="allLoaded" :bottomDistance='50' ref="loadmore" :auto-fill="false">-->
<!--        <section style="height: 100%; overflow: auto;" v-for="item in recList" :key="item.rec_id">-->
<!--          &lt;!&ndash; 排行与发现 &ndash;&gt;-->
<!--          <z-m-rank-and-fond-comics v-if="item.style_id === 0"></z-m-rank-and-fond-comics>-->
<!--          &lt;!&ndash; 首页新漫 &ndash;&gt;-->
<!--          <z-m-new-comics :new-camics-data="item" v-if="item.style_id === 1"></z-m-new-comics>-->
<!--          &lt;!&ndash; 首页热番 &ndash;&gt;-->
<!--          <z-m-hot-comics :hot-comics-data="item" v-if="item.style_id === 2"></z-m-hot-comics>-->
<!--          &lt;!&ndash; 专题 &ndash;&gt;-->
<!--          <z-m-special :special-data="item" v-if="item.style_id === 3"></z-m-special>-->
<!--          &lt;!&ndash; 经典漫画 &ndash;&gt;-->
<!--          <z-m-classics-comics :classics-comics-data="item" v-if="item.style_id === 4"></z-m-classics-comics>-->
<!--          &lt;!&ndash; 推荐喜欢看的 &ndash;&gt;-->
<!--          <z-m-like-comics :like-comics-data="item" v-if="item.style_id === 5"></z-m-like-comics>-->
<!--          &lt;!&ndash; 你可能喜欢的 &ndash;&gt;-->
<!--          <z-m-maybe-like-comics :maybe-like-comics="item" v-if="item.style_id === 6 "></z-m-maybe-like-comics>-->
<!--        </section>-->
<!--        &lt;!&ndash; 无数据了 &ndash;&gt;-->
<!--        <z-m-no-data v-if="allLoaded"></z-m-no-data>-->
<!--      </mt-loadmore>-->
    </template>

  </div>
</template>

<script>
// import { InfiniteScroll } from 'mint-ui'
import isScroll from '@/common/components/scrollAjax/index'
import ZMSearch from './components/search';
import ZMSwiper from '@/common/components/ZMswiper';
import ZMRankAndFondComics from '@/views/home/components/ZMRankAndFondComics';
import ZMNewComics from './components/ZMNewComics';
import ZMHotComics from './components/ZMHotComics';
import ZMClassicsComics from './components/ZMClassicsComics';
import ZMLikeComics from './components/ZMLikeComics';
import ZMMaybeLikeComics from './components/ZMMaybeLikeComics';
import ZMNoData from '../../common/components/ZMNoData';
import ZMSpecial from '@/views/home/components/ZMSpecial'
import homeLoading from '@/views/home/components/homeLoading'
import { getBanner, getRecommend } from '@/common/api/home';

export default {
  name: 'home',
  components: {
	  isScroll,
    ZMSearch,
    ZMSwiper,
    ZMRankAndFondComics,
    ZMNewComics,
    ZMHotComics,
    ZMClassicsComics,
    ZMLikeComics,
    ZMMaybeLikeComics,
    ZMNoData,
	  homeLoading,
	  ZMSpecial
  },
  data() {
    return {
      bannerList: [], // banner
      recList: [], // 楼层list
      currentPage: 1, // 当前页
      pageSize: 10, // 一页多少条
      totalPages: 0, // 总页数
	    bottomAjax: false, // 是否上拉加载文字
      isBottomAjax: false, // 是否触发上拉加载的回调
	    isNoMoreData: false // 是否还有更多数据
    };
  },
  mounted() {
    console.log('进来了吗？。。。。。mounted')
    this.getBanner();
    this.getRecommend();
  },
  activated() {
    console.log('执行了。。。。。activated')
  },
  methods: {
    /**
     * @info: 获取banner的数据
     * @author: PengGeng
     * @date: 8/18/20-3:11 下午
     */
    async getBanner() {
      const resData = await getBanner();
      if (resData.code === 0) {
        this.bannerList = resData.data.list || [];
      } else {
        this.$toast(resData.msg || '系统出错,请稍后重试');
      }
    },
    /**
     * @info: 获取楼层
     * @author: PengGeng
     * @date: 8/18/20-3:16 下午
     */
    async getRecommend() {
	    const reqData = {
		    page: this.currentPage,
		    page_size: this.pageSize
	    }
      const resData = await getRecommend(reqData)
	    let recList = resData.data.list
      this.recList.push(...recList)
      this.totalPages = resData.data.total_pages || 0
      let recData = {};
      this.recList.length &&
        this.recList.map((item, index) => {
          if (item.rec_id > 1) {
            recData[item.rec_id] = item.name;
          }
        });
      if (this.currentPage < resData.data.total_pages) {
        this.bottomAjax = true
        this.isBottomAjax = true
        this.isNoMoreData = false
      } else {
	      this.isBottomAjax = false
	      this.bottomAjax = false
	      this.isNoMoreData = true
      }
      sessionStorage.setItem('SET_REC_DATA', JSON.stringify(recData));
      this.$store.commit('SET_REC_DATA', recData);
    },
	  resfreshPage() {
      this.currentPage = 1
      this.loading = true
      this.recList = []
		  this.getRecommend()
		  // if (this.currentPage < this.totalPages) this.allLoaded = false
    },
	  // resfreshPage() {
    //   console.log('loadTop.......')
    //   setTimeout(() => {
	  //     this.$refs.loadmore.onTopLoaded()
	  //     if (this.$el.getBoundingClientRect().y !== 0) return
	  //     this.currentPage = 1
	  //     this.recList = []
	  //     this.getRecommend()
	  //     if (this.currentPage < this.totalPages) this.allLoaded = false
    //   }, 2000)
	  // },
	  nextPage() {
      this.bottomAjax = true
		  this.currentPage++
		  this.getRecommend()
      /*setTimeout(() => {
	      // console.log('nextPage......')
        // if (this.currentPage === this.totalPages){
	      //   this.bottomAjax = false
        // }
	      this.currentPage++
	      this.getRecommend()
      }, 2500)*/
      // console.log('1111')
      // setTimeout(() => {
		  //   this.$refs.loadmore.onBottomLoaded()
		  //   this.currentPage++
		  //   // console.log('loadBottom.....')
		  //   // if (this.currentPage > this.totalPages) {
		  //   //   this.allLoaded = true
		  //   // } else {
		  //   //
		  //   // }
		  //   this.getRecommend()
		  //   if (this.currentPage >= this.totalPages) this.allLoaded = true
      // }, 1000)
		  // this.allLoaded = true;// 若数据已全部获取完毕
	  }
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /*touch-action: none;*/
  &::-webkit-scrollbar {
    width: 0 !important;
  }

  &-search {
    position: absolute;
    width: 343px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  }
}
</style>
