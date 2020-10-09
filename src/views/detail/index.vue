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
      <div
        slot="right"
        :class="showNavFlag ? 'header-right-white': 'header-right-detail'"
        @click="handleClickShare"
      ></div>
    </z-m-header>
    <section class="main-content" ref="mainContent" :style="{background: mainColor}">
      <div class="main-content-box">
        <div class="main-content-box-left">
          <span class="main-content-box-left-title">{{ ZMDetailData.title || '--'}}</span>
          <span class="main-content-box-left-author">[作者] {{ ZMDetailData.author | authorFormate }}</span>
          <div class="main-content-box-left-label">
            <span
              class="main-content-box-left-label-content zm-b-radius"
              :style="index===1? {'margin-left' : 0 }: ''"
              v-for="(tagItem, index) in ZMDetailData.tag"
              :key="index"
            >{{ tagItem }}</span>
          </div>
          <z-m-collect :zmCollectData="zmCollectData"></z-m-collect>
        </div>
        <div
          :style="{ background: 'url('+ZMDetailData.cover+')no-repeat center / contain'}"
          class="main-content-box-right"
          v-if="ZMDetailData.cover"
        ></div>
      </div>
      <div style="padding: 0 32px 24px 32px;" class="info-content" ref="intro-content">
        {{ showMoreFlag ? ZMDetailData.intro : ZMDetailInfo || '--' }}
        <a
          href="javascirpt:void(0)"
          style="text-decoration: none; color: rgba(18,224,121,1);"
          v-if="isShowUnfold && !showMoreFlag"
          @click.prevent="getElHeight"
        >[展开]</a>
      </div>
    </section>
    <z-m-scroll
      :isChangeHeader.sync="isChangeHeader"
      :detail-data="ZMDetailData"
      :textHeight="textHeight"
    ></z-m-scroll>
    <z-m-contents :comicsInfo.sync="comicsInfo" :show="show"></z-m-contents>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import ZMCollect from '@/views/detail/components/ZMCollect';
import ZMScroll from '@/views/detail/components/ZMScroll';
import ZMContents from '@/common/components/contents';
import { getZMDetail } from '@/common/api/detail';
import '@/common/filters/home';
// import utils from '@/lib/utils'

