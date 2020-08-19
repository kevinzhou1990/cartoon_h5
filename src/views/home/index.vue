<template>
  <div class="main">
    <!-- 首页搜索组件 -->
    <div class="main-search">
      <z-m-search></z-m-search>
    </div>
    <!-- 首页滑动组件 -->
    <z-m-swiper :bannerList="bannerList"></z-m-swiper>
    <section v-for="item in recList" :key="item.rec_id">
      <!-- 排行与发现 -->
      <div v-if="item.style_id === 1"> 待开发 </div>
      <!-- 首页新漫 -->
      <z-m-new-comics v-if="item.style_id === 1"></z-m-new-comics>
      <!-- 首页热番 -->
      <z-m-hot-comics v-if="item.style_id === 2"></z-m-hot-comics>
      <!-- 经典漫画 -->
      <z-m-classics-comics v-if="item.style_id == 3"></z-m-classics-comics>
      <!-- 推荐喜欢看的组建 -->
      <z-m-like-comics v-if="item.style_id === 4"></z-m-like-comics>
      <!-- 可能喜欢组建 -->
      <z-m-maybe-like-comics v-if="item.style_id === 6 "></z-m-maybe-like-comics>
    </section>
    <!-- 无数据了 -->
    <z-m-no-data></z-m-no-data>
  </div>
</template>

<script>
import ZMSearch from './components/search'
import ZMSwiper from '@/common/components/ZMswiper'
import ZMNewComics from './components/ZMNewComics'
import ZMHotComics from './components/ZMHotComics'
import ZMClassicsComics from './components/ZMClassicsComics'
import ZMLikeComics from './components/ZMLikeComics'
import ZMMaybeLikeComics from './components/ZMMaybeLikeComics'
import ZMNoData from '../../common/components/ZMNoData'
import {getBanner, getRecommend} from '@/common/api/home'

export default {
  name: 'home',
  components: {
    ZMSearch,
    ZMSwiper,
    ZMNewComics,
    ZMHotComics,
    ZMClassicsComics,
    ZMLikeComics,
    ZMMaybeLikeComics,
    ZMNoData
  },
  data() {
    return {
      bannerList: [], // banner
      recList: [] // 楼层list
    }
  },
  mounted() {
    this.getBanner()
    this.getRecommend()
  },
  methods: {
    /**
     * @info: 获取banner的数据
     * @author: PengGeng
     * @date: 8/18/20-3:11 下午
     */
    async getBanner() {
      const resData = await getBanner()
      if (resData.code === 0){
        this.bannerList = resData.data.list || []
      } else {
        this.$toast(resData.msg || '系统出错,请稍后重试')
      }
    },
    /**
     * @info: 获取楼层
     * @author: PengGeng
     * @date: 8/18/20-3:16 下午
     */
    async getRecommend() {
      const resData = await getRecommend()
      this.recList = resData.data.list || []
      console.log(resData)
    }
  }
}
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
      width: 0 !important
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
