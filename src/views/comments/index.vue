<template>
  <div class="comments-page">
    <z-m-header
      :title-text="titleText"
      :background-color="headerBgColor"
      :show-nav-flag="showNavFlag"
    />
    <div class="comments-comics-title">
      <div class="mask" :style="`background-color:${mainColor}`"></div>
      <img src="@/assets/img/main_icon.png" alt />
      <div class="comments-comics-title-bottom"></div>
      <duv class="comments-comics-title-content">
        <div class="title">神灯精灵亚美娜</div>
        <div class="msg">
          评论区
          <span>（8256条评论）</span>
        </div>
      </duv>
    </div>
    <div class="comments-list">
      <ul>
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
    </div>
    <div class="comments-last">扯到底啦，快来说两句↓↓</div>
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
  }
};
</script>

<style lang="scss" scoped>
.comments-page {
  .comments-comics-title {
    height: 240px;
    position: relative;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
    .comments-comics-title-bottom {
      position: absolute;
      width: 100%;
      height: 24px;
      bottom: 0;
      background: url('./img/bannermask.png') 0 0 transparent;
      background-size: 100%;
    }
    img {
      width: 109px;
      height: 110px;
      position: absolute;
      left: 210px;
      top: 155px;
    }
    .comments-comics-title-content {
      position: fixed;
      left: 16px;
      top: 104px;
      .title {
        font-family: 'pingfang-blod';
        font-size: 18px;
      }
    }
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 8px;
  }
  .comments-list {
    padding-left: 16px;
    li {
      display: flex;
      margin-top: 16px;
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
    font-family: 'pingfang-blod';
    position: fixed;
    bottom: 8px;
    width: 100%;
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
