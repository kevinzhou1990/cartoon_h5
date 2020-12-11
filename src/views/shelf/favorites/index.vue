<template>
  <div>
    <div class="button-container">
      <ul>
        <li
          v-for="item in tab"
          :key="item.value"
          @click="switchTab(item.value)"
          :class="[active === item.value ? 'on' : '']"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="main-container">
      <div v-if="active === 'default'">
        <collect-table
          type="myCollect"
          refId="0"
          :dataList="collectList"
          v-if="collectList.length"
          :class="collectList.length ? 'animation-active-in' : 'animation-active-out'"
        ></collect-table>

        <no-collect
          v-else-if="!collectList.length && !isLoading"
          :dataList="hotList"
          :class="!collectList.length ? 'animation-active-in' : 'animation-active-out'"
        ></no-collect>
      </div>

      <div v-else-if="active === 'customize'" class="animation-active-in">
        <customize :customizeList="customizeList" v-if="customizeList.length"></customize>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import collectTable from './components/collectTable';
import noCollect from './components/noCollect';
import customize from './customize/index';
import { getCartoonByGroup, getGroupList } from '@/common/api/shelf';
import shelfMixin from '../mixin';
export default {
  name: 'favorite',
  mixins: [shelfMixin],
  data() {
    return {
      tab: [
        {
          name: '默认收藏',
          value: 'default'
        },
        {
          name: '自定义收藏',
          value: 'customize'
        }
      ],
      collectList: [],
      hotList: [],
      isLoading: true,
      customizeList: []
    };
  },
  components: { collectTable, noCollect, customize },
  computed: {
    ...mapState({ active: state => state.collect.active })
  },
  mounted() {
    this.tabActive();
  },
  methods: {
    ...mapMutations(['collect/updateActive']),
    switchTab(value) {
      if (this.active === value) {
        return false;
      }
      this['collect/updateActive'](value);
      this.tabActive();
      document.documentElement.scrollTop = 0;
    },
    //判断tab
    tabActive() {
      if (this.active === 'default') {
        this.getDefaultCollect();
      } else {
        this.getGroup();
      }
    },
    //获取默认收藏
    async getDefaultCollect() {
      this.isLoading = true;
      const data = await getCartoonByGroup(0);
      this.emitData(data.code);
      this.isLoading = false;
      if (data.code === 0) {
        this.collectList = data.data.cartoon_list;
        this.hotList = data.data.hot_list;
      } else {
        this.noLoginToast(data);
      }
    },
    //获取自定义收藏列表
    async getGroup() {
      const data = await getGroupList();
      this.emitData(data.code);
      if (data.code === 0) {
        this.customizeList = data.data.list;
      } else {
        this.noLoginToast(data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$BUTTONHEIGHT: 36px;
$BUTTONPADDING: 16px;
.button-container {
  text-align: center;
  padding: 16px;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  background: #ffffff;
  width: 100%;
  height: $BUTTONHEIGHT;
  z-index: 10;
  ul {
    font-family: 'pingfang-blod';
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    width: 200px;
    background: #f5f5f5;
    border-radius: 4px;
    li {
      color: #bbbbbb;
      display: inline-block;
      width: 100px;
      height: $BUTTONHEIGHT;
      background: #f5f5f5;
      line-height: $BUTTONHEIGHT;
      border-radius: 4px;
      transition: background-color 0.2s, color 0.2s;
    }
    li.on {
      color: #222222;
      position: relative;
      background: #ffffff;
      transition: background-color 0.4s, color 0.3s;
      &:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        border: 1px solid #eeeeee;
        height: 194%;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-radius: 8px;
      }
    }
  }
}
.main-container {
  padding-top: calc(#{$BUTTONHEIGHT} + #{$BUTTONPADDING} + #{$BUTTONPADDING / 2});
}
</style>
