<template>
  <div :class="`page-reader ${fullRead ? 'page-reader-full' : ''}`">
    <z-m-header :titleText="titleText" :showRight="true" :hasBorder="true" :show="fullRead">
      <div slot="left" @click="back">
        <SvgIcon iconClass="close_ab" class="icon-left" />
      </div>
      <div slot="right" class="header-right">
        <span v-if="showComicsLink">漫画详情</span>
      </div>
    </z-m-header>
    <Navigation :show="navigationStatus" />
    <Setting :show="settingStatus" />
    <div class="reader-mask">
      <div class="reader-mask-top" v-if="settingData.clickTurnPage" @click="turnPage('prev')"></div>
      <div class="reader-mask-middle" @click="switchFull"></div>
      <div class="reader-mask-bottom" v-if="settingData.clickTurnPage" @click="turnPage('next')"></div>
    </div>
    <div class="reader-img">
      <img-component
        v-for="(item,index) in comicsList"
        :key="item.detail_id"
        :src="item.path"
        :comics="item"
        :default-load="index < pageIndex"
      />
    </div>
    <Contents :show="show" :comicsInfo="comicsInfo" />
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import Navigation from './components/navigation';
import Setting from './components/settings';
import Contents from '@/common/components/contents';
import ImgComponent from './components/imgComponents';
import { reportReader } from '@/common/api/reader';
export default {
  name: 'Reader',
  components: { ZMHeader, SvgIcon, Navigation, Setting, Contents, ImgComponent },
  data() {
    return {
      // 导航操作栏状态,true不显示，false显示
      navigationStatus: true,
      // 头部状态，true不显示，false显示
      fullRead: true,
      // 设置状态，true显示，false不显示
      settingStatus: false,
      contentsStatus: false,
      // 是否显示漫画详情按钮
      showComicsLink: false,
      // 目录相关信息
      show: false,
      titleText: '',
      pageIndex: 3
    };
  },
  mounted() {
    this.pageinit();
    const reportMsg = {
      start_time: Math.floor(new Date().getTime() / 1000),
      last_chapter_id: parseInt(this.$route.query.capterId)
    };
    this.$store.commit('UPDATE_REPORTMSG', reportMsg);
  },
  activated() {
    this.pageinit();
  },
  computed: {
    comicsList: function () {
      return this.$store.state.reader.imagesList.detail;
    },
    comicsInfo: function () {
      return this.$store.state.reader.comic;
    },
    settingData() {
      return this.$store.state.reader.settingData;
    }
  },
  watch: {
    show: function (n, o) {
      this.navigationStatus = n;
      if (this.fullRead) this.navigationStatus = this.fullRead;
    },
    $route: function (to, from) {
      this.pageinit(from);
    }
  },
  methods: {
    async pageinit(flag) {
      this.comicsInfo.cartoon_id = this.$route.query.cartoon_id;
      await this.$store.dispatch('getChapterDetail', this.$route.query.capterId);
      if (!this.comicsList.length) {
        this.Toast(`当前章节无数据`, {
          type: 'fail',
          duration: 1000
        });
      }
      let contentsList = this.$store.state.reader.contentsList;
      // 计算滚动位置
      let localContents = this.$store.state.reader.localContents;
      let reader_per = 0;
      const CAPTERID = parseInt(this.$route.query.capterId);
      const CARTOONID = parseInt(this.$route.query.cartoon_id);
      if (localContents && JSON.stringify(localContents) !== '{}') {
        // 根据本地数据计算滚动位置
        if (CAPTERID && CARTOONID && localContents[CARTOONID]) {
          reader_per = localContents[CARTOONID][CAPTERID] ? localContents[CARTOONID][CAPTERID].read_per : 0;
        }
      } else {
        // 如果没有本地数据，获取后台返回的
        for (let i = 0; i < contentsList.length; i++) {
          if (CAPTERID === contentsList[i].chapter_id) {
            reader_per = contentsList[i].read_per;
          }
        }
      }
      if (flag) {
        reader_per = 0;
      }
      let percentage = reader_per / 100;
      // 计算图片索引
      const idx = Math.ceil(percentage * this.comicsList.length);
      this.pageIndex = idx > 3 ? idx : 3;
      setTimeout(() => {
        // 预留图片加载时间
        let availableScroll = document.body.scrollHeight - innerHeight;
        document.scrollingElement.scrollTop = availableScroll * percentage;
      }, 200);
      // 获取当前阅读漫画章节标题和序号
      for (let i = 0; i < contentsList.length; i++) {
        if (CAPTERID && parseInt(contentsList[i].chapter_id) === CAPTERID) {
          this.titleText = contentsList[i].title + '.' + contentsList[i].intro;
          return false;
        }
      }
    },
    back() {
      history.go(-1);
    },
    // 全屏切换
    switchFull() {
      if (this.settingStatus) {
        this.settingStatus = false;
        this.fullRead = false;
      } else {
        this.fullRead = !this.fullRead;
      }
      if (this.show) {
        this.show = false;
        this.navigationStatus = false;
      }
      this.navigationStatus = !this.navigationStatus;
    },
    // 目录相关操作
    openContents() {
      this.show = true;
      this.navigationStatus = true;
    },
    scorllPos(read_per) {
      let ele = document.scrollingElement;
      let scrollheight = ele.scrollHeight;
      let scrollAbleHeight = scrollheight - innerHeight;
      ele.scrollTop = scrollAbleHeight * (read_per / 100);
    },
    // 图片翻页
    turnPage(direction) {
      const process = Math.floor(this.$store.state.reader.readerProcess) / 100;
      const imgIndex = Math.floor(process * this.comicsList.length);
      const scolltop = document.scrollingElement.scrollTop;
      const h = document.getElementById(`img${this.comicsList[imgIndex - 1].detail_id}`).clientHeight;
      if (direction === 'next') {
        document.scrollingElement.scrollTo({ top: scolltop + h, behavior: 'smooth' });
      } else {
        document.scrollingElement.scrollTo({ top: scolltop - h, behavior: 'smooth' });
      }
    }
  },
  async beforeDestroy() {
    const reportMsg = {
      end_time: Math.floor(new Date().getTime() / 1000)
    };
    this.$store.commit('UPDATE_REPORTMSG', reportMsg);
    let rpdata = this.$store.state.reader.reportMsg;
    // 组装上报数据
    const localContents = JSON.parse(JSON.stringify(this.$store.state.reader.localContents));
    const chapter_info = [];
    for (let i in localContents) {
      if (this.$route.query.cartoon_id === i) {
        const cartoon = localContents[i];
        for (let k in cartoon) {
          chapter_info.push({ chapter_id: k, detail_id: cartoon[k].detail_id });
        }
      }
    }
    rpdata.chapter_info = chapter_info;
    const rp = await reportReader(parseInt(this.$route.query.cartoon_id), this.$store.state.reader.reportMsg);
    if (rp.code === 0) {
      // 上报成功，清除本地数据
      this.$store.dispatch('saveProcess', {});
    }
  }
};
</script>

<style lang="scss" scoped>
.page-reader-full {
  & > {
    transition: top 0.5s;
  }
  & >>> .header-main {
    top: -44px;
  }
}
.page-reader {
  min-height: 100%;
  .header-right {
    font-size: 12px;
    width: 48px;
    background: none;
  }
  .icon-left {
    margin: 10px 0 10px 16px;
  }
  .reader-mask {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 888;
    & > div {
      flex: 1;
    }
    // background: red;
  }
}
</style>
