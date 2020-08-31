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
      show: false
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
    },
    comicsInfo: function () {
      return this.$store.state.reader.comic;
    }
  },
  watch: {
    show: function (n, o) {
      this.navigationStatus = n;
      if (this.fullRead) this.navigationStatus = this.fullRead;
    },
    $route: function (to, from) {
      this.pageinit();
    }
  },
  methods: {
    async pageinit() {
      this.comicsInfo.cartoon_id = this.$route.query.cartoon_id;
      this.$store.dispatch('getChapterDetail', this.$route.query.capterId);
      // 计算滚动位置
      let availableScroll = document.body.scrollHeight - innerHeight;
      let localContents = this.$store.state.reader.localContents;
      let reader_per = 0;
      if (localContents && JSON.stringify(localContents) !== '{}') {
        const CAPTERID = parseInt(this.$route.query.capterId);
        const CARTOONID = parseInt(this.$route.query.cartoon_id);
        if (CAPTERID && CARTOONID) reader_per = localContents[CARTOONID][CAPTERID].read_per;
      }
      let percentage = reader_per / 100;
      document.scrollingElement.scrollTop = availableScroll * percentage;
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
