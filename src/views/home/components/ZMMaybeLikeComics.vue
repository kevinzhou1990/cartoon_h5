/** * @info: ZM-home-MaybeLike * @author: PengGeng * @date: 8/5/20-7:19 下午 */
<template>
  <div class="maybe-main">
    <z-m-home-label :label-name="labelName" :rec-id="recId"></z-m-home-label>
    <div
      class="maybe-main-content"
      v-for="(item, index) in maybeLikeComicsList"
      :key="item.cartoon_id"
      @click="handleZMInfo(item.cartoon_id, 2, recId)"
    >
      <div class="maybe-main-content-item">
        <div
          class="maybe-main-content-item-img"
          :style="{
            background: 'url(' + item.cover + '), url(' + defaultLCover + ') no-repeat',
            'background-size': '100%'
          }"
        ></div>
        <div class="maybe-main-content-item-desc">
          <div class="maybe-main-content-item-desc-title">
            <span class="maybe-main-content-item-desc-title-text">{{ item.title || '--' }}</span>
            <div class="maybe-main-content-item-desc-title-c" @click.stop="handleClickCollect">
              <img
                class="maybe-main-content-item-desc-title-c-img"
                :src="item.has_favor ? bb_img : ba_img"
              />
              <span :class="{ 'f-c-g': !isCollectFlag }">{{
                item.has_favor ? '已收藏' : '收藏'
              }}</span>
            </div>
          </div>
          <div class="maybe-main-content-item-desc-chapter">
            <span class="maybe-main-content-item-desc-chapter-author">{{
              item.author | authorFormate
            }}</span>
            <span class="p-l10">{{ item.publish_status || '--' }}</span>
          </div>
          <div class="maybe-main-content-item-desc-label">
            <span
              class="s-border"
              :class="{ 'm-l8': index > 0 }"
              v-for="(tagItem, index) in item.tag"
              :key="index"
            >
              {{ tagItem }}
            </span>
          </div>
          <span class="maybe-main-content-item-desc-content">
            {{ item.intro || '暂无' }}
          </span>
        </div>
      </div>
      <div
        class="maybe-main-content-item-line zm-b-t"
        v-if="index < maybeLikeComicsList.length - 1"
      ></div>
    </div>
    <z-m-home-a-d v-if="ad_list.length" :ad-data="ad_list"></z-m-home-a-d>
  </div>
</template>

<script>
import ZMHomeLabel from './ZMHomeLabel';
import '@/common/filters/home';
import myMixins from '@/common/mixin/myMixins';
import ZMHomeAD from './ZMHomeAD';
export default {
  name: 'ZMPossibale',
  mixins: [myMixins],
  props: {
    maybeLikeComics: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      labelName: '你可能喜欢',
      isCollectFlag: false, // 是否已经收藏
      maybeLikeComicsList: [],
      ba_img: require('@/assets/img/save_ba.png'),
      bb_img: require('@/assets/img/save_bb.png'),
      nums: [1, 2, 3],
      recId: 6,
      ad_list: []
    };
  },
  components: {
    ZMHomeLabel,
    ZMHomeAD
  },
  created() {
    this.labelName = this.maybeLikeComics.name;
    this.recId = this.maybeLikeComics.rec_id || 6;
    this.maybeLikeComicsList = this.maybeLikeComics.cartoon_list;
    this.ad_list = this.maybeLikeComics.ad_list;
  },
  // watch maybeLikeComics ，解决数据不同步问题
  watch: {
    maybeLikeComics: {
      handler(n, o) {
        this.maybeLikeComicsList = n.cartoon_list;
      },
      deep: true
    }
  },
  methods: {
    /**
     * @info: go to maybe like more info
     * @author: PengGeng
     * @date: 8/5/20-7:25 下午
     */
    handleClickMybeLike() {
      console.log('go to maybe like more info');
    },
    /**
     * @info: 点击了收藏
     * @author: PengGeng
     * @date: 10/26/20-10:25 上午
     */
    handleClickCollect() {
      // 是否确认收藏
      // this.isCollectFlag = !this.isCollectFlag
      this.$router.push('/download');
    }
  }
};
</script>
<style scoped lang="scss">
$maybe-fontSize: 18px;
$maybe-color: #222222;
$banner-font-color: #ffffff;
$title-fontSize: 14px;
$chapter-color: #bbbbbb;
$chapter-fontSize: 12px;
$content-fontSize: 12px;
$content-color: #999999;
.f-c-g {
  color: $chapter-color;
}
.p-l10 {
  padding-left: 10px;
}
.m-l8 {
  margin-left: 8px;
}

.maybe-main {
  position: relative;
  padding: 20px 8px;
  color: $maybe-color;
  font-size: $maybe-fontSize;
  font-weight: bold;
  &-content {
    width: 343px;
    height: 137px;
    padding: 12px 8px 0 8px;
    &-item {
      display: flex;
      padding: 8px 0;
      justify-content: flex-start;
      &-img {
        width: 90px;
        height: 120px;
        border-radius: 4px;
        background: url('../../../assets/img/defaultBook.png');
        background-size: cover;
      }
      &-desc {
        display: flex;
        flex-direction: column;
        width: 253px;
        padding-left: 8px;
        &-title {
          display: flex;
          padding: 8px 2px 4px 2px;
          justify-content: space-between;
          font-size: $title-fontSize;
          &-text {
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 180px;
          }
          &-c {
            display: flex;
            justify-content: space-between;
            color: #12e079;
            font-size: $content-fontSize;
            &-img {
              width: 16px;
              height: 16px;
              line-height: 16px;
              margin-right: 4px;
            }
          }
        }
        &-chapter {
          display: flex;
          padding: 0 2px;
          color: $chapter-color;
          font-size: $chapter-fontSize;
          &-author {
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        &-label {
          margin: 2px 2px;
          color: $chapter-color;
          font-size: $chapter-fontSize;
          .s-border {
            display: inline-block;
            min-width: 32px;
            /*padding: 2px;*/
            height: 20px;
            border: 1px solid $chapter-color;
            border-radius: 4px;
            text-align: center;
            line-height: 20px;
          }
        }
        &-content {
          font-weight: bold;
          width: 245px;
          color: $content-color;
          font-size: $content-fontSize;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off *!*/
          -webkit-box-orient: vertical;
        }
      }
      &-line {
        display: flex;
        box-sizing: border-box;
        font-weight: normal;
        opacity: 0.8;
        padding: 4px 0;
        /*width: 1143px;*/
        /*border-bottom: 1px solid #000000;*/
        /*transform: scale(0.5);*/
        /*-webkit-transform-origin-x: 0;*/
      }
    }
  }
}
</style>
