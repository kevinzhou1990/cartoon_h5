<template>
  <div class="main">
    <home-loading v-if="!recList.length"></home-loading>
    <div v-else>
      <!-- 首页搜索组件 -->
      <div class="main-search">
        <z-m-search></z-m-search>
      </div>
      <!-- 首页滑动组件 -->
      <z-m-swiper :bannerList="bannerList"></z-m-swiper>
      <section v-for="item in recList" :key="item.rec_id">
        <!-- 排行与发现 -->
        <z-m-rank-and-fond-comics v-if="item.style_id === 0"></z-m-rank-and-fond-comics>
        <!-- 首页新漫 -->
        <z-m-new-comics :new-camics-data="item" v-if="item.style_id === 1"></z-m-new-comics>
        <!-- 首页热番 -->
        <z-m-hot-comics :hot-comics-data="item" v-if="item.style_id === 2"></z-m-hot-comics>
        <!-- 经典漫画 -->
        <z-m-classics-comics :classics-comics-data="item" v-if="item.style_id === 4"></z-m-classics-comics>
        <!-- 推荐喜欢看的 -->
        <z-m-like-comics :like-comics-data="item" v-if="item.style_id === 5"></z-m-like-comics>
        <!-- 你可能喜欢的 -->
        <z-m-maybe-like-comics :maybe-like-comics="item" v-if="item.style_id === 6 "></z-m-maybe-like-comics>
      </section>
      <!-- 无数据了 -->
      <z-m-no-data></z-m-no-data>
    </div>
  </div>
</template>

<script>
import ZMSearch from './components/search';
import ZMSwiper from '@/common/components/ZMswiper';
import ZMRankAndFondComics from '@/views/home/components/ZMRankAndFondComics';
import ZMNewComics from './components/ZMNewComics';
import ZMHotComics from './components/ZMHotComics';
import ZMClassicsComics from './components/ZMClassicsComics';
import ZMLikeComics from './components/ZMLikeComics';
import ZMMaybeLikeComics from './components/ZMMaybeLikeComics';
import ZMNoData from '../../common/components/ZMNoData';
import homeLoading from '@/views/home/components/homeLoading'
import { getBanner, getRecommend } from '@/common/api/home';

export default {
  name: 'home',
  components: {
    ZMSearch,
    ZMSwiper,
    ZMRankAndFondComics,
    ZMNewComics,
    ZMHotComics,
    ZMClassicsComics,
    ZMLikeComics,
    ZMMaybeLikeComics,
    ZMNoData,
	  homeLoading
  },
  data() {
    return {
      bannerList: [], // banner
      recList: [] // 楼层list
    };
  },
  mounted() {
    this.getBanner();
    this.getRecommend();
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
      const resData = await getRecommend();
      this.recList = resData.data.list || [];
      let recData = {};
      this.recList.length &&
        this.recList.map((item, index) => {
          if (item.rec_id > 1) {
            recData[item.rec_id] = item.name;
          }
        });
      sessionStorage.setItem('SET_REC_DATA', JSON.stringify(recData));
      this.$store.commit('SET_REC_DATA', recData);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

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
