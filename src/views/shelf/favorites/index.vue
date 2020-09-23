<template>
  <div>
    <div class="button-container">
      <ul>
        <li v-for="item in tab" :key="item.value" @click="switchTab(item.value)" :class="[active === item.value ? 'on' : '']">{{item.name}}</li>
      </ul>
    </div>
    <div class="main-container">
      <div v-if="active === 'default'">
        <collect-table type="myCollect" :dataList="collectList" v-if="collectList.length > 0"></collect-table>
        <no-collect v-else></no-collect>
      </div>

      <div v-if="active === 'customize'">
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
      collectList: []
      // collectList: [
      //   {
      //     cartoon_id: 1,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试1hfkshdkfhasdkjfhsdjkhfkjsdahfjkhsadfjkhsdajklfs',
      //     publish_status: '更新至第1话',
      //     isUpdate: true,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 2,
      //     cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
      //     title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
      //     publish_status: '更新至第2话',
      //     isUpdate: true,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 3,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试3',
      //     publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 4,
      //     cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
      //     title: '测试4',
      //     publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 5,
      //     cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
      //     title: '测试1hfkshdkfhasdkjfhsdjkhfkjsdahfjkhsadfjkhsdajklfs',
      //     publish_status: '更新至第1话',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 6,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
      //     publish_status: '更新至第2话',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 7,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试3',
      //     publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 8,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试4',
      //     publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 9,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
      //     publish_status: '更新至第2话',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 10,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试3',
      //     publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 11,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试4',
      //     publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
      //     isUpdate: false,
      //     total: '22.5万'
      //   },
      //   {
      //     cartoon_id: 12,
      //     cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
      //     title: '测试4',
      //     publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
      //     isUpdate: false,
      //     total: '22.5万'
      //   }
      // ]
    };
  },
  components: { collectTable, noCollect, customize },
  computed: {
    ...mapState({ active: (state) => state.collect.active })
  },
  methods: {
    ...mapMutations(['updateActive']),
    switchTab(value){
      if (this.active === value) {
        return false;
      }
      this.updateActive(value);
      document.documentElement.scrollTop = 0;
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
      font-family: PingFangSC-Semibold;
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
