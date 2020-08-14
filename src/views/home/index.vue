<template>
  <div class="main">
    <!-- 首页搜索组件 -->
    <div class="main-search">
      <z-m-search></z-m-search>
    </div>
    <!-- 首页滑动组件 -->
    <z-m-swiper></z-m-swiper>
    <!-- 首页新漫 -->
    <z-m-new-comics></z-m-new-comics>
    <!-- 首页热番 -->
    <z-m-hot-comics></z-m-hot-comics>
    <!-- 经典漫画 -->
    <z-m-classics-comics></z-m-classics-comics>
    <!-- 推荐喜欢看的组建 -->
    <z-m-like-comics></z-m-like-comics>
    <!-- 可能喜欢组建 -->
    <z-m-maybe-like-comics></z-m-maybe-like-comics>
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
  beforeMount() {
    console.log('jinlailema .....')
  },
  mounted() {},
  methods: {}
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
    &::-webkit-scrollbar { width: 0 !important }
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
