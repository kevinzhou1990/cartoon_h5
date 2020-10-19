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
      <is-scroll ref="zm-scroll" @on-top-ajax="resfreshPage" :bottom-ajax="bottomAjax" :is-bottom-ajax="isBottomAjax" @to-bottom-ajax="nextPage">
        <div slot="srcoll-main">
          <section v-for="item in recList" :key="item.rec_id">
            <!-- 排行与发现 -->
            <z-m-rank-and-fond-comics v-if="item.style_id === 0"></z-m-rank-and-fond-comics>
            <!-- 首页新漫 -->
            <z-m-new-comics :new-camics-data="item" v-if="item.style_id === 1"></z-m-new-comics>
            <!-- 榜单 -->
            <z-m-rank :rank-data="item" v-if="item.style_id === 7"></z-m-rank>
            <!-- 首页热番 -->
            <z-m-hot-comics :hot-comics-data="item" v-if="item.style_id === 2"></z-m-hot-comics>
            <!-- 专题 -->
            <z-m-special :special-data="item" v-if="item.style_id === 3"></z-m-special>
            <!-- 经典漫画 -->
            <z-m-classics-comics :classics-comics-data="item" v-if="item.style_id === 4"></z-m-classics-comics>
            <!-- 推荐喜欢看的 -->
            <z-m-like-comics :like-comics-data="item" v-if="item.style_id === 5"></z-m-like-comics>
            <!-- 你可能喜欢的 -->
            <z-m-maybe-like-comics :maybe-like-comics="item" v-if="item.style_id === 6"></z-m-maybe-like-comics>
          </section>
          <!-- 无数据了 -->
          <z-m-no-data v-if="isNoMoreData"></z-m-no-data>
        </div>
      </is-scroll>
    </template>
  </div>
</template>

<script>
import isScroll from '@/common/components/scrollAjax/index';
import ZMSearch from './components/search';
import ZMSwiper from '@/common/components/ZMswiper';
import ZMRankAndFondComics from '@/views/home/components/ZMRankAndFondComics';
import ZMNewComics from './components/ZMNewComics';
import ZMRank from '@/views/home/components/ZMRank';
import ZMHotComics from './components/ZMHotComics';
import ZMClassicsComics from './components/ZMClassicsComics';
import ZMLikeComics from './components/ZMLikeComics';
import ZMMaybeLikeComics from './components/ZMMaybeLikeComics';
import ZMNoData from '../../common/components/ZMNoData';
import ZMSpecial from '@/views/home/components/ZMSpecial';
import homeLoading from '@/views/home/components/homeLoading';
// import { getRecommend } from '@/common/api/home';

export default {
  name: 'home',
  components: {
    isScroll,
    ZMSearch,
    ZMSwiper,
    ZMRankAndFondComics,
    ZMNewComics,
    ZMRank,
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
      currentPage: 1, // 当前页
      pageSize: 10, // 一页多少条
      totalPages: 0, // 总页数
      bottomAjax: false, // 是否上拉加载文字
      isBottomAjax: false, // 是否触发上拉加载的回调
      isNoMoreData: false // 是否还有更多数据
    };
  },
  asyncData({ store, route }) {
    store.dispatch('getBanner');
    store.dispatch('getRec');
  },
  computed: {
    // banner list
    bannerList() {
      return this.$store.state.home.bannerList;
    },
    // 楼层list
    recList() {
      return this.$store.state.home.recList;
    }
  },
  methods: {
    /**
     * @info: 获取楼层
     * @author: PengGeng
     * @date: 8/18/20-3:16 下午
     */
    async getRecommend() {
      const reqData = {
        page: this.currentPage + 1,
        page_size: this.pageSize
      };
      this.$store.dispatch('getRec', reqData).then((res) => {
        console.log(res, '-------');
      });
      // const reqData = {
      //   page: this.currentPage,
      //   page_size: this.pageSize
      // };
      // const resData = await getRecommend(reqData);
      // let recList = resData.data.list;
      // this.recList.push(...recList);
      // this.totalPages = resData.data.total_pages || 0;
      // let recData = {};
      // this.recList.length &&
      //   this.recList.map((item, index) => {
      //     if (item.rec_id > 1) {
      //       recData[item.rec_id] = item.name;
      //     }
      //   });
      // if (this.currentPage < resData.data.total_pages) {
      //   this.bottomAjax = true;
      //   this.isBottomAjax = true;
      //   this.isNoMoreData = false;
      // } else {
      //   this.isBottomAjax = false;
      //   this.bottomAjax = false;
      //   this.isNoMoreData = true;
      // }
      // sessionStorage.setItem('SET_REC_DATA', JSON.stringify(recData));
      // this.$store.commit('SET_REC_DATA', recData);
    },
    resfreshPage() {
      this.$refs['zm-scroll'].resetInit();
      this.currentPage = 1;
      this.isNoMoreData = false;
      this.recList = [];
      this.getRecommend();
    },
    nextPage() {
      this.bottomAjax = true;
      this.currentPage++;
      this.getRecommend();
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
