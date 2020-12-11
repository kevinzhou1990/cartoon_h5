<template>
  <div class="filter-component" ref="filter">
    <div class="filter-tags zm-b-b" ref="tag">
      <span
        @click="updateFilter('tag', item)"
        v-for="item in tags"
        :key="item.tag_id"
        :class="`${item.tag_id === checked.tag_id ? 'active' : ''}`"
        >{{ item.name }}</span
      >
      <span
        class="filter-tag-actived"
        :style="{
          left: `${tagActived.left}px`,
          top: `${tagActived.top}px`,
          width: `${tagActived.width}px`
        }"
      ></span>
    </div>
    <div class="filter-pleace zm-b-b">
      <span
        @click="updateFilter('place', item)"
        v-for="item in places"
        :key="item.tag_id"
        :class="`${item.tag_id === checked.place_id ? 'active' : ''}`"
        >{{ item.name }}</span
      >
      <span
        class="filter-tag-actived"
        :style="{
          left: `${placeActived.left}px`,
          top: `${placeActived.top}px`,
          width: `${placeActived.width}px`
        }"
      ></span>
    </div>
    <div class="filter-status zm-b-b">
      <span
        v-for="item in status"
        @click="updateFilter('status', item)"
        :key="item.id"
        :class="`${item.id === checked.status ? 'active' : ''}`"
        >{{ item.name }}</span
      >
      <span
        class="filter-tag-actived"
        :style="{
          left: `${statusActived.left}px`,
          top: `${statusActived.top}px`,
          width: `${statusActived.width}px`
        }"
      ></span>
    </div>
    <div class="filter-sort zm-b-b">
      <span
        v-for="item in sort"
        @click="updateFilter('sort', item)"
        :key="item.id"
        :class="`${item.id === checked.sort ? 'active' : ''}`"
        >{{ item.name }}</span
      >
      <span
        class="filter-tag-actived"
        :style="{
          left: `${sortActived.left}px`,
          top: `${sortActived.top}px`,
          width: `${sortActived.width}px`
        }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscoveryFilter',
  computed: {
    status() {
      return this.$store.state.discovery.status;
    },
    places() {
      return this.$store.state.discovery.places;
    },
    sort() {
      return this.$store.state.discovery.sort;
    },
    tags() {
      return this.$store.state.discovery.tags;
    },
    checked() {
      return this.$store.state.discovery.checked;
    }
  },
  data() {
    return {
      tagActived: {
        left: 26,
        top: 18,
        width: 0
      },
      placeActived: {
        left: 26,
        top: 18,
        width: 0
      },
      statusActived: {
        left: 26,
        top: 18,
        width: 0
      },
      sortActived: {
        left: 26,
        top: 18,
        width: 0
      }
    };
  },
  mounted() {
    // 获取默认active的位置，设置给tag
    // console.log(this.$refs.tag.clientHeight);
    // this.$nextTick(() => {
    //   const ele = this.$refs.tag.querySelector('.active');
    //   console.log(ele);
    //   if (ele) {
    //     this.tagActived = { left: ele.offsetLeft, top: ele.offsetTop, width: ele.clientWidth };
    //   }
    //   console.log(this.$refs.filter.clientHeight);
    // });
    setTimeout(() => {
      this.$parent.getFilterHeight(this.$refs['filter'].clientHeight);
      const tags = this.$refs['tag'];
      const ele = tags.querySelector('span.active');
      this.$parent.getFilterHeight(this.$refs['filter'].clientHeight);
      if (ele) {
        this.tagActived = { left: ele.offsetLeft, top: ele.offsetTop, width: ele.clientWidth };
      }
    }, 100);
  },

  methods: {
    /**
     * update filter ,更新筛选条件
     * @param {String} type 条件类型，tag,标签；place,国家；status，状态；sort，排序
     * @param {Object} data 携带被点击标签的数据
     */
    updateFilter(type, data) {
      // 获取点击事件的标签，移动active tag的位置
      const ele = event.srcElement;
      let d = {};
      switch (type) {
        case 'tag':
        default:
          this.tagActived = { left: ele.offsetLeft, top: ele.offsetTop, width: ele.clientWidth };
          this.$store.commit('discovery/UPDATECHECKED', { tag_id: '' });
          d = { tag_id: data.tag_id };
          break;
        case 'place':
          this.placeActived = { left: ele.offsetLeft, top: ele.offsetTop, width: ele.clientWidth };
          this.$store.commit('discovery/UPDATECHECKED', { place_id: '' });
          d = { place_id: data.tag_id };
          break;
        case 'status':
          this.statusActived = { left: ele.offsetLeft, top: ele.offsetTop, width: ele.clientWidth };
          this.$store.commit('discovery/UPDATECHECKED', { status: '' });
          d = { status: data.id };
          break;
        case 'sort':
          this.sortActived = { left: ele.offsetLeft, top: ele.offsetTop, width: ele.clientWidth };
          this.$store.commit('discovery/UPDATECHECKED', { sort: '' });
          d = { sort: data.id };
          break;
      }
      setTimeout(() => {
        this.$store.commit('discovery/UPDATECHECKED', d);
      }, 300);
    }
  },
  beforeDestroy() {
    console.log('=====components desctroy');
  }
};
</script>

<style lang="scss" scoped>
.filter-component {
  font-family: 'pingfang-blod';
  position: fixed;
  background: #fff;
  z-index: 1;
  span {
    display: inline-block;
    padding: 4px 8px;
    font-size: 12px;
    color: #bbb;
    margin-right: 5px;
    margin-bottom: 8px;
    &.active {
      color: #fff;
      border-radius: 4px;
      background: #12e079;
    }
    &.filter-tag-actived {
      position: absolute;
      border-radius: 4px;
      box-sizing: border-box;
      height: 20px;
      background: #12e079;
      transition-property: width, left, top;
      transition-duration: 0.3s;
      transition-timing-function: linear;
      z-index: -1;
    }
  }
  & > div {
    padding: 16px 24px 8px 24px;
    position: relative;
  }
}
</style>
