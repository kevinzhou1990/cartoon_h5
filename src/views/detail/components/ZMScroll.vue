<template>
  <div class="main" ref="remarkScroll">
    <div
      class="main-height"
      :style="topWrapStyle"
      @transitionend="transitionend"
      v-show="topAjax"
    ></div>
    <div class="main-content" :style="{ 'margin-top': 265 + textHeight + 'px' }"></div>
    <div
      class="main-catalogue box-shad"
      v-if="detailData && detailData.is_online && !detailData.is_coming"
    >
      <div class="left" @click.stop="handleDownload">
        <img class="left-dn" src="../images/download.png" alt />
        <span class="left-text">缓存</span>
      </div>
      <div class="center" @click="handleReader">{{ readerChapter }}</div>
      <div class="left" @click.stop="handleCatalog">
        <img class="left-dn" src="../images/catalog-icon.png" alt />
        <span class="left-text">目录</span>
      </div>
    </div>
    <div class="main-catalogue box-shad no-time" v-else>
      <div class="new-comics">{{ isOnlineText.text }}</div>
      <div class="new-comics-time" :style="{ color: isOnlineText.textColorFlag ? '#BBBBBB' : '' }">
        {{ isOnlineText.timeText }}
      </div>
    </div>
    <div class="main-other" ref="ohterEl" :class="{ bgColor: isShowBgColor }">
      <z-m-detail-chapter
        v-if="detailData && detailData.is_coming != 1"
        :status-text="detailData.status_text"
        :detail-news="detailData && detailData.news"
      ></z-m-detail-chapter>
      <z-m-detail-remark
        :comment-num="detailData.comment_num"
        :remark-data="detailData && detailData.comment"
      ></z-m-detail-remark>
      <z-m-comics-scroll
        :comicsType="1"
        :title-content="authorTitle"
        :comicsList="authorOhter"
      ></z-m-comics-scroll>
      <z-m-comics-scroll
        :comicsType="2"
        :title-content="maybeTitle"
        :comicsList="yourselfLikeComics"
        :style="{ 'padding-bottom': bottomAjax ? '0' : '20px' }"
      ></z-m-comics-scroll>
      <z-m-no-data></z-m-no-data>
      <!-- -->
    </div>
    <div class="main-foot" v-if="showFootFlag">
      <div
        class="main-catalogue"
        v-if="detailData && detailData.is_online && !detailData.is_coming"
      >
        <div class="left" @click.stop="handleDownload">
          <img class="left-dn" src="../images/download.png" alt />
          <span class="left-text">缓存</span>
        </div>
        <div class="center" @click.stop="handleReader">{{ readerChapter }}</div>
        <div class="left" @click.stop="handleCatalog">
          <img class="left-dn" src="../images/catalog-icon.png" alt />
          <span class="left-text">目录</span>
        </div>
      </div>
      <div class="main-catalogue no-time" v-else>
        <div class="new-comics">{{ isOnlineText.text }}</div>
        <div
          class="new-comics-time"
          :style="{ color: isOnlineText.textColorFlag ? '#BBBBBB' : '' }"
        >
          {{ isOnlineText.timeText }}
        </div>
      </div>
    </div>
    <div
      class="main-bottom"
      :style="bottomWrapStyle"
      @transitionend="transitionendBottom"
      v-show="bottomAjax"
    >
      ......
    </div>
    <!-- 目录组件 -->
  </div>
</template>

<script>
import ZMDetailChapter from '@/views/detail/components/ZMDetailChapter';
import ZMDetailRemark from '@/views/detail/components/ZMDetailRemark';
import ZMComicsScroll from '@/views/detail/components/ZMComicsScroll';
import ZMNoData from '@/common/components/ZMNoData';
import { getAuthorOther } from '@/common/api/detail';

