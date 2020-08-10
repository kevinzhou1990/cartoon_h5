<template>
  <div
    :class="`${show ? 'contents-wrap contents-transition' : 'contents-wrap contents-transition contents-wrap-close'}`"
    ref="contents"
    @touchmove="handlerMove"
    @touchend="handlerEnd"
    :style="show ? `top:${touchPois.y}px` : ''"
  >
    <div class="contents-title">
      目录
      <span class="contents-close" @click="closeContent">
        <SvgIcon size="default" iconClass="close_aa" />
      </span>
    </div>
    <div class="contents-last">
      <div>
        更新至
        <span>256</span>话
        /
        每周六更新
      </div>
      <div class="zm-b">
        <SvgIcon size="small" iconClass="sort_ba" />
        <span>顺序排列</span>
      </div>
    </div>
    <ul class="contents-list">
      <li @click="goto()">
        <div class="process" style="width:100%;" />
        <div class="contents-list-item done">
          <span>#000</span>
          <div class="chapter-title">
            <div>序章</div>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
        </div>
      </li>
      <li>
        <div class="process" style="width:72%;" />
        <div class="contents-list-item">
          <span>#001</span>
          <div class="chapter-title">
            <span class="chapter-title-content">魔神降临上篇：黑盒的原罪之另有乾坤魔神降临上篇：黑盒的原罪之另有乾坤</span>
            <span class="read-process">72%</span>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
          <SvgIcon size="small" iconClass="mark_ba" class="reading" />
        </div>
      </li>
      <li>
        <div class="process" />
        <div class="contents-list-item">
          <span>#002</span>
          <div class="chapter-title">
            <div>谁叫你背书了</div>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
        </div>
      </li>
      <li>
        <div class="process" style="width:25%;" />
        <div class="contents-list-item">
          <span>#003</span>
          <div class="chapter-title">
            <span class="chapter-title-content">进入魔道馆（1）</span>
            <span class="read-process">25%</span>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
        </div>
      </li>
      <li>
        <div class="process" />
        <div class="contents-list-item">
          <span>#004</span>
          <div class="chapter-title">
            <span class="chapter-title-content">进入魔道馆（2）</span>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
        </div>
      </li>
      <li>
        <div class="process" />
        <div class="contents-list-item">
          <span>#005</span>
          <div class="chapter-title">
            <span class="chapter-title-content">拜师</span>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
        </div>
      </li>
      <li>
        <div class="process" />
        <div class="contents-list-item">
          <span>#006</span>
          <div class="chapter-title">
            <span class="chapter-title-content">没那么容易</span>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Contents',
  props: {
    show: { type: Boolean, default: false }
  },
  components: { SvgIcon },
  data() {
    return {
      touchPois: {
        x: 0,
        y: '50%'
      }
    };
  },
  methods: {
    closeContent() {
      this.$emit('close');
    },
    handlerMove(event) {
      event.preventDefault();
      const y = Math.round(event.touches[0].clientY);
      this.touchPois.y = y;
    },
    handlerEnd(event) {
      console.log('拖动结束', event);
    },
    goto() {
      console.log('跳转');
    }
  }
};
</script>

<style lang="scss" scoped>
$background: #f5f5f5;
$maincolor: #12e079;
$nousecolor: #bbb;
.contents-transition {
  transition: top 0.5s;
}
.contents-wrap {
  min-height: 492px;
  position: fixed;
  width: 100%;
  top: 50%;
  z-index: 99;
  background: #fff;
  font-family: 'pingfang-blod';

  .contents-title {
    background: $background;
    padding: 16px;
    font-size: 18px;
    border-radius: 8px 8px 0 0;
  }
  .contents-close {
    float: right;
  }
  .contents-last {
    padding: 10px 16px;
    background: $background;
    font-size: 12px;
    display: flex;
    & > div {
      height: 36px;
      line-height: 36px;
      &:first-child {
        flex: 1;
        span {
          color: $maincolor;
        }
      }
      &:last-child {
        width: 104px;
        border-radius: 4px;
        text-align: center;
        span {
          vertical-align: middle;
          margin-left: 8px;
        }
      }
    }
  }
  .contents-list {
    li {
      position: relative;
      height: 56px;
      & > div {
        position: absolute;
        height: 100%;
        font-size: 12px;
      }
    }
    .process {
      z-index: 1;
      background: $background;
    }
    .contents-list-item {
      width: 100%;
      display: flex;
      z-index: 9;
      padding: 0 16px;
      font-size: 12px;
      box-sizing: border-box;
      line-height: 56px;
      &.done {
        color: $nousecolor;
      }
      &::before {
        content: ' ';
        position: absolute;
        height: 1px;
        background: rgba(0, 0, 0, 0.1);
        left: 0;
        right: 0;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }
    }
    .chapter-title {
      flex: 1;
      padding-left: 24px;
      .chapter-title-content {
        display: inline-block;
        width: 214px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .read-process {
        float: right;
        margin-right: 8px;
        color: $nousecolor;
      }
    }
    .reading {
      position: absolute;
      right: 31px;
      height: 16px;
      width: 12px;
    }
  }
}
.contents-wrap-close {
  top: 100%;
}
</style>
