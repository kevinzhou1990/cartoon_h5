<template>
  <div
    :class="`${show ? 'contents-wrap contents-transition' : 'contents-wrap contents-transition contents-wrap-close'}`"
    ref="contents"
    @touchstart.stop="handlerStart"
    @touchmove.stop="handlerMove"
    @touchend.stop="handlerEnd"
    :style="show ? `top:${touchPois.y};` : ''"
  >
    <div class="contents-title">
      目录
      <span class="contents-close" @click="closeContent">
        <SvgIcon size="default" iconClass="close_aa" />
      </span>
    </div>
    <div class="contents-last">
      <div>{{comicsInfo.status_text }}</div>
      <div class="zm-b" @click="switchSort">
        <SvgIcon size="small" :iconClass="comicsInfo.sort === 1 ? 'sort_ba' : 'sort_bb'" />
        <span>{{`${comicsInfo.sort === 1 ? '顺序排列' : '倒序排列'}`}}</span>
      </div>
    </div>
    <ul class="contents-list" ref="chapter">
      <li @click="goto(item)" v-for="(item) in chapterData" :key="item.chapter_id">
        <div class="process" :style="`width:${item.read_per}%`" />
        <span class="contents-current" v-if="item.chapter_id === comicsInfo.last_chapter_id" />
        <div :class="`contents-list-item ${parseInt(item.read_per) === 100 ? 'done' : ''}`">
          <span>{{item.title}}</span>
          <div class="chapter-title">
            <span class="chapter-title-content">{{item.intro}}</span>
            <span
              class="read-process"
              v-if="parseInt(item.read_per) !== 100 && parseInt(item.read_per) !== 0"
            >{{`${item.read_per}%`}}</span>
          </div>
          <div>
            <SvgIcon size="small" iconClass="more_bb" />
          </div>
        </div>
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Contents',
  props: {
    show: { type: Boolean, default: false },
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
  computed: {
    chapterData() {
      // 同步本地记录阅读进度
      let contentsList = this.$store.state.reader.contentsList;
      let localContents = this.$store.state.reader.localContents;
      contentsList.map((item) => {
        const CAPTERID = item.chapter_id;
        const CARTOON_ID = item.cartoon_id;
        if (localContents[CARTOON_ID]) {
          const P = localContents[CARTOON_ID][CAPTERID];
          if (P) {
            item.read_per = P.read_per;
          }
        }
      });
      return contentsList;
    }
  },
  mounted() {
    this.comicsInfo.sort = this.comicsInfo.sort || 1;
    this.$store.dispatch('getContentsData', this.$route.query.cartoon_id);
  },
  watch: {
    show(n, o) {
      if (n) {
        this.touchPois.y = '50%';
        document.body.classList.add('overflow-hidden');
      } else {
        this.touchPois.y = '100%';
        document.body.classList.remove('overflow-hidden');
      }
    },
    'comicsInfo.cartoon_id': function (n, o) {
      this.$store.dispatch('getContentsData', n);
    }
  },
  methods: {
    closeContent() {
      this.$parent.show = false;
    },
    handlerStart(event) {
      this.startY = Math.round(event.touches[0].clientY);
      this.initY = this.$refs.contents.getBoundingClientRect().top;
    },
    handlerMove(event) {
      const CONTENTSCLASSLIST = this.$refs.contents.classList;
      const Y = Math.round(event.touches[0].clientY);
      const DIFFERENCE = Math.round(Y - this.startY);
      const LISTTOP = this.$refs.chapter.scrollTop; // 章节列表滚动距离
      const CONTENTTOP = this.$refs.contents.getBoundingClientRect().top; // 目录位置
      // 1.目录没有拉动到顶之前，阻止默认事件
      CONTENTSCLASSLIST.remove('contents-transition');
      if (this.$refs.contents.offsetTop !== 0 && event.cancelable) {
        event.preventDefault();
      }
      if (DIFFERENCE < 0) {
        // 往上移动
        if (CONTENTTOP !== 0) {
          this.touchPois.y = `${this.initY - Math.abs(DIFFERENCE)}px`;
        } else {
          // 2.目录拉到顶，且目录滚动到底，向上移动，阻止默认事件，向下移动不阻止
          if (LISTTOP + this.$refs.chapter.clientHeight === this.$refs.chapter.scrollHeight && event.cancelable) {
            event.preventDefault();
          }
        }
      } else {
        // 往下移动
        if (LISTTOP === 0) {
          this.touchPois.y = `${this.initY + Math.abs(DIFFERENCE)}px`;
          // 3.目录拉到顶，且目录滚动到顶，向下移动，阻止默认事件，向上移动不阻止
          if (CONTENTTOP === 0 && event.cancelable) event.preventDefault();
        } else {
          this.startY = Y;
        }
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
    goto(item) {
      this.$parent.show = false;
      if (this.$route.name !== 'reader') {
        this.$router.push({
          path: '/reader',
          query: {
            cartoon_id: item.cartoon_id,
            capterId: item.chapter_id
          }
        });
      } else {
        this.$router.replace({
          path: '/reader',
          query: {
            cartoon_id: item.cartoon_id,
            capterId: item.chapter_id
          }
        });
      }
    },
    // 切换排序方式
    switchSort() {
      this.comicsInfo.sort = this.comicsInfo.sort === 1 ? 2 : 1;
      this.chapterData.reverse();
    }
  },
  beforeDestroy() {
    document.body.classList.remove('overflow-hidden');
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
  z-index: 999;
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
    height: calc(100% - 114px);
    overflow: auto;
    li {
      position: relative;
      height: 56px;
      & > div {
        position: absolute;
        height: 100%;
        font-size: 12px;
      }
      .contents-current {
        position: absolute;
        top: 0;
        right: 32px;
        width: 12px;
        height: 16px;
        background: #000;
        background: url('../../../assets/img/markBa@3x.png') 0 0 transparent;
        background-size: 100%;
        z-index: 9;
      }
    }
    .process {
      z-index: 1;
      background: $background;
      position: absolute;
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
      &-content {
        box-sizing: border-box;
        display: inline-block;
        width: 180px;
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
