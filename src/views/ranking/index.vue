<template>
  <div class="ranking">
    <ZMHeader
      :titleText="titleText"
      ref="header"
      :background-color="headColor"
      :class="titleText ? 'animation-active-out' : 'animation-active-in'"
      :show-nav-flag="titleText ? false : true"
    />
    <div
      class="ranking-cover"
      :style="
        `background-image:url(${comicsList[0] ? comicsList[0].cover_detail : ''});background-size:100%;`
      "
      ref="rankingCover"
    >
      <div
        class="ranking-cover-color"
        :style="`background-color:${comicsList[0] ? comicsList[0].bk_color : 'rgba(0,0,0,0)'};`"
      >
        <div>
          <h2>{{ activeName }}</h2>
          <span>{{ comicsList[0] ? comicsList[0].title : '' }}霸占封面</span>
        </div>
      </div>
      <div ref="rankingLottie" class="ranking-cover" style="top:0;"></div>
    </div>
    <div v-if="rankingList.length" class="comics-list-wrap">
      <div class="comments-contents-top"></div>
      <div class="ranking-wrap">
        <ul :class="`ranking-type ${fixeded ? 'fixed' : ''}`" :style="`height:${typeH}px;`">
          <li
            :class="rank.rank_id === parseInt(activeRank) ? 'actived' : ''"
            :key="rank.rank_id"
            v-for="rank in rankingList"
            @click="switchRank(rank)"
          >
            {{ rank.name }}
          </li>
        </ul>
        <div class="ranking-comics-list" ref="comicsList">
          <ul>
            <li v-for="comics in comicsList" :key="comics.cartoon_id">
              <div
                class="comics-cover"
                :class="comics.rank > 3 ? 'comics-cover-normal' : ''"
                :style="`background-image:url(${comics.cover}), url(${defaultLCover})`"
                @click="handleZMInfo(comics.cartoon_id, 1, activeRank)"
              />
              <div class="comics-info" :class="comics.rank > 3 ? 'pt-0' : ''">
                <div class="ranking-info">
                  <span :class="comics.rank < 4 ? 'ranking-serial-top' : 'ranking-serial-bottom'">{{
                    comics.rank >= 10 ? comics.rank : `0${comics.rank}`
                  }}</span>
                  <span class="ranking-occupy" v-if="comics.days >= 7"
                    >连续霸榜{{ Math.floor(comics.days / 7) }}周</span
                  >
                  <span class="comics-info-other" v-else-if="comics.status !== 0">
                    <SvgIcon
                      :iconClass="comics.status > 0 ? 'rankingup_ba' : 'rankingup_bb'"
                      size="small"
                    />
                    {{
                      comics.status > 0
                        ? `上升${Math.abs(comics.status)}位`
                        : `下降${Math.abs(comics.status)}位`
                    }}
                  </span>
                </div>
                <p
                  class="comics-info-title"
                  @click="handleZMInfo(comics.cartoon_id, 1, activeRank)"
                >
                  {{ comics.title }}
                </p>
                <div style="position: relative">
                  <div class="other-container">
                    <p class="comics-info-other" v-if="comics.author.length > 0">
                      <span v-for="(author, index) in comics.author" :key="index" class="author">{{
                        author
                      }}</span>
                    </p>
                    <p class="comics-info-other">{{ comics.status_text }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="no-more" v-if="comicsList && comicsList.length > 0">
            {{ activeName }}Top50都在这里啦～
          </div>
        </div>
      </div>
    </div>
    <no-data-view
      v-else
      class="no-data"
      type="ranking"
      textContent="还没有排行榜诞生～"
    ></no-data-view>
  </div>
</template>

<script>
import myMixins from '@/common/mixin/myMixins';
import SvgIcon from '@/common/components/svg';
import ZMHeader from '@/common/components/ZMHeader';
import noDataView from '@/common/components/noDataView';
import { throttle } from '@/lib/utils';
import * as animationDate from './top.json';
import env from '@/lib/utils/env';

export default {
  name: 'Ranking',
  mixins: [myMixins],
  components: { ZMHeader, SvgIcon, noDataView },
  asyncData({ store, route }) {
    return store.dispatch('ranking/getRankingList', route.query.rank);
  },
  data() {
    return {
      activeRank: this.$route.query.rank,
      activeName: '',
      typeH: 0,
      hasBoder: false,
      scrollHandler: throttle(this.handlerScroll, 100, this),
      titleText: '',
      headColor: 'transparent',
      fixeded: false
    };
  },
  mounted() {
    // this.setQuery(this.currentRank);
    this.typeH =
      innerHeight - this.$refs.header.$el.clientHeight - this.$refs.rankingCover.clientHeight;
    window.addEventListener('scroll', this.scrollHandler, false);
    const rank = this.$store.state.ranking.currentRank;
    const list = this.rankingList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].rank_id === rank) this.activeName = list[i].name;
    }
    this.$store.dispatch('ranking/getRankingComicsList', this.activeRank);
  },
  computed: {
    comicsList() {
      return this.$store.state.ranking.comicsList;
    },
    rankingList() {
      return this.$store.state.ranking.rankingList;
    },
    currentRank() {
      return this.$store.state.ranking.currentRank;
    }
  },
  watch: {
    currentRank(n, o) {
      this.activeRank = n.rank_id;
      this.activeName = n.name;
    }
  },
  methods: {
    switchRank(rank) {
      this.setQuery(rank);
    },
    //选择的rankId更新到路由里
    setQuery(rank) {
      if (env.isClient()) {
        import('lottie-web').then(module => {
          const lottie = module.loadAnimation({
            container: this.$refs.rankingLottie,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: animationDate,
            animationData: animationDate
          });
          lottie.addEventListener('complete', () => {
            module.destroy();
          });
        });
      }
      let query = JSON.parse(JSON.stringify(this.$route.query));
      query.rank = rank.rank_id;
      this.$router.replace({ path: this.$route.path, query: query });
      document.scrollingElement.scrollTop = 0;
    },
    handlerScroll() {
      // 处理滚动
      this.hasBoder = document.scrollingElement.scrollTop !== 0;
      const scrollValue = document.scrollingElement.scrollTop;
      if (scrollValue > this.$refs.rankingCover.clientHeight - this.$refs.header.$el.clientHeight) {
        this.titleText = this.activeName;
        this.headColor = '#fff';
        // setTimeout(() => {
        this.fixeded = true;
        // }, 300);
      } else {
        this.titleText = '';
        this.headColor = 'transparent';
        this.fixeded = false;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, false);
  }
};
</script>

