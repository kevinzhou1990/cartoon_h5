/** * @info: 追漫详情评论 * @author: PengGeng * @date: 8/12/20-5:25 下午 */
<template>
  <div class="main-remark">
    <div class="remark-title" @click.stop="handleClickInfo">
      <span style="font-size: 18px;">漫画评论区</span>
      <span class="remark-title-num">{{ remarkCount }}</span>
    </div>
    <div class="remark-content zm-b-radius" v-if="commentNum" @click.stop="handleClickInfo">
      <div class="remark-content-top">
        <img :src="userIcon" class="remark-content-top-img" />
        <span style="padding: 0 16px; white-space: nowrap;">{{ remarkData.nickname || '--' }}</span>
        <span class="remark-content-top-time">{{ remarkData.created_at_text }}</span>
        <div style="position: absolute; right: 12px; top: 16px; height: 24px;">
          <svg-icon
            :icon-class="remarkData.has_praise ? 'like_bb' : 'like_ba'"
            size="small"
            style="margin-top:-1px"
          />
          <span class="remark-content-top-num">{{ remarkData.praise_num_text }}</span>
        </div>
      </div>
      <div class="remark-content-text">
        {{ remarkData.content }}
      </div>
    </div>
    <div class="no-remark" v-else>
      <div class="no-remark-text">发表首条评论，沙发就是你的～</div>
      <div class="btn" @click="handleClickRemark">我要评论</div>
    </div>
  </div>
</template>

<script>
import { timestampToTime } from 'lib/utils/index';
import SvgIcon from '@/common/components/svg';
export default {
  name: 'ZMDetailRemark',
  props: {
    commentNum: {
      type: Number,
      default: 0
    },
    remarkData: {
      type: Object,
      default: () => {}
    }
  },
  components: { SvgIcon },
  computed: {
    updateTime() {
      return timestampToTime(this.remarkData.created_at, 'date');
    },
    remarkCount() {
      if (this.commentNum > 999) {
        return `评论区999+`;
      } else if (this.commentNum === 0) {
        return '暂无评论';
      } else {
        return `评论区${this.commentNum}`;
      }
    }
  },
  data() {
    return {
      isRemarkData: false,
      userIcon: require('../images/default-icon.png')
    };
  },
  created() {
    this.$nextTick(() => {
      this.userIcon = this.remarkData.avatar || require('../images/default-icon.png');
    });
  },
  methods: {
    /**
     * @info: 去评论详情
     * @author: PengGeng
     * @date: 9/16/20-10:32 上午
     * @params remarkType 0 评论  1 评分
     */
    handleClickInfo() {
      const cartoonId =
        (this.$store.state.reader &&
          this.$store.state.reader.comic &&
          this.$store.state.reader.comic.cartoon_id) ||
        this.$route.query.cartoon_id;
      this.$router.push({
        path: '/comments',
        query: {
          cartoonId,
          remarkType: 0
        }
      });
    },
    /**
     * @info: 点击我要评论
     * @author: PengGeng
     * @date: 8/12/20-7:04 下午
     */
    handleClickRemark() {
      this.$router.push('/download');
      console.log('click remark btn go to remark......');
    }
  }
};
</script>

<style scoped lang="scss">
$font-color: #bbbbbb !default;
@mixin font10px($font-color) {
  color: $font-color;
  font-size: 12px;
  /*transform: scale(0.83);*/
  /*-webkit-transform-origin-x: 0;*/
}
.main-remark {
  position: relative;
  font-size: 12px;
  color: #222222;
  font-weight: bold;
  padding: 40px 0 20px 0;
  .remark-title {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    &-num {
      position: absolute;
      right: 12px;
      color: #bbbbbb;
      font-size: 12px;
      line-height: 26px;
      /*transform: scale(0.83);*/
      /*-webkit-transform-origin-x: 0;*/
      margin-right: 4px;
      &:after {
        display: inline-block;
        content: ' ';
        margin-left: 4px;
        width: 16px;
        height: 16px;
        background: url('../../../assets/img/more.png') no-repeat;
        background-size: 100%;
        vertical-align: middle;
      }
    }
  }
  .remark-content {
    display: inline-block;
    width: 343px;
    /*height: 98px;*/
    margin: 12px 16px 0 16px;
    &-top {
      display: flex;
      padding: 16px 16px 11px 16px;
      line-height: 24px;
      &-img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
      }
      &-time {
        white-space: nowrap;
        @include font10px(#bbbbbb);
      }
      &-like {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        line-height: 24px;
      }
      &-num {
        @include font10px(#bbbbbb);
        line-height: 24px;
        /*padding-left: 76px;*/
      }
    }
    &-text {
      padding: 0 16px 16px 53px;
      word-break: break-word;
    }
  }
  .no-remark {
    font-size: 12px;
    color: #bbbbbb;
    letter-spacing: 0;
    text-align: center;
    &-text {
      padding: 24px 0;
    }
    .btn {
      display: inline-block;
      width: 160px;
      height: 44px;
      border: 1px solid #12e079;
      border-radius: 22px;
      font-size: 14px;
      line-height: 44px;
      align-content: center;
      color: #12e079;
      letter-spacing: 0;
      text-align: center;
      &:active {
        background: #12e079;
      }
    }
  }
}
</style>
