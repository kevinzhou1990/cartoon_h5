<template>
  <div class="topic-page" :style="`${'padding-top:0'}`">
    <z-m-header titleText=" " :showRight="true" :hasBorder="true">
      <div slot="right" class="topic-share">
        <SvgIcon iconClass="share_ab" size="default" />
      </div>
    </z-m-header>
    <div class="topic-title">{{ special.title }}</div>
    <section class="topic-author">
      <div class="topic-author-info">
        <img class="avatar" :src="special.avatar" alt="头像" />
        <div>
          <div class="topic-author-name">{{ special.nickname }}</div>
          <div class="topic-gray">{{ special.created_at_text }}</div>
        </div>
      </div>
      <div class="topic-gray topic-read">
        <svg-icon icon-class="view_ba" size="small" />
        {{ special.read_num_text }}阅读
      </div>
    </section>
    <article v-html="special.detail"></article>
    <div class="topic-zan" ref="tp">
      <span> <i />赞一个 </span>
    </div>
    <div class="topic-comment" v-if="commentsList.length">
      <div class="topic-comment-title">专题评论（{{ pageInfo.count }}）</div>
      <ul>
        <li v-for="item in commentsList" :key="item.id">
          <div>
            <img class="avatar" :src="item.avatar" :onerror="defaultHead" alt="头像" />
          </div>
          <div>
            <div class="topic-comment-user">{{ item.nickname || '默认' }}</div>
            <div class="topic-comment-content">{{ item.content }}</div>
            <div class="topic-gray">
              <span>{{ item.created_at_text }}</span>
              <span class="option">
                <svg-icon icon-class="like_ba" size="small" />
                {{ item.praise_num }}
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="topic-tips">
      <span ref="nextPage">不说点什么吗？点它 →</span>
      <div class="write-comment">
        <svg-icon size="default" icon-class="comment_aa" />
      </div>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import { throttle } from '@/lib/utils';
export default {
  name: 'Topic',
  components: { ZMHeader, SvgIcon },
  data() {
    return {
      page: 1,
      totalPage: 1,
      count: 1,
      scrollHandler: throttle(this.handlerScroll, 100, this),
      defaultHead: 'this.src="' + require('./img/default_head.png') + '"'
    };
  },
  computed: {
    special() {
      return this.$store.state.topic.special;
    },
    commentsList() {
      return this.$store.state.topic.commentsList;
    },
    pageInfo() {
      return this.$store.state.topic.pageInfo;
    }
  },
  mounted() {
    console.log(this.commentsList, 'mounted');
    window.addEventListener('scroll', this.scrollHandler, false);
  },
  asyncData({ store, route }) {
    return store.dispatch('getTopic', route.query.id);
  },
  methods: {
    async handlerScroll() {
      // 处理滚动
      const t = this.$refs.nextPage.getBoundingClientRect().top;
      if (t < innerHeight) {
        this.$store.dispatch('getComments', { id: this.$route.query.id, page: this.pageInfo.page });
        // await this.getComments(this.page);
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, false);
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
    // font-family: 'pingfang-regular';
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
      background: url('../../assets/img/likeAa@3x.png') 0 0 no-repeat transparent;
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
  .topic-read {
    svg {
      margin-top: -2px;
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
        vertical-align: bottom;
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
    position: fixed;
    right: 16px;
    bottom: 20px;
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