export default {
  name: 'ZMScroll',
  components: {
    ZMDetailChapter,
    ZMDetailRemark,
    ZMComicsScroll,
    ZMNoData
  },
  props: {
    detailData: {
      type: Object,
      default: () => {
        return { last: { has_read: 0 } };
      }
    },
    textHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    this.timer = null; // 定时器 用于点击事件的穿透
    this.startTouchValue = 0; // 手指触摸到屏幕距离顶部的距离
    this.touchDistance = '1.33333333rem'; // 滑动的距离
    this.startTouchDistance = 310; // 手指触摸到屏幕多少距离才能触发滑动事件
    this.marginTop = 284;
    this.height = 0;
    return {
      topWrapStyle: {
        height: this.touchDistance,
        transition: 'none'
      },
      topAjax: true,
      scrollHeight: 0,
      bottomAjax: false,
      bottomWrapStyle: {
        height: 0,
        transition: 'none'
      },
      authorTitle: '作者其他漫画',
      maybeLikeTitle: '喜欢《神灯精灵…》的也会喜欢',
      isShowBgColor: false,
      showFootFlag: false,
      cartoonId: '', // 漫画id
      comicsInfo: {}, // 目录数据
      authorOhter: [], // 作者其他漫画
      yourselfLikeComics: [], // 你可能喜欢的漫画

      readerChapter: '阅读 第一话',
      isOnlineText: { text: '很遗憾', timeText: '这本漫画下架了' },
      maybeTitle: '--'

      // otherHeight: 0
    };
  },
  computed: {},
  beforeMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  mounted() {
    this.cartoonId = this.$route.query.cartoon_id || this.detailData.cartoon_id || '';
    this.initData();
    this.getAuthorOther();
    this.maybeLikeTitle = this.detailData && this.detailData.title;

    this.scrolOnEventChange();
    this.$el.addEventListener('touchstart', this.touchStart, true);
    this.$el.addEventListener('touchend', this.touchEnd, true);
  },
  methods: {
    // 数据初始化
    initData() {
      this.readerChapter =
        this.detailData && this.detailData.last.has_read === 1
          ? `继续 ${this.detailData.last.title}`
          : '阅读 第一话';
      if (this.detailData && this.detailData.is_online) {
        if (this.detailData.is_coming) {
          this.isOnlineText = {
            text: '新漫即将抵达',
            timeText: this.detailData.on_time_text || '--'
          };
        }
      } else {
        this.isOnlineText = {
          text: '很遗憾',
          timeText: '这本漫画下架了',
          textColorFlag: true
        };
      }
      let titleContext = '';
      if (this.detailData && this.detailData.title) {
        if (this.detailData.title.length > 5) {
          titleContext = this.detailData.title.substring(0, 4) + '...';
        } else {
          titleContext = this.detailData.title;
        }
        this.maybeTitle = `喜欢《${titleContext}》的也会喜欢`;
      } else {
        this.maybeTitle = '--';
      }
    },
    /**
     * @info: 点击开始继续阅读漫画
     * @author: PengGeng
     * @date: 8/24/20-5:41 下午
     */
    handleReader() {
      let capterId =
        (this.detailData && this.detailData.last && this.detailData.last.chapter_id) || '';
      this.$router.push({
        path: '/reader',
        query: {
          cartoon_id: this.cartoonId,
          capterId
        }
      });
    },
    /**
     * @info: 点击了缓存
     * @author: PengGeng
     * @date: 8/17/20-6:24 下午
     */
    handleDownload() {
      console.log('download in 。。。');
    },
    /**
     * @info: 点击了目录
     * @author: PengGeng
     * @date: 8/25/20-10:38 上午
     */
    handleCatalog() {
      this.$el.removeEventListener('tochstart', this.touchStart, true);
      this.$el.removeEventListener('touchend', this.touchEnd, true);
      this.$parent.show = true;
      console.log('点击了目录');
    },
    /**
     * @info: 获取可能喜欢的列表和作者的其他漫画
     * @author: PengGeng
     * @date: 8/25/20-12:03 下午
     */
    async getAuthorOther() {
      const resData = await getAuthorOther(this.cartoonId);
      if (resData && resData.code === 0) {
        this.authorOhter = resData.data.author || [];
        this.yourselfLikeComics = resData.data.rec || [];
      } else {
        this.$toast(resData.msg || '系统繁忙请稍后重试！');
      }
    },
    // touch开始
    touchStart(e) {
      // e.preventDefault()
      if (this.timer) {
        clearTimeout(this.timer);
      }
      const touch = e.changedTouches[0];
      this.startTouchValue = touch.pageY;
      if (this.startTouchValue < this.startTouchDistance) {
        this.$refs.remarkScroll.style['pointer-events'] = 'none';
        // this.$el.removeEventListener('touchstart', this.touchStart);
      }
      this.timer = setTimeout(() => {
        if (this.$refs['remarkScroll']) this.$refs.remarkScroll.style['pointer-events'] = 'auto';
        // this.$el.addEventListener('touchstart', this.touchStart);
      }, 300);
      if (this.$refs.remarkScroll.scrollTop > 100) {
        if (this.$refs['remarkScroll']) this.$refs.remarkScroll.style['pointer-events'] = 'auto';
      }
      e.stopPropagation();
      this.$el.addEventListener('touchmove', this.touchMove);
      console.log('我开始滑动了。。。。', this.startTouchValue);
    },
    // touch 开始中
    touchMove(e) {
      e.preventDefault();
      if (this.startTouchValue < this.startTouchDistance) return;
      const touch = e.changedTouches[0].pageY;
      // console.log('touch', touch, 'startTouchValue', this.startTouchValue)
      this.height = touch - this.startTouchValue;
      // if (this.height < -200 || this.height > 100) return
      if (this.height > 10 && this.height < 200) {
        this.topWrapStyle.height = `${this.height}px`;
        this.$parent.$refs.mainContent.style.height =
          this.marginTop + this.textHeight + this.height - 56 + 'px';
      }
      if (this.height < -100 && this.height > -200) {
        console.log('进来了。。。。。');
        // document.getElementsByClassName('main-other')[0].style.backgroundColor = 'red'
        this.bottomWrapStyle.height = `${Math.abs(this.height)}px`;
        //   // this.$parent.$refs.mainContent.style.height = (284 + (height) - 58) + 'px'
        //   console.log('this.otherHeight', document.getElementsByClassName('main-other')[0].getBoundingClientRect().y)
        //   this.$parent.$refs.mainContent.style.height = document.getElementsByClassName('main-other')[0].sc- 28 + (-height) + 'px'
        //   // this.$refs.ohterEl.style.background = 'red'
        //   // this.$parent.$refs.mainContent.style.height = (284 - 28) + 'px'
      }
      console.log('touchMove', this.height);
      console.log('我在滑动中。。。。');
    },
    // touch 结束
    touchEnd(e) {
      if (this.startTouchValue < this.startTouchDistance) return;
      const touch = e.changedTouches[0].pageY;
      this.$el.removeEventListener('touchmove', this.touchMove);
      // if (this.$el.scrollTop > 0) {
      //   this.startTouchValue = touch
      //   return
      // }
      this.height = touch - this.startTouchValue;
      this.$parent.$refs.mainContent.style.height = this.marginTop + this.textHeight + 'px';
      // this.$parent.$refs['intro-content'].style.height = this.textHeight
      this.topWrapStyle.transition = 'height 200ms';
      this.topWrapStyle.height = `${this.touchDistance}`;
      // this.bottomAjax = false
      if (this.height < -100) {
        this.bottomAjax = true;
      } else {
        this.bottomAjax = false;
      }
      this.bottomWrapStyle.transition = 'height 200ms';
      this.bottomWrapStyle.height = '0';
      this.height = 0;
      console.log('我结束滑动了。。。。', this.height);
    },
    // 清除下拉动画
    transitionend() {
      this.topWrapStyle.transition = 'none';
    },
    // 清除上拉动画
    transitionendBottom() {
      this.bottomWrapStyle.transition = 'none';
    },
    // 绑定滚动事件
    scrolOnEventChange() {
      this.$refs.remarkScroll.addEventListener('scroll', this.getPageScroll, true);
    },
    // 获取滚动到页面顶部的高度
    getPageScroll() {
      // let yScroll
      // let self = window
      // if (self.pageYOffset) {
      //   yScroll = self.pageYOffset
      // // xScroll = self.pageXOffset;
      // } else if (document.documentElement && document.documentElement.scrollTop) {
      //   yScroll = document.documentElement.scrollTop
      // } else if (document.body) {
      //   yScroll = document.body.scrollTop
      // }
      let yScroll = this.$refs.remarkScroll.scrollTop;
      console.log('scroll的距离' + yScroll);
      if (yScroll >= 10) {
        // this.$el.removeEventListener('tochstart', this.touchStart, true);
        // // this.$el.removeEventListener('touchend', this.touchEnd, true)
        // this.$el.removeEventListener('touchMove', this.touchMove, true);
        this.isShowBgColor = true;
        this.$refs.remarkScroll.style['pointer-events'] = 'auto';
      } else {
        // this.$el.addEventListener('tochstart', this.touchStart, true);
        // this.$el.addEventListener('touchend', this.touchEnd, true);
        // this.$el.addEventListener('touchMove', this.touchMove, true);
        this.isShowBgColor = false;
      }
      if (yScroll > 260) {
        this.showFootFlag = true;
        this.$emit('update:isChangeHeader', true);
      } else {
        this.showFootFlag = false;
        this.$emit('update:isChangeHeader', false);
      }
      return yScroll;
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.cartoon_id !== from.query.cartoon_id) {
        this.cartoonId = to.query.cartoon_id;
        this.getAuthorOther();
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.getPageScroll, true);
    window.pageYOffset = 0;
    document.documentElement.scrollTop = 0;
    console.log('destroyed...', document.documentElement.scrollTop);
  }
};
</script>

