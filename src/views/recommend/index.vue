<template>
  <div class="box">
    <div>
      <z-m-header :title-text="titleText" show-right>
        <div slot="right" class="right-change">
          <div class="icon-bg" :class="isLightIcon ? 'trl-l': 'trl-r' "></div>
        </div>
      </z-m-header>
      <div style="z-index: 999;" :class="isLightIcon ? 'icon-l-g': 'icon-l-g-l' " @click="handleClickLightIcon"></div>
      <div style="z-index: 999;" :class="isLightIcon ? 'icon-l-g-r': 'icon-r-g' " @click="handleClickLightIcon"></div>
    </div>
    <div class="nav-bar">
      <z-m-nav-bar></z-m-nav-bar>
    </div>
    <div v-if="showDataFlag">
      <z-m-table v-if="isLightIcon"></z-m-table>
      <z-m-list v-else></z-m-list>
    </div>
    <div v-else>
      <z-m-not-network></z-m-not-network>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import ZMNotNetwork from '@/common/components/noNetwork'
import ZMNavBar from './components/ZMNavBar'
import ZMTable from './components/ZMTable'
import ZMList from './components/ZMList'

export default {
  name: 'recommentd',
  components: {
    ZMHeader,
    ZMNavBar,
    ZMTable,
    ZMList,
    ZMNotNetwork
  },
  data() {
    return {
      titleText: '更多推荐',
      isLightIcon: false, // false 右边高亮  true 左边高亮
      listBb: require('./images/list_bb.png'),
      listBa: require('./images/list_ba.png'),
      blockBb: require('./images/block_bb.png'),
      blockBa: require('./images/block_ba.png'),
      showDataFlag: false // 显示是否显示没有网络的情况
    }
  },
  computed: {
    /**
     * @info: 判断显示的图标
     * @author: PengGeng
     * @date: 8/8/20-10:12 上午
     */
    showLightBgIcon() {
      if (this.isLightIcon) {
        return [this.listBb, this.blockBa]
      } else {
        return [this.listBa, this.blockBb]
      }
    }
  },
  methods: {
    handleClickLightIcon() {
      this.isLightIcon = !this.isLightIcon
      console.log('to do something。。。。')
    }
  }
}
</script>

<style lang="scss" scoped>
  $imgUrl: './images/';
  $imgName: block_bb !default;
  $xLineLength: 3px!default;
  @mixin imgSet($imgName) {
    background: url(./images/#{$imgName}.png) no-repeat;
    background-size: 100%;
    transition: all 0.6s ease-in-out;
  }
  @mixin iconBg {
    position: fixed;
    display: block;
    top: 10px;
    width: 16px;
    height: 16px;
    margin-top: 4px;
  }
  @mixin trans($xLineLength: 3px) {
    transition: transform .3s;
    transform: translateX(#{$xLineLength}px);
  }
  .right-change {
    overflow: hidden;
    display: flex;
    width: 44px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    margin: 10px 0;
    background: #E6E6E6;
  }
  .icon-bg {
    margin: 3px 0 3px 0;
    width: 18px;
    height: 18px;
    background: #ffffff;
    border-radius: 50%;
    /*&:before {*/
    /*  background: #ffffff;*/
    /*  transition: transform .3s;*/
    /*  transform: translateX(18px);*/
    /*}*/
    /*&:after {*/
    /*  background: #ffffff;*/
    /*  transition: transform .3s;*/
    /*  transform: translateX(18px);*/
    /*}*/
  }
  .trl-l {
    @include trans(22)
  }
  .trl-r {
    @include trans(3)
  }
  .icon-l-g {
    @include iconBg;
    right: 40px;
    transition:  all .3s ease-in-out;
    background: url("./images/list_bb.png") no-repeat;
    background-size: 100%;
  }
  .icon-r-g {
    @include iconBg;
    right: 20px;
    transition:  all .3s ease-in-out;
    background: url("./images/block_bb.png") no-repeat;
    background-size: 100%;
  }
  .icon-l-g-l {
    right: 40px;
    @include iconBg;
    @include imgSet(list_ba)
    /*background: url("./images/list_ba.png") no-repeat;*/
    /*background-size: 100%;*/
    /*transition: all 0.8s ease-in-out;*/
  }
  .icon-l-g-r {
    right: 20px;
    @include iconBg;
    @include imgSet(block_ba)
    /*background: url("./images/block_ba.png") no-repeat;*/
    /*background-size: 100%;*/
    /*transition: all 0.8s ease-in-out;*/
  }
  .nav-bar {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 56px;
    box-sizing: border-box;
  }
</style>
