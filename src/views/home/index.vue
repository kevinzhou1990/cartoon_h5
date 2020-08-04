<template>
  <div class="main">
    <div class="main-search">
      <z-m-search></z-m-search>
    </div>
    <z-m-swiper></z-m-swiper>
    <z-m-new-comics></z-m-new-comics>
    <z-m-hot-comics></z-m-hot-comics>
  </div>
</template>

<script>
// import Contents from '@/common/components/contents';
import ZMSearch from './components/search'
import ZMSwiper from './components/ZMswiper'
import ZMNewComics from './components/ZMNewComics'
import ZMHotComics from './components/ZMHotComics'
export default {
  name: 'home',
  components: {
    ZMSearch,
    ZMSwiper,
    ZMNewComics,
    ZMHotComics
  },
  mounted() {},
  methods: {
    test() {
      alert('test');
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
    overflow-x: hidden;
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