<style scoped lang="scss">
.box-shad {
  border-radius: 4px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
}
.no-time {
  flex-direction: column;
  text-align: center;
}
.new-comics {
  font-size: 10px;
  transform: scale(0.83);
  /*-webkit-transform-origin-x: 0;*/
  padding: 0 0 2px 0;
  color: #bbbbbb;
}
.new-comics-time {
  font-family: 'pingfang-blod';
  font-size: 14px;
  color: #222222;
}
.main {
  /*  overflow-scrolling: touch;*/
  /*-webkit-overflow-scrolling: touch;*/
  /*position: absolute;*/
  font-weight: bold;
  margin: 0 auto;
  color: #222222;
  z-index: 6;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  overflow-scrolling: touch;
  box-sizing: border-box;

  &-height {
    display: block;
    height: 50px;
    margin-top: -50px;
    line-height: 50px;
  }
  &-bottom {
    display: block;
    touch-action: none;
    height: 50px;
    margin-bottom: -50px;
    line-height: 50px;
    text-align: center;
    opacity: 0;
  }
  &-content {
    background: #ffffff;
    opacity: 0;
  }

  &-catalogue {
    display: flex;
    justify-content: center;
    background: #ffffff;
    margin: 0 16px;
    width: 343px;
    height: 56px;
    .left {
      display: flex;
      padding: 16px 22px;

      &-dn {
        width: 24px;
        height: 24px;
      }

      &-text {
        padding-left: 8px;
        white-space: nowrap;
        line-height: 24px;
      }
    }

    .center {
      position: relative;
      margin: 10px 22px;
      width: 135px;
      height: 36px;
      background: #12e079;
      border-radius: 4px;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      color: #ffffff;
    }
  }

  &-other {
    /*background: #FFFFFF;*/
  }

  .bgColor {
    background: #ffffff;
  }
  &-foot {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 56px;
    background: #ffffff;
    /*transition: all 2s ease;*/
    /*transition-property: opacity, top;*/
    /*transition-duration: 3s, 5s;*/
    animation: fadeBottom_in 0.3s;
    z-index: 6;
  }
}
@keyframes fadeBottom_in {
  // 可用于容器弹出
  0% {
    opacity: 0;
    transform: translateY(56px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(28px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
