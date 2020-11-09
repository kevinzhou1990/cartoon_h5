<!--评论页和评分页-->

<!--根据query的remarkType（0：评论页面；1：评分页面）判断页面显示内容-->

<template>
  <div class="comments-page">
    <z-m-header :title-text="titleText" :background-color="headerBgColor" :show-nav-flag="showNavFlag" :class="showNavFlag ? 'animation-active-out' : 'animation-active-in'" />
    <div class="comments-title" :style="{ background: details.bk_color }" ref="title">
      <div
        class="comments-mask"
        :style="{
          backgroundImage: details.cover_detail ? 'url(' + details.cover_detail + ')' : 'url(' + details.cover + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <div class="comments-title-content">
        <p class="comments-title-substance">{{ details.title }}</p>
        <p v-if="remarkType === 0">
          评论区
          <span>（{{ dataNumber }}条评论）</span>
        </p>
        <!--评分页面--评分显示-->
        <div v-else-if="remarkType === 1" class="collect-container">
          <span class="collect-content-left-p">{{ details.score }}</span>
          <div class="collect-content-left-img">
            <div class="collect-content-left-img-text">{{ details.eval_num }}人评分</div>
            <div style="display: flex;">
              <img class="starts-img" v-for="(name, index) in starts(details.score)" :key="index" :src="name" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comments-contents" ref="commentContainer">
      <div class="comments-contents-top"></div>
      <img src="@/assets/img/main_icon.png" class="icon" alt />
      <template v-if="commentsList.length">
        <mt-loadmore :top-method="scrollTop === 0 ? refreshPage : null" ref="loadmore" :auto-fill="false" class="loadmore-container">
          <div class="comment-container">
            <ul class="comments-contents-list">
              <li v-for="comment in commentsList" :key="comment.comment_id">
                <img :src="comment.avatar || defaultHead" alt=" " class="avatar" />
                <!--评分页面-->
                <div :class="[remarkType === 1 ? 'eval-main-container' : '', 'main-container zm-b-b']">
                  <div class="comments-user">{{ comment.nickname }}</div>
                  <div class="top-flag" v-if="remarkType === 0 && comment.is_top">置顶</div>
                  <!--评分页面--星星-->
                  <div v-if="remarkType === 1" class="starts-container">
                    <img class="starts-img" v-for="(name, index) in starts(comment.score)" :key="index" :src="name" alt />
                  </div>
                  <div class="comments-content">{{ comment.content }}</div>
                  <!--只有评论页面有-->
                  <div class="comments-operational" v-if="remarkType === 0">
                    <span>{{ comment.created_at_text }}</span>
                    <span @click="jumpDownloadPage">
                    <svg-icon :icon-class="comment.has_praise ? 'like_bb' : 'like_ba'" size="small"/>
                    <span>{{ comment.praise_num_text }}</span>
                    <svg-icon icon-class="more_bc" size="small"/>
                  </span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="comments-last" v-if="allLoaded && commentsList.length > 0">
              <span v-if="remarkType === 0">扯到底啦，快来说两句↓↓</span>
              <span v-else>不要再扯了，真的没有了～</span>
            </div>
          </div>
      </mt-loadmore>
      </template>
      <!--只有评论页面有-->
      <no-data-view
        v-else-if="!commentsList.length && remarkType !== 1"
        class="no-more"
        type="comment"
        textContent="还有没评论哦，快来抢沙发～"
      ></no-data-view>
    </div>
    <!--只有评论页面有-->
    <div class="comments-add" v-if="remarkType === 0">
      <span @click="jumpDownloadPage">
        <svg-icon icon-class="comment_bb" size="small" />
        <span>说点什么？</span>
      </span>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import noDataView from '@/common/components/noDataView';