<style lang="scss" scoped>
$FONTCOLOR: #bbb;
$MAINCOLOR: #12e079;
$GRAYFONTCOLOR: #999;
$SIDEWIDTH: 86px;
.pt-0 {
  padding-top: 0 !important;
}
.fixed {
  position: fixed !important;
  top: 44px !important;
}
.ranking {
  font-family: 'pingfang-blod';
  width: 100%;
  .ranking-cover {
    width: 100%;
    height: 196px;
    position: fixed;
    z-index: 9;
  }
  .comics-list-wrap {
    position: absolute;
    z-index: 99;
    width: 100%;
    margin-top: 196px;
  }
  .ranking-cover-color {
    height: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 18px;
      text-align: center;
    }
    > div {
      margin-top: -24px;
    }
  }
  .ranking-wrap {
    position: relative;
    width: 100%;
    * {
      background: #fff;
    }
    .ranking-type {
      width: $SIDEWIDTH;
      position: absolute;
      left: 0;
      top: 0px;
      li {
        box-sizing: border-box;
        height: 56px;
        color: $FONTCOLOR;
        font-family: 'pingfang-blod';
        font-size: 10px;
        padding: 30px 14px 12px 22px;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.actived {
          color: #fff;
          background-image: url('./img/rankbgCa@3x.png');
          background-repeat: no-repeat;
          background-position: 0 0;
          background-size: 103%;
        }
      }
    }
    .ranking-comics-list {
      width: calc(100% - #{$SIDEWIDTH});
      box-sizing: border-box;
      position: absolute;
      padding-left: 30px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      left: 86px;
      top: 0;
      opacity: 1;
      transition-property: left, opacity;
      transition-duration: 0.3s;
      transition-timing-function: ease-in;
      &-back {
        left: 386px;
        opacity: 0;
      }
      li:first-child {
        margin-top: 17px;
      }
      li {
        margin-top: 16px;
        display: flex;
      }
      .no-more {
        text-align: center;
        width: 100%;
        margin-left: -58px;
        margin-top: 40px;
        margin-bottom: 40px;
        color: $FONTCOLOR;
        transform: scale(0.82);
      }
    }
    .comics-cover {
      width: 109px;
      height: 145px;
      border-radius: 4px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      margin-right: 16px;
      &-normal {
        width: 90px;
        height: 120px;
        margin-left: 19px;
      }
    }
    .comics-info {
      flex: 1;
      padding: 8px 16px 0 0;
      display: flex;
      flex-direction: column;
      .ranking-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          display: inline-block;
          font-size: 10px;
          font-weight: bolder;
          text-align: center;
        }
      }
      .ranking-serial-top {
        height: 28px;
        width: 24px;
        background: url('./img/topAa@3x.png') 0 0 no-repeat transparent;
        background-size: contain;
        color: #fff;
        line-height: 32px;
      }
      .ranking-serial-bottom {
        height: 24px;
        width: 24px;
        background: url('./img/topAb@3x.png') 0 0 no-repeat transparent;
        background-size: contain;
        line-height: 24px;
        color: $GRAYFONTCOLOR;
      }
      .ranking-occupy {
        border: 1px solid $MAINCOLOR;
        color: $MAINCOLOR;
        padding: 3px 8px;
        border-radius: 15px;
        font-size: 10px;
        transform: scale(0.82);
        transform-origin: right;
      }
      .comics-info-title {
        font-size: 14px;
        flex: 1;
        margin-top: 16px;
        margin-bottom: 6px;
        color: #222;
        overflow: hidden;
        max-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
      }
      .other-container {
        position: absolute;
        width: calc(100% + 16px);
      }
      .comics-info-other {
        color: $FONTCOLOR;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        transform: scale(0.82);
        transform-origin: 0;
        .author:not(:last-child) {
          &:after {
            content: '/';
          }
        }
      }
    }
  }
  .no-data {
    height: calc(100vh - 44px);
  }
}
.comments-contents-top {
  height: 24px;
  width: 100%;
  background: url('../../assets/img/bannermask.png') no-repeat bottom;
  background-size: 100% 100%;
  margin-top: -24px;
}
.animation-active-in {
  animation: fadeIn 0.3s;
}
.animation-active-out {
  animation: fadeOut 0.3s;
}
@keyframes fadeIn {
  0% {
    opacity: 0.1;
    color: #222222;
    height: 44px;
    background: #ffffff;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 0.1;
    height: 44px;
    background: #fff;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    background: #fff;
    opacity: 1;
  }
}
</style>
