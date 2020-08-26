<template>
  <div :class="`page-reader ${fullRead ? 'page-reader-full' : ''}`">
    <ZMHeader titleText="#001.魔神降临" :showRight="true" :hasBorder="true" :show="fullRead">
      <div slot="left" @click="back">
        <SvgIcon iconClass="close_ab" class="icon-left" />
      </div>
      <div slot="right" class="header-right">
        <span v-if="showComicsLink">漫画详情</span>
      </div>
    </ZMHeader>
    <Navigation :funcPos="funcPos" :show="navigationStatus" @switchFull="switchSetting" />
    <Setting
      :funcPos="funcPos"
      :show="settingStatus"
      @changeFuncPos="changeFuncPos"
      @switchSetting="switchSetting"
    />
    <div class="reader-mask" @click="switchFull"></div>
    <div class="reader-img">
      <img-component
        v-for="item in comicsList"
        :key="item.detail_id"
        :src="item.path"
        :comics="item"
      />
      <!-- <img
        v-for="item in comicsList"
        alt
        style="width:100%;"
        :src="item.path"
        :key="item.detail_id"
        :id="item.detail_id"
      />-->
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
export default {
  name: 'Reader',
  components: { ZMHeader, SvgIcon, Navigation, Setting, Contents, ImgComponent },
  data() {
    return {
      // 功能栏位置，right:右，left:左，默认：right
      funcPos: 'right',
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
      comicsInfo: {
        status: 1, // 1=连载中,2=已完结,3=休更中
        update_freq: '每周六更新', // 更新频率
        title: '#001', // 章节编号
        // sort: 2, // 1=正序,2=倒序
        last_chapter_id: 1, // 当前阅读的章节
        cartoon_id: ''
      }
    };
  },
  mounted() {
    this.pageinit();
  },
  activated() {
    this.pageinit();
  },
  computed: {
    comicsList: function () {
      return this.$store.state.reader.imagesList.detail;
    }
  },
  watch: {
    show: function (n, o) {
      this.navigationStatus = n;
      if (this.fullRead) this.navigationStatus = this.fullRead;
    }
  },
  methods: {
    async pageinit() {
      this.comicsInfo.cartoon_id = this.$route.query.cartoon_id;
      this.$store.dispatch('getChapterDetail', this.$route.query.capterId);
    },
    back() {
      history.go(-1);
    },
    // 更改功能栏位置
    changeFuncPos() {
      this.funcPos = this.funcPos === 'right' ? 'left' : 'right';
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
    switchSetting() {
      // 设置打开，不显示导航
      this.navigationStatus = !this.navigationStatus;
      this.settingStatus = !this.settingStatus;
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
  padding-top: 44px;
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
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 888;
    // background: red;
  }
}
</style>
