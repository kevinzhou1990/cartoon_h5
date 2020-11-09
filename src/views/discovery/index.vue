<template>
  <div
    class="discovery-page"
    @touchstart="handlerTouchstart"
    @touchend="handlerTouchend"
    @touchmove="handlerTouchMove"
  >
    <z-m-header :title-text="titleText" show-right has-border>
      <div slot="right" class="title-right" @click="toSearch">
        <svg-icon size="default" icon-class="search_aa" />
      </div>
    </z-m-header>
    <discovery-filter ref="discoveryFilter" />
    <div
      class="discovery-comics-list"
      ref="list"
      :style="{ marginTop: `${listTop}px` }"
      :class="scrollToTop ? 'discovery-comics-list-top' : ''"
    >
      <div class="discovery-filter-result" ref="filterText" @click="handlerScrollToTop">
        <i class="discovery-filter-icon-loading" v-if="loadingStatus" />
        <span>当前筛选：{{ filterText }}</span>
      </div>
      <div class="discovery-filter-list" :style="`transform:translate(0, ${touchPos.moveY}px)`">
        <!-- <div class="discovery-update">
          <span>下拉刷新</span>
        </div>-->
        <ul ref="fliterResult" v-if="comicsList.length">
          <li v-for="(item, index) in comicsList" :key="index">
            <comics :comics="item" />
          </li>
        </ul>
        <div class="discovery-nodata" v-else>
          <img src="@/assets/img/network.png" alt="无数据" />
        </div>
      </div>
      <div class="loading" ref="loading">
        <span>{{ comicsList.length ? loadingTxt : '没有找到这样的漫画~' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import DiscoveryFilter from './components/filter';
import Comics from './components/comics';
import { throttle } from '@/lib/utils';
export default {
  name: 'Discovery',
  components: {
    ZMHeader,
    SvgIcon,
    DiscoveryFilter,
    Comics
  },
  computed: {
    checked() {
      return this.$store.state.discovery.checked;
    },
    comicsList() {
      return this.$store.state.discovery.comicsList;
    },
    totalPage() {
      return this.$store.state.discovery.totalPage;
    }
  },
  asyncData({ store, route }) {
    return Promise.all([
      store.dispatch('getFilterItem'),
      store.dispatch('getComicsList', { ...store.state.discovery.checked, page: 1 })
    ]);
  },
  data() {
    return {
      titleText: '发现',
      page: 1,
      filterText: '全部·全部·连载·人气推荐',
      listTop: 2,
      scrollHandler: () => {},
      // 是否滚动到了顶部
      scrollToTop: false,
      loadingTxt: '加载中······',
      // 手指touch
      touchPos: {
        startY: 0,
        moveY: 0
      },
      loadingStatus: false
    };
  },
  mounted() {
    // 监听滚动事件，列表距头部小于等于48px，筛选条件贴边
    console.log('dddd');
    this.scrollHandler = throttle(this.handlerScroll, 100, this);
    window.addEventListener('scroll', this.scrollHandler, false);
  },
  watch: {
    checked: {
      handler: function(n, o) {
        if (n.tag_id !== '' && n.place_id !== '' && n.status !== '' && n.sort !== '') {
          this.getComics(n, 1);
          const s = this.$store.state.discovery.status.filter(item => {
            return item.id === n.status;
          });
          const sort = this.$store.state.discovery.sort.filter(item => {
            return item.id === n.sort;
          });
          const p = this.$store.state.discovery.places.filter(item => {
            if (item) {
              return item.tag_id === n.place_id;
            }
          });
          const t = this.$store.state.discovery.tags.filter(item => {
            if (item) {
              return item.tag_id === n.tag_id;
            }
          });
          this.page = 1;
          // 筛选出全部，合并
          let allText = '全部';
          let otherText = '';
          if (t[0].tag_id !== 0) {
            otherText += `·${t[0].name}`;
          }
          if (p[0].tag_id !== 0) {
            otherText += `·${p[0].name}`;
          }
          if (s[0].id !== 0) {
            otherText += `·${s[0].name}`;
          }
          otherText += `·${sort[0].name}`;
          this.filterText = `${
            t[0].tag_id !== 0 && p[0].tag_id !== 0 && s[0].id !== 0 ? '' : allText
          }${otherText}`;
        }
      },
      deep: true
    }
  },
  methods: {
    async getComics(filter, page) {
      this.loadingStatus = true;
      await this.$store.dispatch('getComicsList', { ...filter, page, page_size: 30 });
      this.page = this.page + 1;
      setTimeout(() => {
        this.loadingStatus = false;
      }, 300);
    },
    getFilterHeight(height) {
      this.listTop = height;
    },
    handlerScroll() {
      const scrollTop = this.$refs.fliterResult.getBoundingClientRect().top;
      this.scrollToTop = scrollTop <= 94;
      // 当加载下一页提示在可见区域，加载下一页
      const loading = this.$refs.loading.getBoundingClientRect().top;
      if (loading < innerHeight + 40) {
        // const page = this.page + 1;
        if (this.page > this.totalPage) {
          this.loadingTxt = '不要再扯了，真的没有了～';
          return false;
        }
        this.getComics(this.checked, this.page);
      }
    },
    handlerTouchstart() {
      const t = document.scrollingElement.scrollTop;
      const scrollTop = this.$refs.filterText.getBoundingClientRect().top;
      if (t <= 0) {
        console.log(scrollTop, 'touchstart');
        this.touchPos.startY = event.changedTouches[0].pageY;
      }
    },
    handlerTouchMove() {
      const m = event.changedTouches[0].pageY - this.touchPos.startY;
      const scrollTop = this.$refs.list.getBoundingClientRect().top;
      const fh = this.$refs.discoveryFilter.$el.clientHeight;
      console.log(scrollTop, '------', fh, m, this.touchPos.startY);
      if (m <= 70 && m > 0) {
        this.touchPos.moveY = m;
      } else {
        this.touchPos.moveY = 0;
      }
    },
    handlerTouchend() {
      this.touchPos.moveY = 0;
      const scrollTop = this.$refs.list.getBoundingClientRect().top;
      const fh = this.$refs.discoveryFilter.$el.clientHeight;
      if (scrollTop >= fh + 48) {
        if (event.changedTouches[0].pageY - this.touchPos.startY > 0) {
          this.page = 1;
          this.getComics(this.checked, 1);
        }
      }
    },
    handlerScrollToTop() {
      const scrollTop = document.scrollingElement.scrollTop;
      const filterHeight = this.$refs.discoveryFilter.$el.clientHeight;
      if (scrollTop >= filterHeight) {
        document.scrollingElement.scrollTop = 0;
      }
    },
    toSearch() {
      this.$router.push('/ZMSearch');
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, false);
  }
};
</script>

<style lang="scss" scoped>
.discovery-page {
  padding-top: 44px;
  .discovery-comics-list {
    padding: 0 16px;
    background: #fff;
    position: relative;
    z-index: 2;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    &.discovery-comics-list-top {
      padding-top: 44px;
      .discovery-filter-result {
        position: fixed;
        top: 44px;
        left: 0;
        z-index: 4;
        width: 100%;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 8px 8px;
      }
    }
    li {
      float: left;
      margin-right: 8px;
      padding-bottom: 16px;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
    ul {
      &::after {
        display: block;
        content: '';
        clear: both;
      }
    }
    .loading {
      height: 40px;
      line-height: 40px;
      text-align: center;
      span {
        display: inline-block;
        color: #bbb;
      }
    }
    .discovery-update {
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      margin-top: -30px;
      z-index: 1;
      span {
        display: inline-block;
        font-size: 10px;
        transform: scale(0.83);
        transform-origin: 0;
      }
    }
  }
  .discovery-filter-result {
    height: 46px;
    line-height: 46px;
    width: 100%;
    background: #fff;
    font-family: 'pingfang-blod';
    text-align: center;
    color: #999;
    position: relative;
    z-index: 3;
    span {
      display: inline-block;
      font-size: 10px;
      transform: scale(0.83);
    }
  }
  .discovery-filter-icon-loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../assets/img/load_ba.png') no-repeat 0 0 transparent;
    background-size: 100%;
    vertical-align: middle;
    animation: roates 1s linear infinite;
    position: relative;
    left: 15px;
  }
  @keyframes roates {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .discovery-nodata {
    img {
      width: 100%;
    }
  }
}
</style>
