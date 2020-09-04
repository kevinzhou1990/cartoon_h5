<template>
  <div class="comments-page">
    <z-m-header
      :title-text="titleText"
      :background-color="headerBgColor"
      :show-nav-flag="showNavFlag"
      :class="showNavFlag ? 'animation-active-out' : 'animation-active-in'"
    />
    <div class="comments-title" :style="{background:mainColor}" ref="title">
      <div class="comments-mask"></div>
      <div class="comments-title-content">
        <p class="comments-title-substance">神灯精灵亚美娜</p>
        <p>
          评论区
          <span>（8256条评论）</span>
        </p>
      </div>
    </div>
    <div class="comments-contents">
      <div class="comments-contents-top"></div>
      <img src="@/assets/img/main_icon.png" class="icon" alt />
      <ul class="comments-contents-list">
        <li>
          <img src="@/assets/img/default.jpeg" alt=" " class="avatar" />
          <div>
            <div class="comments-user">多啦C梦爆米花</div>
            <div class="comments-content">这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div class="comments-operational zm-b-b">
              <span>1小时前</span>
              <span>
                <svg-icon icon-class="like_ba" size="small" />
                <span>9528</span>
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
        <li>
          <img src="@/assets/img/default.jpeg" alt=" " class="avatar" />
          <div>
            <div class="comments-user">多啦C梦爆米花</div>
            <div class="comments-content">这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div class="comments-operational zm-b-b">
              <span>1小时前</span>
              <span>
                <svg-icon icon-class="like_ba" size="small" />
                <span>9528</span>
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
        <li>
          <img src="@/assets/img/default.jpeg" alt=" " class="avatar" />
          <div>
            <div class="comments-user">多啦C梦爆米花</div>
            <div class="comments-content">这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div class="comments-operational zm-b-b">
              <span>1小时前</span>
              <span>
                <svg-icon icon-class="like_ba" size="small" />
                <span>9528</span>
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
        <li>
          <img src="@/assets/img/default.jpeg" alt=" " class="avatar" />
          <div>
            <div class="comments-user">多啦C梦爆米花</div>
            <div class="comments-content">这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div class="comments-operational zm-b-b">
              <span>1小时前</span>
              <span>
                <svg-icon icon-class="like_ba" size="small" />
                <span>9528</span>
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
        <li>
          <img src="@/assets/img/default.jpeg" alt=" " class="avatar" />
          <div>
            <div class="comments-user">多啦C梦爆米花</div>
            <div class="comments-content">这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div class="comments-operational zm-b-b">
              <span>1小时前</span>
              <span>
                <svg-icon icon-class="like_ba" size="small" />
                <span>9528</span>
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
        <li>
          <img src="@/assets/img/default.jpeg" alt=" " class="avatar" />
          <div>
            <div class="comments-user">多啦C梦爆米花</div>
            <div class="comments-content">这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div class="comments-operational zm-b-b">
              <span>1小时前</span>
              <span>
                <svg-icon icon-class="like_ba" size="small" />
                <span>9528</span>
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div class="comments-last">扯到底啦，快来说两句↓↓</div>
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
export default {
  name: 'Comments',
  components: { ZMHeader, SvgIcon },
  data() {
    return {
      titleText: '',
      headerBgColor: 'transparent',
      mainColor: '#93416c',
      showNavFlag: true
    };
  },
  mounted() {
    console.log('comments loaded');
    // 监听滚动事件
    window.addEventListener('scroll', this.switchHeaderStatus, true);
  },
  methods: {
    switchHeaderStatus(e) {
      const titleHeight = this.$refs.title.clientHeight - 48;
      const scollTop = document.scrollingElement.scrollTop;
      this.showNavFlag = scollTop < titleHeight;
      this.headerBgColor = scollTop > titleHeight ? '#fff' : 'transparent';
      this.titleText = scollTop > titleHeight ? '神灯精灵亚美娜' : '';
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
      background: url('./img/bannermask.png') 0 0 transparent;
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
    .comments-user {
      font-family: 'pingfang-blod';
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
