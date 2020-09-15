<template>
  <div class="discovery-page">
    <z-m-header :title-text="titleText" show-right has-border>
      <div slot="right" class="title-right">
        <svg-icon size="default" icon-class="search_aa" />
      </div>
    </z-m-header>
    <discovery-filter />
    <div class="discovery-comics-list">
      <div class="discovery-filter-result">
        <span>当前筛选：{{filterText}}</span>
      </div>
      <ul>
        <li v-for="item in comicsList" :key="item.cartoon_id">
          <comics :comics="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import DiscoveryFilter from './components/filter';
import Comics from './components/comics';
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
    }
  },
  data() {
    return { titleText: '发现', page: 1, filterText: '全部·全部·连载·人气推荐' };
  },
  mounted() {},
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
          // const
          console.log(s, sort);
          // const s = this.$store.state.discovery.status.filter((item) => {
          //   return (item.id = n.status);
          // });
          // const status = this.$store.state.discovery.status.filter((item) => {
          //   item.id = n.status;
          // });
          // console.log(s, '------status');
        }
      },
      deep: true
    }
  },
  methods: {
    getComics(filter, page) {
      this.$store.dispatch('getComicsList', { ...filter, page: this.page });
    }
  }
};
</script>

<style lang="scss" scoped>
.discovery-page {
  padding-top: 44px;
  .discovery-comics-list {
    padding: 0 16px;
    li {
      float: left;
      margin-right: 8px;
      padding-bottom: 16px;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }
  .discovery-filter-result {
    height: 46px;
    line-height: 46px;
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
