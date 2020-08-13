<template>
  <div class="box main">
    <z-m-header
        :title-text="titleText"
        :background-color="headerBgColor"
        show-right
        :show-nav-flag="showNavFlag"
    >
      <div slot="right" :class="showNavFlag ? 'header-right-white': 'header-right'" @click="handleClickShare"></div>
    </z-m-header>
    <!--    <div style="position: relative;">-->
    <!--      <div style="position:fixed; z-index: 2; top: 30px; height: 100px; background: red; width: 100%;">1</div>-->
    <!--      <div style="position: absolute; top: 500px; height: 1000px; width: 100%; background: #BBBBBB; z-index: 5;">2</div>-->
    <!--    </div>-->
    <section class="main-content" :style="{background: headerBgColor}">
      <div class="main-content-box">
        <div class="main-content-box-left">
          <span class="main-content-box-left-title">神灯精灵亚美娜 第二季正在热更</span>
          <span class="main-content-box-left-author">[作者] 美岐</span>
          <div class="main-content-box-left-label">
            <span class="main-content-box-left-label-content zm-b-radius"
                  :style="index===1? {'margin-left' : 0 }: ''"
                  v-for="index in 4"
                  :key="index"
            >
              悬疑
            </span>
          </div>
          <z-m-collect></z-m-collect>
        </div>
        <div class="main-content-box-right"></div>
      </div>
      <div style="padding: 0 32px 24px 32px;">简介：魔法师之都「帕兹」因政变灭亡，亚美娜味了将时间倒转以救自己所爱，欲在300年后才被泽卡勒唤醒
        <a href="javascirpt:void(0)" style="text-decoration: none; color: rgba(18,224,121,1);" @click="showMoreFlag = true">[展开]</a>
      </div>
    </section>
    <z-m-scroll></z-m-scroll>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import ZMCollect from '@/views/detail/components/ZMCollect'
import ZMScroll from '@/views/detail/components/ZMScroll'

export default {
  name: 'comicsDetail',
  data() {
    return {
      showNavFlag: true,
      titleText: '',
      headerBgColor: '#2F446F',
      showMoreFlag: false // 展开查看更多
    }
  },
  components: {
    ZMHeader,
    ZMCollect,
    ZMScroll
  },
  methods: {
    /**
     * @info: TODO 点击了分享
     * @author: PengGeng
     * @date: 8/11/20-3:38 下午
     */
    handleClickShare() {
      console.log('click go to share....')
    }
  }
}
</script>

<style lang="scss" scoped>
  $content-color: #FFFFFF;
  $content-title-fontSize: 18px;
  $content-author-fontSize: 12px;
  $content-label-fontSize: 10px;
  @mixin headerRight {
    width: 24px;
    height: 24px;
    margin: 10px 0 10px 16px;
  }

  .header-right {
    @include headerRight;
    background: url("./images/share.png") no-repeat center;
    background-size: 100%;
  }

  .header-right-white {
    @include headerRight;
    background: url("./images/shareWhite.png") no-repeat center;
    background-size: 100%;
  }

  .main {
    font-weight: bold;
    position: relative;
    margin: 0 auto;
    &-content {
      position: fixed;
      color: $content-color;
      height: 284px;
      z-index: 1;

      &-box {
        display: flex;
        padding: 8px 32px 0 32px;

        &-left {
          display: flex;
          flex-direction: column;
          padding-right: 8px;

          &-title {
            font-size: $content-title-fontSize;
            color: #FFFFFF;
            letter-spacing: 0;
          }

          &-author {
            padding: 8px 0;
            font-size: $content-author-fontSize;
            color: $content-color;
            opacity: 0.6;
          }

          &-label {
            display: flex;
            font-size: $content-label-fontSize;
            transform: scale(0.83);
            -webkit-transform-origin-x: 0;

            &-content {
              position: relative;
              width: 32px;
              height: 20px;
              margin: 0 4px;
              text-align: center;
              line-height: 22px;
              opacity: 0.6;
            }
          }
        }

        &-right {
          position: relative;
          width: 120px;
          padding-left: 8px;
          height: 160px;
          border-radius: 4px;
          background: url("../../assets/img/defaultBook.png") no-repeat top;
          background-size: 100% 160px;
        }
      }
    }

    .bg-index {
      position: absolute;
      /*top: 301px;*/
      width: 100%;
      opacity: 0.9;
      z-index: 5;
      overflow: auto;
    }
  }
</style>
