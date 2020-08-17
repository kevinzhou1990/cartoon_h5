<template>
  <div class="box main" style="overflow: hidden;">
    <z-m-header
        ref="detailHeader"
        :title-text="titleText"
        :background-color="headerBgColor"
        show-right
        :show-nav-flag="showNavFlag"
        :class="showNavFlag ? 'animation-active-out' : 'animation-active-in'"
    >
      <div slot="right" :class="showNavFlag ? 'header-right-white': 'header-right-detail'" @click="handleClickShare"></div>
    </z-m-header>
    <section class="main-content" ref="mainContent" :style="{background: headerBgColor}">
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
    <z-m-scroll :isChangeHeader.sync="isChangeHeader"></z-m-scroll>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import ZMCollect from '@/views/detail/components/ZMCollect'
import ZMScroll from '@/views/detail/components/ZMScroll'
// import utils from '@/lib/utils'

export default {
  name: 'comicsDetail',
  data() {
    return {
      showNavFlag: true,
      titleText: '',
      headerBgColor: '#2F446F',
      showMoreFlag: false, // 展开查看更多
      isChangeHeader: false
    }
  },
  components: {
    ZMHeader,
    ZMCollect,
    ZMScroll
  },
  beforeMount() {
    // window.document.body.style['overflow-y'] = 'hidden'
  },
  computed: {
    scrollHeight() {
      return console.log(document.body.scrollTop)
    }
  },
  mounted() {
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
  },
  watch: {
    isChangeHeader: function(newVal, oldVal) {
      if (newVal !== oldVal && newVal){
        this.titleText = '神灯精灵亚美娜'
        this.headerBgColor = '#FFFFFF'
        this.showNavFlag = false
      } else {
        this.titleText = ''
        this.headerBgColor = '#2F446F'
        this.showNavFlag = true
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    document.documentElement.scrollTop = 0
    console.log('beforeRouteLeave', document.documentElement.scrollTop)
    // setTimeout(() => {
    //   // 让上一个页面回到顶部
    //   document.documentElement.scrollTop = 0
    // }, 0)
    next()
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

  .header-right-detail {
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
    overflow: hidden;
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
  }
  .animation-active-in {
    animation: fadeIn 0.3s;
  }
  .animation-active-out {
    animation: fadeOut 0.3s;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0.1;
      color: #222222;
      height: 44px;
      background: #FFFFFF;
    }
    25% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 0.1;
      height: 44px;
      background: #2F446F;
    }
    25% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.75;
    }
    100% {
      background: #2F446F;
      opacity: 1;
    }
  }
</style>
