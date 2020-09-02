<template>
  <div
    :class="`navigation-wrap navigation-wrap-${funcPos} ${show ? 'navigation-wrap-' + funcPos + '-hidden' : ''}`"
  >
    <div :class="`navigation-content ${touching ? 'navigation-content-touch' : ''}`">
      <div :class="`navigation-contents ${touching}`" @click="openContents">
        <SvgIcon iconClass="catalog_ba" size="small" />
      </div>
      <div
        :class="`navigation-next ${touching}`"
        v-if="contentsList.indexOf(parseInt($route.query.capterId)) > 0"
        @click="turnPage(0)"
      >
        <span>上一话</span>
      </div>
      <div
        :class="`navigation-process ${touching ? 'navigation-process-touch': ''}`"
        @touchstart="handlerTouchStart"
        @touchmove="handlerTouchMove"
        @touchend="handlerTouchEnd"
      >
        <div
          :style="`height:${readerProcess}%;`"
          :class="`${readerProcess > 97 ? 'reader-process' : ''}`"
        ></div>
        <div class="reader-process-tag">
          <div>
            <span>{{pageIndex}}</span>
            <i></i>
            <span>{{imagesList.detail.length}}</span>
          </div>
        </div>
        <div :class="`tag ${'tag-'+touching}`">{{pageIndex}}/{{imagesList.detail.length}}</div>
      </div>
      <div
        :class="`navigation-next ${touching}`"
        v-if="contentsList.indexOf(parseInt($route.query.capterId)) !== contentsList.length - 1"
        @click="turnPage(1)"
      >
        <span>下一话</span>
      </div>
      <div
        :class="`setting-icon ${funcPos} ${show || touching ? 'hidden' : ''}`"
        @click="switchFull"
      >
        <SvgIcon iconClass="set_ba" size="small" />
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Navigation',
  components: { SvgIcon },
  props: {
    show: { type: Boolean, default: true }
  },
  data() {
    return {
      touching: '',
      initY: 0,
      initHeight: 0,
      // 实际图片索引
      imgIndex: 0,
      // 显示索引
      pageIndex: 1,
      // 开始索引
      startIndex: 1
    };
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    readerProcess(n, o) {
      // 计算图片页码
      let pageIndex = Math.floor((n / 100) * this.imagesList.detail.length);
      if (pageIndex === 0) {
        pageIndex = 1;
      }
      this.pageIndex = pageIndex;
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    imagesList: function () {
      return this.$store.state.reader.imagesList;
    },
    contentsList: function () {
      return this.$store.state.reader.contentsList.map((item) => {
        return item.chapter_id;
      });
    },
    localContents: function () {
      return this.$store.state.reader.localContents;
    },
    readerProcess: function () {
      return this.$store.state.reader.readerProcess;
    },
    funcPos: function () {
      return this.$store.state.reader.settingData.funcPos;
    }
  },
  methods: {
    init() {
      const CARTOONID = parseInt(this.$route.query.cartoon_id);
      const CAPTERID = parseInt(this.$route.query.capterId);
      let read_per = 0;
      if (CARTOONID && CAPTERID) {
        // 读取本地进度，如没有本地进度，获取目录中的京都
        if (this.localContents[CARTOONID]) {
          const p = this.$store.state.reader.localContents[CARTOONID][CAPTERID];
          if (p) read_per = p.read_per;
        } else {
          const list = this.$store.state.reader.contentsList;
          for (let i = 0; i < list.length; i++) {
            if (list[i].chapter_id === CAPTERID) {
              read_per = list[i].read_per;
            }
          }
        }
      }
      let index = Math.floor((read_per / 100) * this.imagesList.detail.length + 1);
      this.pageIndex = index > this.imagesList.detail.length ? this.imagesList.detail.length : index;
      this.$store.commit('UPDATE_READERPROCESS', read_per);
    },
    switchFull() {
      this.$parent.navigationStatus = !this.$parent.navigationStatus;
      this.$parent.settingStatus = !this.$parent.settingStatus;
    },
    openContents() {
      this.$parent.show = true;
    },
    handlerTouchStart(e) {
      e.preventDefault();
      this.initY = Math.round(e.changedTouches[0].clientY);
      this.initHeight = Math.round(272 * (this.readerProcess / 100));
      this.touching = 'touch';
      this.$store.commit('UPDATE_READSCROLL');
      this.startIndex = this.pageIndex;
    },
    handlerTouchMove(e) {
      let posY = Math.round(e.touches[0].clientY);
      // 移动距离
      let gap = posY - this.initY;
      if (gap + this.initHeight > 272 || gap + this.initHeight < 0) return;
      let read_per = ((gap + this.initHeight) / 272) * 100;
      this.$store.commit('UPDATE_READERPROCESS', read_per);
      this.$parent.scorllPos(read_per);
    },
    handlerTouchEnd(e) {
      this.touching = '';
      // 存阅读进度
      const localContents = JSON.parse(JSON.stringify(this.localContents));
      const chapter = {};
      chapter[this.imagesList.chapter_id] = {
        read_per: Math.round(this.readerProcess),
        detail_id: this.imagesList.detail[this.imgIndex].detail_id
      };
      localContents[this.$route.query.cartoon_id] = {
        ...chapter
      };
      this.$store.dispatch('saveProcess', localContents);
      this.$store.commit('UPDATE_READSCROLL');
      this.Toast(`上次所在  ${this.startIndex}/${this.imagesList.detail.length}`, {
        type: 'success',
        duration: 1000,
        toastStyle: 'free',
        callback: () => {
          console.log(this);
        }
      });
    },
    turnPage(type) {
      let cartoon_id = this.$route.query.cartoon_id;
      let idx = this.contentsList.indexOf(parseInt(this.$route.query.capterId));
      if (type) {
        // 下一话
        this.$router.replace({ path: 'reader', query: { cartoon_id, capterId: this.contentsList[idx + 1] } });
      } else {
        // 上一话
        this.$router.replace({ path: 'reader', query: { cartoon_id, capterId: this.contentsList[idx - 1] } });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-wrap {
  text-size-adjust: none;
  position: fixed;
  top: calc(50% - 160px);
  width: 40px;
  z-index: 999;
  .navigation-next {
    margin-top: 16px;
  }
  &-left {
    left: 16px;
    transition: left 0.2s;
    .navigation-contents,
    .navigation-next {
      transition: left 0.2s;
      left: 0;
      &.touch {
        left: -56px;
      }
    }
  }
  &-left-hidden {
    left: -56px;
  }
  &-right {
    right: 16px;
    transition: right 0.2s;
    .navigation-contents,
    .navigation-next {
      transition: right 0.2s;
      right: 0;
      &.touch {
        right: -56px;
      }
    }
  }
  &-right-hidden {
    right: -56px;
  }
  .navigation-content-touch {
    position: relative;
    height: 272px;
    .navigation-contents,
    .navigation-next {
      position: absolute;
    }
    .navigation-contents {
      top: 0;
    }
    .navigation-next {
      bottom: 0;
    }
  }
  .navigation-process {
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    background: rgba(51, 51, 51, 0.7);
    border-radius: 8px;
    margin: 16px 0 16px 0;
    position: relative;
    &-touch {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
      height: 272px;
      & > div {
        background: rgba(255, 255, 255, 1);
        border-radius: 8px 8px 0 0;
      }
    }
    & > div {
      background: rgba(255, 255, 255, 1);
      border-radius: 8px 8px 0 0;
    }
    .reader-process {
      border-radius: 8px;
    }
    .tag {
      display: none;
      box-sizing: border-box;
      padding-right: 15px;
      font-family: 'pingfang-blod';
      background-image: url('./img/bubble_aa.png');
      background-size: 100%;
      background-position: 0 0;
      position: absolute;
      background-color: transparent;
      color: #fff;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      right: 56px;
      width: 94px;
      height: 40px;
      &.tag-touch {
        display: block;
        margin-top: -21px;
      }
    }
  }
  .navigation-contents,
  .navigation-next {
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
    span {
      transform: scale(0.875);
      display: inline-block;
      height: 40px;
      width: 40px;
    }
  }
  .setting-icon {
    position: fixed;
    bottom: 75px;
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
    &.right {
      right: 16px;
      transition: right 0.2s;
      &.hidden {
        right: -56px;
      }
    }
    &.left {
      left: 16px;
      transition: left 0.2s;
      &.hidden {
        left: -56px;
      }
    }
  }
  .reader-process-tag {
    background: transparent !important;
    color: #bbbbbb;
    position: absolute;
    bottom: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    div {
      i {
        display: block;
        width: 12px;
        height: 4px;
        background: url('./img/semicolon_line.png') 0 0 transparent;
        background-size: 100%;
        margin-left: 1px;
      }
    }
  }
}
</style>
