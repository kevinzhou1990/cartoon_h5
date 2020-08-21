<template>
  <div class="topic-page">
    <z-m-header titleText=" " :showRight="true" :hasBorder="true">
      <div slot="right" class="topic-share">
        <SvgIcon iconClass="share_ab" size="default" />
      </div>
    </z-m-header>
    <div class="topic-title">开了个汉服店的日常，艾特戈壁电玩店失败第4天，求艾特教学</div>
    <section class="topic-author">
      <div class="topic-author-info">
        <img class="avatar" src="./img/default_head.png" alt />
        <div>
          <div class="topic-author-name">哇卡漫画官方小飞鸡本鸡</div>
          <div class="topic-gray">08-20 18:08</div>
        </div>
      </div>
      <div class="topic-gray">
        <svg-icon icon-class="view_ba" size="small" />12.5万阅读
      </div>
    </section>
    <article>{{special.detail}}</article>
    <div class="topic-zan">
      <span>
        <i />赞一个
      </span>
    </div>
    <div class="topic-comment">
      <div class="topic-comment-title">专题评论（1）</div>
      <ul>
        <li>
          <div>
            <img class="avatar" src="./img/default_head.png" alt />
          </div>
          <div>
            <div class="topic-comment-user">多啦C梦爆米花</div>
            <div class="topic-comment-content">这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div class="topic-gray">
              <span>08-20 18:08</span>
              <span class="option">
                <svg-icon icon-class="like_ba" size="small" />9528
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="topic-tips">
      <span>不说点什么吗？点它 →</span>
      <div class="write-comment">
        <svg-icon size="default" icon-class="comment_aa" />
      </div>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Topic',
  components: { ZMHeader, SvgIcon },
  data() {
    return {
      special: {
        special_id: 1,
        title: '开了个汉服店的日常，艾特戈壁电玩店失败第4天，求艾特教学',
        intro: '简介',
        can_comment: 1,
        detail:
          '各位老哥早呀，一下子就周三了，一周过去快一半了。昨天有事艾特失败隔壁电玩店的日子，有没有老哥来叫我一下怎么艾特，之前我前面空了后面@9528 这样不行啊，是不是复制的来着。好了回归正题，关注我的老哥都知道，我店里前几天成功收获了一个黑粉，今天来给各位讲讲到底咋回事。先说起因吧，周一我的合作伙伴在我们的专门说事情的微信群里说了之前有没有和客户聊过天什么的，我就很懵逼，微信这个玩意儿除了我之前开店期间就上了一次，就没上过微信了。🌚不过不得不吐槽微信这个聊天记录不同设备不能同步是真的骚。😰然后我女友也出现了，就说这个客户没喝她说过啥。接着我合作伙伴就很神奇的说恭喜我们收到了一个黑粉。😓😓😓',
        praise_num: 121212123121212,
        comment_num: 12988766212,
        created_at: 1597999717
      }
    };
  }
};
</script>

<style lang="scss" scoped>
$GREEN: #12e079;
$GRAY: #bbb;
$DARK: #222;
$DEEPGRAY: #999;
.topic-page {
  font-family: 'pingfang-blod';
  padding-top: 44px;
  color: $DARK;
  min-height: 100%;
  background: #f5f5f5;
  > * {
    background: #fff;
  }
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 8px;
  }
  .topic-title {
    font-size: 18px;
    padding: 14px 16px 18px 16px;
  }
  .topic-author {
    display: flex;
    padding: 0 16px 24px 16px;
    .topic-author-info {
      flex: 1 1;
      display: flex;
    }
    img {
      + div {
        flex: 1 1;
      }
    }
  }
  .topic-author-name {
    color: $GREEN;
  }
  .topic-gray {
    color: $GRAY;
  }
  article {
    font-family: 'pingfang-regular';
    color: $DARK;
    padding: 0 16px;
  }
  .topic-zan {
    padding: 32px 0;
    text-align: center;
    i {
      display: inline-block;
      height: 24px;
      width: 24px;
      vertical-align: middle;
      background: url('../../assets/img/likeAa@3x.png') 0 0 no-repeat
        transparent;
      background-size: 100%;
      margin: -4px 8px 0 0;
    }
    span {
      display: inline-block;
      width: 160px;
      height: 44px;
      border-radius: 22px;
      background: $GREEN;
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 44px;
    }
  }
  .topic-comment {
    padding: 16px;
    margin-top: 8px;
    .topic-gray {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 9px 0 18px 0;
    }
    .topic-comment-title {
      font-size: 18px;
      padding-bottom: 16px;
    }
    li {
      display: flex;
      > div {
        &:last-child {
          flex: 1 1;
        }
      }
    }
    .topic-comment-user {
      color: $DEEPGRAY;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .topic-comment-content {
      font-family: 'pingfang-regular';
      font-size: 14px;
      color: $DARK;
    }
    .option {
      svg {
        vertical-align: middle;
      }
      svg:first-child {
        margin-right: 4px;
      }
      svg:last-child {
        margin-left: 24px;
      }
    }
  }
  .write-comment {
    background: $GREEN;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    text-align: center;
    line-height: 56px;
    position: absolute;
    right: 16px;
    top: 20px;
  }
  .topic-tips {
    color: $GRAY;
    text-align: center;
    position: relative;
    padding: 40px 0;
    span {
      font-size: 10px;
      transform: scale(0.82);
      transform-origin: 0;
    }
  }
}
</style>