export default {
  name: 'comicsDetail',
  data() {
    return {
      showNavFlag: true,
      titleText: '',
      headerBgColor: '',
      mainColor: '',
      showMoreFlag: false, // 展开查看更多
      isChangeHeader: false,
      zmCollectData: null,
      cartoon_id: '', // 漫画id
      ZMDetailData: {},
      textLength: 44, // 简介默认展示47个字符 刚好占两行
      textContent: '', // 简介两行的内容
      textHeight: 0, // 简介展开的高度
      show: false, // 显示目录
      comicsInfo: {},
	    infoHeight: 0,
	    infoWidth: 0
    };
  },
  components: {
    ZMHeader,
    ZMCollect,
    ZMScroll,
    ZMContents
  },
  computed: {
    scrollHeight() {
      return console.log(document.body.scrollTop);
    },
    // 是否显示展开按钮
    isShowUnfold() {
	    if (this.textContent) {
        const clientHeight = window.getComputedStyle && document.getElementsByClassName('content') && window.getComputedStyle(document.getElementsByClassName('info-content')[0]).height.replace('px', '')
        if ((clientHeight > 32 && this.infoWidth === 311) || (this.textContent.match(/\W+/g) && this.textContent.length > 44) || (this.textContent.match(/\w+/g) && this.textContent.length > 95)){
	        return true
        } else {
          return false
        }
      }
      return false
    },
    ZMDetailInfo() {
      if (this.isShowUnfold) {
	      const clientHeight = document.getElementsByClassName('info-content') && Number(window.getComputedStyle(document.getElementsByClassName('info-content')[0]).height.replace('px', ''))
        let textWrods = this.textLength
        if ((clientHeight > 32 && this.infoWidth >= 311) || (this.textContent.match(/\w+/g) && this.textContent.length > 95)) {
	        textWrods = 95
	        return this.textContent.substring(0, textWrods);
        } else if (this.textContent.match(/\W+/g) && this.textContent.length > 44) {
	        textWrods = 46
	        return this.textContent.substring(0, textWrods);
        } else {
	        return this.textContent;
        }
      } else {
        return this.textContent;
      }
    }
  },
  mounted() {
    this.cartoon_id = this.$route.query.cartoon_id || '';
    this.getZMDetail(this.cartoon_id);
    setTimeout(() => {
	    this.infoHeight = document.getElementsByClassName('info-content') && Number(window.getComputedStyle(document.getElementsByClassName('info-content')[0]).height.replace('px', ''))
	    this.infoWidth = document.getElementsByClassName('info-content') && Number(window.getComputedStyle(document.getElementsByClassName('info-content')[0]).width.replace('px', ''))
	    console.log(this.infoHeight)
    }, 0)
  },
  methods: {
    /**
     * @info: TODO 点击了分享
     * @author: PengGeng
     * @date: 8/11/20-3:38 下午
     */
    handleClickShare() {
      console.log('click go to share....');
    },
    /**
     * @info: 获取页面到头部的高度
     * @author: PengGeng
     * @date: 8/31/20-6:33 下午
     */
    getElHeight() {
      console.log('........')
	    console.log(document.getElementsByClassName('main')[1].style)
	    // document.getElementsByClassName('main')[1].style.pointerEvents = 'auto'
      this.showMoreFlag = true;
      const mainContentBox = document.getElementsByClassName('main-content-box')[0].offsetHeight;
      setTimeout(() => {
        console.log(this.$refs['intro-content'].offsetHeight);
        const introContentHeight = this.$refs['intro-content'].offsetHeight;
        const marginTop = introContentHeight - 58 - 56 / 2;
        const resultTop = mainContentBox > 175 ? marginTop + (mainContentBox - 175) : marginTop;
        this.textHeight = this.$refs['intro-content'].offsetHeight > 116 ? resultTop - 20 : mainContentBox > 175 ? mainContentBox - 175 - 20 : 0;
      }, 10);
    },
    /**
     * @info: 获取漫画详情
     * @author: PengGeng
     * @date: 8/24/20-4:30 下午
     */
    async getZMDetail(cartoon_id) {
      const resData = await getZMDetail(cartoon_id);
      if (resData && resData.code === 0) {
        const ZMDetailData = resData.data;
        const comicsInfo = {
          cartoon_id: this.$route.query.cartoon_id, // 漫画ID
          status: ZMDetailData.status || 1, // 1=连载中,2=已完结,3=休更中
          // update_freq: ZMDetailData.update_freq || '', // 更新频率
          title: (ZMDetailData.last && ZMDetailData.last.title) || '', // 章节编号
          last_chapter_id: (ZMDetailData.last && ZMDetailData.last.chapter_id && ZMDetailData.last.has_read) || '', // 当前阅读的章节
          status_text: ZMDetailData.status_text
        };
        this.ZMDetailData = ZMDetailData;
        if (!this.showNavFlag) { // 在详情里面货到了显示title再次点击漫画的时候触发
	        this.titleText = this.ZMDetailData.title
	        this.headerBgColor = '#FFFFFF'
        } else {
	        this.headerBgColor = this.mainColor = resData.data.bk_color || '#222'
        }
        this.textContent = resData.data.intro;
        this.zmCollectData = {
          score: resData.data.score ? resData.data.score.toFixed(1) : 0, // 评分
          evalNum: resData.data.eval_num || 0, // 评价数
          shelfNum: resData.data.shelf_num || 0 // 被加入书架量
        };
        this.comicsInfo = comicsInfo;
        this.$store.commit('UPDATE_COMIC', comicsInfo);
      } else {
        this.$toast(resData.msg || '系统繁忙请稍后重试！');
      }
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.query.cartoon_id !== from.query.cartoon_id){
        this.getZMDetail(to.query.cartoon_id)
        window.location.reload()
      }
    },
    isChangeHeader: function (newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        this.titleText = this.ZMDetailData.title;
        this.headerBgColor = '#FFFFFF';
        this.showNavFlag = false;
      } else {
        this.titleText = '';
        this.headerBgColor = this.mainColor;
        this.showNavFlag = true;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave');
    document.documentElement.scrollTop = 0;
    console.log('beforeRouteLeave', document.documentElement.scrollTop);
    next();
  }
};
</script>

<style lang="scss" scoped>
$content-color: #ffffff;
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
  background: url('./images/share.png') no-repeat center;
  background-size: 100%;
}

.header-right-white {
  @include headerRight;
  background: url('./images/shareWhite.png') no-repeat center;
  background-size: 100%;
}

.info-content {
  display: block;
  width: 311px;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  /*display: -webkit-box;*/
  /*height: 100%;*/
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.main {
  font-weight: bold;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  &-content {
    position: fixed;
    color: $content-color;
    min-height: 284px;
    z-index: 1;
    &-box {
      display: flex;
      padding: 8px 32px 0 32px;

      &-left {
        display: flex;
        flex-direction: column;
        padding-right: 8px;
        width: 175px;
        &-title {
          /*display: inline-block;*/
          display: -webkit-box;
          font-size: $content-title-fontSize;
          color: #ffffff;
          letter-spacing: 0;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        &-author {
          padding: 8px 0;
          font-size: $content-author-fontSize;
          color: $content-color;
          opacity: 0.6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &-label {
          display: flex;
          font-size: $content-label-fontSize;
          transform: scale(0.83);
          -webkit-transform-origin-x: 0;

          &-content {
            position: relative;
            min-width: 32px;
            height: 20px;
            margin: 0 4px;
            text-align: center;
            line-height: 22px;
            opacity: 0.6;
          }
        }
      }

      &-right {
        width: 120px;
        margin-left: 8px;
        height: 160px;
        border-radius: 4px;
        background: url('../../assets/img/defaultBook.png') no-repeat;
        background-size: contain;
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
    background: #ffffff;
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
    /*background: #2f446f;*/
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
    /*background: #2f446f;*/
    opacity: 1;
  }
}
</style>
