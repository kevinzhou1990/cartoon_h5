<template>
  <div>
    <div class="button-container">
      <ul>
        <li v-for="item in tab" :key="item.value" @click="switchTab(item.value)" :class="[active === item.value ? 'on' : '']">{{item.name}}</li>
      </ul>
    </div>
    <div class="main-container">
      <div v-if="active === 'default'">
        <collect-table type="myCollect" :dataList="collectList" v-if="collectList.length > 0" :class="collectList.length > 0 ? 'animation-active-in' : 'animation-active-out'"></collect-table>
        <no-collect v-else :dataList="hotList" :class="collectList.length === 0 ? 'animation-active-in' : 'animation-active-out'"></no-collect>
      </div>

      <div v-if="active === 'customize'" :class="active === 'customize' ? 'animation-active-in' : 'animation-active-out'">
        <customize></customize>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import collectTable from './components/collectTable'
import noCollect from './components/noCollect'
import customize from './customize/index'
import { getCartoonByGroup } from '@/common/api/shelf'
export default {
  name: 'favorite',
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
      hotList: []
    };
  },
  components: { collectTable, noCollect, customize },
  computed: {
    ...mapState({ active: (state) => state.collect.active })
  },
  mounted() {
    this.getDefaultCollect()
  },
  methods: {
    ...mapMutations(['updateActive']),
    switchTab(value){
      if (this.active === value) {
        return false;
      }
      this.updateActive(value);
      this.getDefaultCollect();
      document.documentElement.scrollTop = 0;
    },
    async getDefaultCollect(){
      if (this.active === 'default'){
        const data = await getCartoonByGroup(0);
        if (data.code === 0) {
          this.collectList = data.data.cartoon_list;
          this.hotList = data.data.hot_list;
        } else {
          this.$toast(data.msg || '系统出错,请稍后重试');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  $BUTTONHEIGHT: 36px;
  $BUTTONPADDING: 16px;
  .button-container{
    text-align: center;
    padding: 16px;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    background: #FFFFFF;
    width: 100%;
    height: $BUTTONHEIGHT;
    z-index: 10;
    ul{
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
        transition: background-color .2s, color .2s;
      }
      li.on{
        color: #222222;
        position: relative;
        background: #FFFFFF;
        transition: background-color .4s, color .3s;
        &:before {
          content: " ";
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
  .main-container{
    padding-top: calc(#{$BUTTONHEIGHT} + #{$BUTTONPADDING * 2});
  }
</style>
