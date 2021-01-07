<template>
  <div class="helper box">
    <z-m-header title-text="帮助中心" />
    <z-m-nav-bar
      :tabListData="tabListData"
      :activeIndex="activeIndex"
      @getRecommendData="filterData"
    />
    <ul class="helper-list">
      <li
        class="helper-item"
        v-for="(item, index) in qalist"
        :key="index"
        @click="toDetail(item.help_id)"
      >
        <div class="zm-b-b flex">
          <div class="flex-1">
            <div class="helper-item-q">问：{{ item.question }}</div>
            <div class="helper-item-a">
              <div>答：{{ item.answer }}</div>
            </div>
          </div>
          <div class="flex div-icon">
            <svg-icon icon-class="more_bb" size="small" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import ZMNavBar from '@/common/components/ZMNavBar';
import SvgIcon from '@/common/components/svg';
export default {
  data() {
    return {};
  },
  components: { ZMHeader, ZMNavBar, SvgIcon },
  mounted() {
    this.$store.dispatch('help/getHelpList').then(res => {
      this.filterData(this.activeIndex);
    });
  },
  computed: {
    tabListData() {
      return this.$store.state.help.tabListData;
    },
    qalist() {
      return this.$store.state.help.list;
    },
    activeIndex() {
      return this.$store.state.help.activeIndex;
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: '/help/detail', query: { id } });
    },
    filterData(key) {
      this.$store.commit('recommend/UPDATE_SEC_ID', parseInt(key));
      // this.$store.commit('UPDATE_ACTIVED_INDEX', parseInt(key));
      this.$store.commit('help/HELP_LIST_FILTER', key);
    }
  }
};
</script>

<style lang="scss" scoped>
.helper {
  .helper-list {
    .helper-item {
      padding: 16px 0 0px 16px;
      font-size: 12px;
      & > div {
        padding-bottom: 16px;
      }
    }
  }
  & >>> .scroll-box {
    top: 44px !important;
  }
  .flex {
    display: flex;
    .flex-1 {
      flex: 1;
    }
  }
  .div-icon {
    align-items: center;
    padding-right: 16px;
  }
  .helper-item-q {
    color: #222222;
    margin-bottom: 8px;
  }
  .helper-item-a {
    color: #999999;
    font-size: 10px;
    max-width: 311px;
    & > div {
      width: calc(100% * 1.16);
      transform: scale(0.84);
      transform-origin: 0 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
