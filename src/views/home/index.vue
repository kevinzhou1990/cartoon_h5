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
      <is-scroll
        ref="zm-scroll"
        :top-ajax="topAjax"
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
            <!-- 榜单 -->
            <z-m-rank :rank-data="item" v-if="item.style_id === 7"></z-m-rank>
            <!-- 首页热番 -->
            <z-m-hot-comics :hot-comics-data="item" v-if="item.style_id === 2"></z-m-hot-comics>
            <!-- 专题 -->
            <z-m-special :special-data="item" v-if="item.style_id === 3"></z-m-special>
            <!-- 经典漫画 -->
            <z-m-classics-comics
              :classics-comics-data="item"
              v-if="item.style_id === 4"
            ></z-m-classics-comics>
            <!-- 推荐喜欢看的 -->
            <z-m-like-comics :like-comics-data="item" v-if="item.style_id === 5"></z-m-like-comics>
            <!-- 你可能喜欢的 -->
            <z-m-maybe-like-comics
              :maybe-like-comics="item"
              v-if="item.style_id === 6"
            ></z-m-maybe-like-comics>
          </section>
          <!-- 无数据了 -->
          <z-m-no-data v-if="isNoMoreData"></z-m-no-data>
        </div>
      </is-scroll>
    </template>
    <z-m-home-alert-a-d
      v-if="adData && adData.img"
      v-model="showADFlag"
      :adData="adData"
    ></z-m-home-alert-a-d>
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
import ZMHomeAlertAD from '@/views/home/components/ZMHomeAlertAD';
import { getScreen } from '@/common/api/home';

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
    ZMSpecial,
    ZMHomeAlertAD
  },
  data() {
    return {
      bottomAjax: false, // 是否上拉加载文字
      isBottomAjax: false, // 是否触发上拉加载的回调
      isNoMoreData: false, // 是否还有更多数据
      topAjax: false,
      adData: null,
      showADFlag: false
    };
  },
  asyncData({ store, route }) {
    return Promise.all([
      store.dispatch('home/getBanner'),
      store.dispatch('home/getRec'),
      store.dispatch('home/getRecTab')
    ]);
  },
  computed: {
    // banner list
    bannerList() {
      return this.$store.state.home.bannerList;
    },
    // 楼层list
    recList() {
      return this.$store.state.home.recList;
    },
    // 分页信息
    pageInfo() {
      return this.$store.state.home.pageInfo;
    }
  },
  activated() {
    // 激活首页的时候，重置上拉加载标志
    this.isNoMoreData = !(this.pageInfo.page < this.pageInfo.totalPage);
    this.bottomAjax = this.bottomAjax = this.isBottomAjax =
      this.pageInfo.page < this.pageInfo.totalPage;
    this.isBottomAjax = true;
  },
  mounted() {
    this.bottomAjax = this.isBottomAjax = this.pageInfo.page < this.pageInfo.totalPage;
    this.isNoMoreData = !(this.pageInfo.page < this.pageInfo.totalPage);
    if (Number(sessionStorage.getItem('adDate')) !== Number(new Date().getDate())) {
      this.getData();
    }
  },
  methods: {
    async getData() {
      const resData = await getScreen();
      if (resData && resData.code === 0) {
        this.adData = resData.data.pop_ad;
        if (this.adData) {
          this.showADFlag = true;
        }
      } else {
        this.Toast(resData.msg, { type: 'fail', duration: 2000 });
      }
    },
    getRecommend(pageInfo) {
      this.$store.dispatch('home/getRec', pageInfo).then(res => {
        return res;
      });
    },
    resfreshPage() {
      this.$refs['zm-scroll'].resetInit();
      this.isNoMoreData = false;
      this.getRecommend({ page: 1 });
    },
    nextPage() {
      this.pageInfo.page++;
      if (this.pageInfo.page > this.pageInfo.totalPage) {
        return false;
      }
      this.getRecommend({ page: this.pageInfo.page, page_size: this.pageInfo.page_size });
      this.isNoMoreData = this.pageInfo.page >= this.pageInfo.totalPage;
      this.bottomAjax = !this.isNoMoreData;
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
