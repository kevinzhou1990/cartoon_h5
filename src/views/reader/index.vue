<template>
  <div :class="`page-reader ${fullRead ? 'page-reader-full' : ''}`" ref="readerComponent">
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
      <div class="reader-mask-middle" @touchstart="touStart" @click="switchFull"></div>
      <div
        class="reader-mask-bottom"
        v-if="settingData.clickTurnPage"
        @click="turnPage('next')"
      ></div>
    </div>
    <div class="reader-img" ref="imgWrap">
      <img-component
        v-for="(item, index) in comicsList"
        :key="item.detail_id"
        :src="item.path"
        :comics="item"
        :default-load="index < 3"
        :height="imgHeight[index]"
      />
    </div>
    <Contents :show="show" :comicsInfo="comicsInfo" />
    <div class="reader-first" v-if="!firstUse" @click="updateFirstReader">
      <img src="@/assets/img/tips_aa@3x.png" alt="引导图" />
    </div>
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
import { getIndex, getPageHeight, getDistance, localReadProcess } from './tools';
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
      pageIndex: 3,
      // 每张图片的高度
      imgHeight: [],
      firstUse: true,
      capterId: ''
    };
  },
  mounted() {
    this.pageinit();
    this.capterId = this.$route.query.capterId;
    const reportMsg = {
      start_time: Math.floor(new Date().getTime() / 1000),
      last_chapter_id: parseInt(this.$route.query.capterId)
    };
    this.firstUse = sessionStorage.getItem('firstUse');
    this.$store.commit('reader/UPDATE_REPORTMSG', reportMsg);
  },
  computed: {
    comicsList: function() {
      return this.$store.state.reader.imagesList.detail;
    },
    comicsInfo: function() {
      return this.$store.state.reader.comic;
    },
    settingData() {
      return this.$store.state.reader.settingData;
    },
    readerProcess() {
      return this.$store.state.reader.readerProcess;
    }
  },
  watch: {
    show: function(n, o) {
      this.navigationStatus = n;
      if (this.fullRead) this.navigationStatus = this.fullRead;
    },
    $route: function(to, from) {
      this.pageinit();
    }
  },
  methods: {
    async pageinit() {
      console.log(this.$store.state.reader.localContents, '+++-----');
      this.comicsInfo.cartoon_id = this.$route.query.cartoon_id;
      this.comicsInfo.last_chapter_id = parseInt(this.$route.query.capterId);
      // 更新漫画上报数据
      this.$store.commit('reader/UPDATE_REPORTMSG', {
        last_chapter_id: parseInt(this.$route.query.capterId)
      });
      await this.$store.dispatch('reader/getChapterDetail', this.$route.query.capterId);
      if (!this.comicsList.length) {
        // 没有图片，回退到上一个页面
        this.Toast(`当前章节无数据`, {
          type: 'fail',
          duration: 1000
        });
        this.back();
      }
      // 根据图片宽高比，计算每一张图片高度，设置页面高度
      const p = getPageHeight(this.comicsList);
      this.$refs.imgWrap.style.height = p.pageHeight + 'px';
      this.imgHeight = p.p;
      // 计算滚动位置
      let contentsList = this.$store.state.reader.contentsList;
      let localContents = this.$store.state.reader.localContents;
      let reader_per = 0;
      const CAPTERID = parseInt(this.$route.query.capterId);
      const CARTOONID = parseInt(this.$route.query.cartoon_id);
      if (!this.firstUse) {
        // 首次进入阅读器
        this.navigationStatus = false;
        this.fullRead = false;
        document.body.classList.add('overflow-hidden');
        this.$refs.readerComponent.classList.add('overflow-hidden');
      }
      // 本地阅读记录存在，且有当前章节的数据时，使用本地数据
      if (
        localContents &&
        JSON.stringify(localContents) !== '{}' &&
        CAPTERID &&
        CARTOONID &&
        localContents[CARTOONID][CAPTERID]
      ) {
        reader_per = localContents[CARTOONID][CAPTERID].read_per;
      } else {
        // 如果没有本地数据，获取后台返回的
        for (let i = 0; i < contentsList.length; i++) {
          if (CAPTERID === contentsList[i].chapter_id) {
            reader_per = contentsList[i].read_per;
          }
        }
      }
      // 上一话下一话跳转的，并且当前话图片数量超过1张，从0开始阅读
      if (this.$route.query.flag && this.comicsList.length > 1) {
        reader_per = 0;
        // 更新本地阅读记录
        const cartoon = localContents[CARTOONID];
        cartoon[CAPTERID] = { read_per: 0 };
      }
      if (reader_per) {
        this.Toast('上次读到这', { type: 'tag', duration: 1000 });
      }
      this.$store.commit('reader/UPDATE_READERPROCESS', reader_per);
      // 计算图片索引
      const idx = getIndex(reader_per, this.comicsList.length);
      // 根据图片索引，计算滚动高度
      let scrollDistance = getDistance(idx, p.p);
      document.scrollingElement.scrollTop = scrollDistance;
      this.pageIndex = idx > 3 ? idx : 3;
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
    // 导航拉动结束后执行
    scorllPos() {
      const idx = getIndex(this.readerProcess, this.comicsList.length);
      const p = getPageHeight(this.comicsList);
      let scrollDistance = getDistance(idx - 1 < 0 ? 0 : idx, p.p);
      document.scrollingElement.scrollTo({ top: scrollDistance - innerHeight / 2 });
    },
    // 图片翻页
    turnPage(direction) {
      const process = Math.floor(this.$store.state.reader.readerProcess) / 100;
      const imgIndex = Math.floor(process * this.comicsList.length);
      const scolltop = document.scrollingElement.scrollTop;
      const h = document.getElementById(`img${this.comicsList[imgIndex - 1].detail_id}`)
        .clientHeight;
      if (direction === 'next') {
        document.scrollingElement.scrollTo({ top: scolltop + h, behavior: 'smooth' });
      } else {
        document.scrollingElement.scrollTo({ top: scolltop - h, behavior: 'smooth' });
      }
    },
    updateFirstReader() {
      sessionStorage.setItem('firstUse', 'no');
      document.body.classList.remove('overflow-hidden');
      this.$refs.readerComponent.classList.remove('overflow-hidden');
      this.firstUse = 'no';
    },
    touStart(e) {
      if (!this.fullRead) {
        this.fullRead = true;
        this.navigationStatus = true;
        this.show = false;
        this.settingStatus = false;
        e.preventDefault();
      }
    }
  },
  async beforeDestroy() {
    const reportMsg = {
      end_time: Math.floor(new Date().getTime() / 1000)
    };
    this.$store.commit('reader/UPDATE_REPORTMSG', reportMsg);
    let rpdata = this.$store.state.reader.reportMsg;
    // 组装上报数据
    const localContents = JSON.parse(JSON.stringify(this.$store.state.reader.localContents));
    const chapter_info = [];
    console.log(localContents, '本地记录');
    for (let i in localContents) {
      if (this.$route.query.cartoon_id === i) {
        const cartoon = localContents[i];
        for (let k in cartoon) {
          chapter_info.push({ chapter_id: k, detail_id: cartoon[k].detail_id });
        }
      }
    }
    rpdata.chapter_info = chapter_info;
    const rp = await reportReader(
      parseInt(this.$route.query.cartoon_id),
      this.$store.state.reader.reportMsg
    );
    if (rp.code === 0) {
      // 上报成功，清除本地数据
      // this.$store.dispatch('reader/saveProcess', {});
      // 更新漫画详情数据
      const params = {
        cartoon_id: this.$route.query.cartoon_id,
        ref: this.$route.query.ref,
        ref_id: this.$route.query.refId
      };
      this.$store.dispatch('detail/getDetail', params);
    }
    // console.log(this.imgIndex, '=====+++');
    // 更新本地阅读数据
    // localReadProcess(this, {
    //   chapter_id: parseInt(this.capterId),
    //   detail: this.comicsList
    // });
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
  max-height: 101%;
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
  .reader-first {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    justify-items: center;
    z-index: 999;
    align-items: center;
    img {
      width: 100%;
    }
  }
}
</style>
