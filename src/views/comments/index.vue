<template>
  <div class="comments-page">
    <z-m-header
      :title-text="titleText"
      :background-color="headerBgColor"
      :show-nav-flag="showNavFlag"
      :class="showNavFlag ? 'animation-active-out' : 'animation-active-in'"
    />
    <div class="comments-title" :style="{background:details.bk_color}" ref="title">
      <div class="comments-mask" :style="{background:'url(' + details.cover + ') center center', backgroundSize: '100% 100%'}"></div>
      <div class="comments-title-content">
        <p class="comments-title-substance">{{details.title}}</p>
        <p>
          评论区
          <span>（{{dataNumber}}条评论）</span>
        </p>
      </div>
    </div>
    <div class="comments-contents" ref="commentContainer">
      <div class="comments-contents-top"></div>
      <img src="@/assets/img/main_icon.png" class="icon" alt />
        <mt-loadmore :top-method="refreshPage" :bottomDistance='50' ref="loadmore" :auto-fill="false">
          <ul class="comments-contents-list">
            <li v-for="comment in commentsList" :key="comment.comment_id">
              <img :src="comment.avatar" alt=" " class="avatar" />
              <div class="main-container">
                <div class="comments-user">{{comment.nickname}}</div>
                <div class="comments-content">{{comment.content}}</div>
                <div class="comments-operational zm-b-b">
                  <span>{{comment.created_at_text}}</span>
                  <span>
                    <svg-icon :icon-class="comment.has_praise ? 'like_bb' : 'like_ba'" size="small" />
                    <span>{{comment.praise_num}}</span>
                    <svg-icon icon-class="more_bc" size="small" />
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div class="comments-last" v-if="allLoaded && commentsList.length > 0">扯到底啦，快来说两句↓↓</div>
        </mt-loadmore>
    </div>

    <div class="comments-add">
      <span>
        <svg-icon icon-class="comment_bb" size="small" />
        <span>说点什么？</span>
      </span>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import { getCommentList } from '@/common/api/comments';
export default {
  name: 'Comments',
  components: { ZMHeader, SvgIcon },
  data() {
    return {
      cartoonId: this.$route.query.cartoon_id || '',
      //漫画信息
      details: {
        title: '测试漫画（需要对接字段）',
        bk_color: '#776B75',
        cover: 'http://bookwine.leimans.com/ebook/image/2020-08-17/23426_cover_gjsqjsqu.jpg'
      },
      titleText: '',
      headerBgColor: 'transparent',
      showNavFlag: true,
      commentsList: [],
      //评论总数
      dataNumber: 0,
      // 当前页
      currentPage: 1,
      // 一页多少条
      pageSize: 20,
      allLoaded: false,
      //总页数
      totalPages: 0,
      //是否加载下一页评论数据
      isLoadNext: true
    };
  },
  mounted() {
    console.log('comments loaded');
    // 监听滚动事件
    window.addEventListener('scroll', this.switchHeaderStatus, true);
    this.getCommentsList()
  },
  methods: {
    switchHeaderStatus(e) {
      const titleHeight = this.$refs.title.clientHeight - 48;
      const scollTop = document.scrollingElement.scrollTop;
      const containerHeight = this.$refs.commentContainer.clientHeight;
      const windowHeight = document.documentElement.clientHeight;
      this.showNavFlag = scollTop < titleHeight;
      this.headerBgColor = scollTop > titleHeight ? '#fff' : 'transparent';
      this.titleText = scollTop > titleHeight ? '评论区（' + this.dataNumber + '）' : '';
      if (windowHeight + scollTop >= containerHeight - 150) {
        if (this.isLoadNext){
          this.isLoadNext = false;
          this.nextPage()
        }
      }
    },
    //获取评论列表
    async getCommentsList(isRefresh) {
      const params = {
        page: this.currentPage,
        page_size: this.pageSize
      };
      const commentList = await getCommentList(1, this.cartoonId, params);
      if (commentList.code === 0) {
        if (this.dataNumber > commentList.data.count && isRefresh){
          let diff = commentList.data.count - this.dataNumber
          this.$toast('更新' + diff + '条评论')
        }
        this.dataNumber = commentList.data.count;
        let comments = commentList.data.data;
        this.commentsList.push(...comments);
        // this.details = commentList.data.cartoon;
        this.totalPages = commentList.data.total_pages || 0;
        this.isLoadNext = true;
        if (this.currentPage >= this.totalPages) {
          this.allLoaded = true;
          this.isLoadNext = false;
        }
      } else {
        this.$toast(commentList.msg || '系统出错,请稍后重试');
      }
    },
    refreshPage() {
      console.log('loadTop.......')
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
        if (this.$el.getBoundingClientRect().y !== 0) return;
        this.currentPage = 1;
        this.commentsList = [];
        this.getCommentsList(true);
      }, 1000)
    },
    //加载下一页
    nextPage() {
      this.currentPage++;
      this.getCommentsList()
    }
  }
};
</script>

<style lang="scss" scoped>
.comments-page {
  .comments-title {
    position: fixed;
    height: 240px;
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
      background-size:100% 100%;
      z-index: 3;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-right: 8px;
    }
  }
  .comments-contents-list {
    background: #fff;
    padding-left: 16px;
    li {
      display: flex;
      padding-top: 16px;
    }
    .main-container{
      width: 100%;
      .comments-user {
        font-family: 'pingfang-blod';
        min-height: 17px;
        font-size: 12px;
        color: #999;
        margin-bottom: 8px;
      }
      .comments-content {
        font-family: 'pingfang-regular';
        font-size: 14px;
        color: #222;
        padding-right: 16px;
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
  }
  .comments-last {
    font-family: 'pingfang-blod';
    height: 94px;
    line-height: 94px;
    margin-bottom: 36px;
    font-size: 10px;
    color: #bbb;
    text-align: center;
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
