<template>
  <div class="discovery-page">
    <z-m-header :title-text="titleText" show-right has-border>
      <div slot="right" class="title-right">
        <svg-icon size="default" icon-class="search_aa" />
      </div>
    </z-m-header>
    <discovery-filter ref="discoveryFilter" />
    <div
      class="discovery-comics-list"
      :style="{marginTop:`${listTop}px`}"
      :class="scrollToTop ? 'discovery-comics-list-top' : ''"
      @touchstart="handlerTouchstart"
      @touchend="handlerTouchend"
    >
      <div class="discovery-filter-result">
        <span>当前筛选：{{filterText}}</span>
      </div>
      <ul ref="fliterResult">
        <li v-for="(item,index) in comicsList" :key="index">
          <comics :comics="item" />
        </li>
      </ul>
      <div class="loading" ref="loading">
        <span>{{loadingTxt}}</span>
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
  data() {
    return {
      titleText: '发现',
      page: 1,
      filterText: '全部·全部·连载·人气推荐',
      listTop: 2,
      scrollHandler: throttle(this.handlerScroll, 100, this),
      // 是否滚动到了顶部
      scrollToTop: false,
      loadingTxt: '加载中······'
    };
  },
  mounted() {
    // 监听滚动事件，列表距头部小于等于48px，筛选条件贴边
    window.addEventListener('scroll', this.scrollHandler, false);
  },
  watch: {
    checked: {
      handler: function (n, o) {
        if (n.tag_id !== '' && n.place_id !== '' && n.status !== '' && n.sort !== '') {
          this.getComics(n, 1);
          const s = this.$store.state.discovery.status.filter((item) => {
            return item.id === n.status;
          });
          const sort = this.$store.state.discovery.sort.filter((item) => {
            return item.id === n.sort;
          });
          const p = this.$store.state.discovery.places.filter((item) => {
            if (item) {
              return item.tag_id === n.place_id;
            }
          });
          const t = this.$store.state.discovery.tags.filter((item) => {
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
          this.filterText = `${allText}${otherText}`;
        }
      },
      deep: true
    }
  },
  methods: {
    getComics(filter, page) {
      this.$store.dispatch('getComicsList', { ...filter, page });
      this.page = this.page + 1;
    },
    getFilterHeight(height) {
      this.listTop = height;
    },
    handlerScroll() {
      const scrollTop = this.$refs.fliterResult.getClientRects()[0].top;
      this.scrollToTop = scrollTop <= 94;
      // 当加载下一页提示在可见区域，加载下一页
      const loading = this.$refs.loading.getClientRects()[0].top;
      console.log(document.scrollingElement.classList);
      if (loading < innerHeight + 40) {
        const page = this.page + 1;
        if (page > this.totalPage) {
          this.loadingTxt = '不要在扯拉，真的没有了～～～～';
          return false;
        }
        this.getComics(this.checked, page);
      }
    },
    handlerTouchstart() {
      const scrollTop = this.$refs.fliterResult.getClientRects()[0].top;
      console.log(scrollTop, this.listTop);
      // if (scrollTop > this.listTop + 48) {
      //   event.preventDefault();
      // }
      // event.preventDefault();
    },
    handlerTouchend() {}
  }
};
</script>

<style lang="scss" scoped>
.discovery-page {
  padding-top: 44px;
  .discovery-comics-list {
    // touch-action: none;
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
  }
  .discovery-filter-result {
    height: 46px;
    line-height: 46px;
    width: 100%;
    background: #fff;
    font-family: 'pingfang-blod';
    text-align: center;
    color: #999;
    span {
      display: inline-block;
      font-size: 10px;
      transform: scale(0.83);
    }
  }
}
</style>
