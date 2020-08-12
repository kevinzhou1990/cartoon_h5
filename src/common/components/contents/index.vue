<template>
  <div
    :class="`${show ? 'contents-wrap contents-transition' : 'contents-wrap contents-transition contents-wrap-close'}`"
    ref="contents"
    @touchstart.stop="handlerStart"
    @touchmove.stop="handlerMove"
    @touchend.stop="handlerEnd"
    :style="show ? `top:${touchPois.y}` : ''"
  >
    <div class="contents-title">
      目录
      <span class="contents-close" @click="closeContent">
        <SvgIcon size="default" iconClass="close_aa" />
      </span>
    </div>
    <div class="contents-last">
      <div v-if="comicsInfo.status === 1">
        更新至
        <span>{{comicsInfo.title}}</span>
        话/{{comicsInfo.update_freq}}
      </div>
      <div v-else-if="comicsInfo.status === 2">已完结</div>
      <div v-else>休更中</div>
      <div class="zm-b" @click="switchSort">
        <SvgIcon size="small" :iconClass="comicsInfo.sort === 1 ? 'sort_ba' : 'sort_bb'" />
        <span>{{`${comicsInfo.sort === 1 ? '顺序排列' : '倒序排列'}`}}</span>
      </div>
    </div>
    <ul class="contents-list">
      <li @click="goto" v-for="(item) in chapterData" :key="item.chapter_id">
        <div class="process" :style="`width:${item.read_per}%`" />
        <div :class="`contents-list-item ${item.read_per === 100 ? 'done' : ''}`">
          <span>{{item.title}}</span>
          <div class="chapter-title">
            <span class="chapter-title-content">{{item.intro}}</span>
            <span
              class="read-process"
              v-if="item.read_per !== 100 && item.read_per !== 0"
            >{{`${item.read_per}%`}}</span>
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
    show: { type: Boolean, default: false },
    chapterData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    comicsInfo: {
      type: Object,
      default: function () {
        return {
          status: 1, // 1=连载中,2=已完结,3=休更中
          update_freq: '每周五更新', // 更新频率
          title: '#001', // 章节编号
          sort: 1, // 1=正序,2=倒序
          last_chapter_id: 1 // 上一次阅读章节id
        };
      }
    }
  },
  components: { SvgIcon },
  data() {
    return {
      touchPois: {
        x: 0,
        y: '50%'
      },
      startY: 0,
      moved: false,
      initY: 0
    };
  },
  watch: {
    show(n, o) {
      if (n) {
        this.touchPois.y = '50%';
      } else {
        this.touchPois.y = '100%';
      }
    }
  },
  methods: {
    closeContent() {
      this.$emit('close');
    },
    handlerStart(event) {
      this.startY = Math.round(event.touches[0].clientY);
      this.initY = this.$refs.contents.getBoundingClientRect().top;
    },
    handlerMove(event) {
      const classList = this.$refs.contents.classList;
      const y = Math.round(event.touches[0].clientY);
      const difference = Math.round(y - this.startY);
      classList.remove('contents-transition');
      if (difference < 0) {
        // 往上移动
        this.touchPois.y = `${this.initY - Math.abs(difference)}px`;
      } else {
        // 往下移动
        this.touchPois.y = `${this.initY + Math.abs(difference)}px`;
      }
      this.moved = true;
    },
    handlerEnd(event) {
      // 移动过，则进入处理，否则认为是点击事件
      if (this.moved) {
        const classList = this.$refs.contents.classList;
        const y = this.$refs.contents.getBoundingClientRect().top;
        const quarter = window.outerHeight / 4;
        classList.add('contents-transition');
        if (y < quarter) {
          this.touchPois.y = '0';
        } else if (y > quarter && y < quarter * 3) {
          this.touchPois.y = '50%';
        } else {
          this.touchPois.y = '100%';
          this.closeContent();
        }
        this.moved = false;
      }
    },
    goto(id) {
      console.log(id, '跳转');
    },

    // 切换排序方式
    switchSort() {
      this.$emit('switch');
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
  height: 100%;
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
    overflow: auto;
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