import SvgIcon from '@/common/components/svg';
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'Comments',
  mixins: [ myMixins ],
  components: { ZMHeader, SvgIcon, noDataView },
  data() {
    return {
      scrollTop: 0,
      defaultHead: require('@/assets/img/default_head.png'),
      //星星数量
      bgStarts: {
        startBG: require('@/views/detail/images/star-bg.png'),
        startHalf: require('@/views/detail/images/start-half.png'),
        start: require('@/views/detail/images/start.png')
      },
      cartoonId: this.$route.query.cartoonId || '',
      //1: 评分详情； 0: 评论详情
      remarkType: parseInt(this.$route.query.remarkType),
      titleText: '',
      headerBgColor: 'transparent',
      showNavFlag: true,
      // 当前页
      currentPage: 1,
      allLoaded: false,
      //总页数
      totalPages: 0,
      //是否加载下一页评论数据
      isLoadNext: true
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('getCommentList', { type: route.query.remarkType, page: 1, cartoonId: route.query.cartoonId });
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener('scroll', this.switchHeaderStatus, true);
    // this.getCommentsList();
  },
  computed: {
    // 评论或评分列表
    commentsList() {
      return this.$store.state.comments.commentList;
    },
    // 漫画信息
    details() {
      return this.$store.state.comments.details;
    },
    // 评分或评论条数
    dataNumber() {
      return this.$store.state.comments.dataNumber;
    }
  },
  destroyed() {
    //销毁监听滚动事件
    window.removeEventListener('scroll', this.switchHeaderStatus, true);
  },
  methods: {
    switchHeaderStatus(e) {
      const titleHeight = this.$refs.title.clientHeight - 48;
      this.scrollTop = document.scrollingElement.scrollTop;
      const containerHeight = this.$refs.commentContainer.clientHeight;
      const windowHeight = document.documentElement.clientHeight;
      this.showNavFlag = this.scrollTop < titleHeight;
      this.headerBgColor = this.scrollTop > titleHeight ? '#fff' : 'transparent';
      this.titleText = this.scrollTop > titleHeight ? this.remarkType === 1 ? '评分' + this.details.score + ' (' + this.details.eval_num + '人评分)' : '评论区（' + this.dataNumber + '）' : '';
      if (windowHeight + this.scrollTop >= containerHeight - 150) {
        if (this.isLoadNext){
          this.isLoadNext = false;
          this.nextPage()
        }
      }
    },
    //获取评论列表
    getCommentsList(isRefresh) {
      const params = {
        page: this.currentPage
      };
      let dataNumber = this.dataNumber;
      const res = this.$store.dispatch('getCommentList', { type: this.$route.query.remarkType, cartoonId: this.$route.query.cartoonId, ...params });
      // let commentList = this.remarkType === 0 ? await getCommentList(1, this.cartoonId, params) : this.remarkType === 1 ? await getEvalList(this.cartoonId, params) : '';
      res.then((r) => {
        if (r.code === 0) {
          if (dataNumber < r.data.count && isRefresh) {
            let diff = r.data.count - dataNumber;
            this.Toast('更新' + diff + '条评论', {
              type: 'success',
              duration: 1000
            });
          }
          if (this.details.score) {
            this.details.score = this.details.score.toFixed(1);
          }
          this.totalPages = r.data.total_pages || 0;
          this.isLoadNext = true;
          if (this.currentPage >= this.totalPages) {
            this.allLoaded = true;
            this.isLoadNext = false;
          }
        }
        console.log(r, '=======');
      });
      // if (res.code === 0) {
      //   if (this.dataNumber > commentList.data.count && isRefresh) {
      //     let diff = commentList.data.count - this.dataNumber;
      //     this.Toast('更新' + diff + '条评论', {
      //       type: 'success',
      //       duration: 1000
      //     });
      //   }
      //   this.dataNumber = commentList.data.count;
      //   let comments = commentList.data.data;
      //   //如果是刷新列表，那就直接赋值，视图才不会先跳到没数据的页面
      //   isRefresh ? (this.commentsList = comments) : this.commentsList.push(...comments);
      //   this.details = commentList.data.cartoon;
      //   if (this.details.score) {
      //     this.details.score = this.details.score.toFixed(1);
      //   }
      //   this.totalPages = commentList.data.total_pages || 0;
      //   this.isLoadNext = true;
      //   if (this.currentPage >= this.totalPages) {
      //     this.allLoaded = true;
      //     this.isLoadNext = false;
      //   }
      // } else {
      //   this.$toast(commentList.msg || '系统出错,请稍后重试');
      // }
    },
    refreshPage() {
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
        if (this.$el.getBoundingClientRect().y !== 0) return;
        this.currentPage = 1;
        this.getCommentsList(true);
      }, 1000)
    },
    //加载下一页
    nextPage() {
      this.currentPage++;
      this.getCommentsList();
    },
    starts() {
      return function (count) {
        // 1 实心 2 半心 3 空心 共 5 个
        let startArr = [this.bgStarts.start, this.bgStarts.start, this.bgStarts.start, this.bgStarts.start, this.bgStarts.start];
        let startNum = 0;
        startNum = Math.round(count) / 2;
        if (startNum - Math.floor(startNum) === 0.5) {
          startArr[Math.floor(startNum)] = this.bgStarts.startHalf;
        }
        for (let i = 0; i < Math.floor(startNum); i++) {
          startArr[i] = this.bgStarts.startBG;
        }
        return startArr;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  $TITLEHEIGHT: 240px;
.comments-page {
  .comments-title {
    font-family: 'pingfang-blod';
    position: fixed;
    height: $TITLEHEIGHT;
    width: 100%;
    top: 0;
    z-index: 1;
    .comments-mask {
      height: 100%;
      width: 100%;
      background: #fff;
      opacity: 0.2;
      z-index: 2;
    }
    .comments-title-content {
      position: absolute;
      bottom: 40px;
      left: 16px;
      color: #fff;
      .collect-container {
        display: flex;
        z-index: 2;

        .collect-content-left-p {
          font-size: 20px;
          color: #ffffff;
          padding: 4px 8px;
        }

        .collect-content-left-img {
          padding: 4px 0;
          font-size: 10px;
          transform: scale(0.83);
          -webkit-transform-origin-x: 0;
          letter-spacing: 0;
          white-space: nowrap;
          .collect-content-left-img-text {
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
    .comments-title-substance {
      font-family: 'pingfang-blod';
      font-size: 18px;
      margin-bottom: 8px;
      & + p {
        font-family: 'pingfang-blod';
        font-size: 14px;
        span {
          opacity: 0.6;
          font-size: 12px;
        }
      }
    }
  }
  .starts-img {
    width: 10px;
    height: 10px;
  }
  .comments-contents {
    position: relative;
    padding-top: 216px;
    background: transparent;
    z-index: 3;
    img.icon {
      width: 110px;
      position: absolute;
      right: 60px;
      top: 151px;
      z-index: 2;
    }
    .comments-contents-top {
      position: relative;
      height: 24px;
      width: 100%;
      background: url('./img/bannermask.png') no-repeat bottom;
      background-size: 100% 100%;
      z-index: 3;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-right: 8px;
    }
    .no-more{
      height: calc(100vh - #{$TITLEHEIGHT} - 44px);
    }
  }
  .loadmore-container {
    background: white;
    margin-top: -1px;
    min-height: calc(100vh - #{$TITLEHEIGHT});
  }
  .comment-container {
    .comments-contents-list {
      background: #fff;
      padding-left: 16px;
      li {
        display: flex;
        padding-top: 16px;
      }
      .main-container {
        width: 100%;
        .starts-container {
          margin-bottom: 11px;
        }
        .comments-user {
          font-family: 'pingfang-blod';
          min-height: 17px;
          font-size: 12px;
          color: #999;
          margin-bottom: 8px;
        }
        .top-flag {
          position: absolute;
          top: -2px;
          right: 16px;
          padding: 2px 8px;
          transform: scale(0.84);
          font-family: 'pingfang-blod';
          color: #ffffff;
          background: #12e079;
          border-radius: 4px;
        }
        .comments-content {
          font-family: 'pingfang-regular';
          font-size: 14px;
          color: #222;
          padding-right: 16px;
          word-break: break-all;
        }
        .comments-operational {
          display: flex;
          justify-content: space-between;
          padding: 9px 16px 18px 0;
          background: #fff;
          & > span {
            color: #bbb;
            font-size: 10px;
            font-family: 'pingfang-blod';
            svg:first-child {
              margin-right: 8px;
              vertical-align: top;
            }

            svg:last-child {
              margin-left: 24px;
            }
            span {
              font-size: 10px;
              transform: scale(0.84);
              transform-origin: 0;
            }
          }
          & > span:first-child {
            transform: scale(0.84);
            transform-origin: 0;
          }
          svg {
            vertical-align: top;
          }
        }
      }
      .eval-main-container {
        .comments-user {
          margin-bottom: 4px;
        }
        .comments-content {
          margin-bottom: 17px;
        }
      }
    }
  }
  .comments-last {
    font-family: 'pingfang-blod';
    height: 94px;
    line-height: 94px;
    margin-bottom: 36px;
    color: #bbb;
    text-align: center;
    transform: scale(0.84);
  }
  .comments-add {
    font-size: 10px;
    text-align: center;
    color: #bbb;
    background: #fff;
    padding-bottom: 8px;
    font-family: 'pingfang-blod';
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 4;
    & > span {
      display: inline-block;
      width: 343px;
      height: 36px;
      line-height: 36px;
      border-radius: 4px;
      background: #f5f5f5;
      span {
        transform: scale(0.84);
        transform-origin: 0;
        vertical-align: middle;
        margin-left: 8px;
      }
    }
  }
}
</style>
