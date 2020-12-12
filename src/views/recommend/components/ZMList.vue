/**
* @info: ZM-recommend-list
* @author: PengGeng
* @date: 8/10/20-4:23 下午
*/
<template>
  <div class="maybe-main">
    <div style="padding: 0 8px;">
      <z-mswiper :banner-height="bannerHeight" :isBottomImg="isBottomImg" :swiperOptionsProps="swiperOptions"></z-mswiper>
    </div>
    <div class="maybe-main-content" v-for="(item, index) in dataList" :key="item.cartoon_id">
      <div class="maybe-main-content-item" @click.stop="handleZMInfo(item.cartoon_id, 4)">
        <div class="maybe-main-content-item-img" :style="{background: 'url('+item.cover+')', 'background-size': 'contain'}"></div>
        <div class="maybe-main-content-item-desc">
          <div class="maybe-main-content-item-desc-title">
            <span class="maybe-main-content-item-desc-title-text">{{ item.title }}</span>
          </div>
          <div class="maybe-main-content-item-desc-chapter">
            <span class="maybe-main-content-item-desc-chapter-author">{{ item.author | authorFormate }}</span>
            <span class="p-l10">{{ item.publish_status || '--' }}</span>
          </div>
          <div class="maybe-main-content-item-desc-label">
            <span class="s-border"
                  :class="{'m-l8': index >0}"
                  v-for="(tagItem,index) in item.tag"
                  :key="index"
            >
              {{ tagItem }}
            </span>
          </div>
          <span class="maybe-main-content-item-desc-content">
            {{ item.intro }}
          </span>
        </div>
      </div>
      <div class="maybe-main-content-item-line zm-b-t" v-if="index < dataList.length -1"></div>
    </div>
  </div>
</template>

<script>
  import ZMswiper from '@/common/components/ZMswiper';
  import myMixins from '@/common/mixin/myMixins';
  import '@/common/filters/home';

  export default {
    name: 'ZMPossibale',
    mixins: [myMixins],
    props: {
      dataList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        bannerHeight: 90,
        isBottomImg: false,
        nums: [1, 2, 3],
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            // type: 'custom',
            clickable: true, //点击分页器的指示点分页器会控制Swiper切换
            bulletClass: 'point-customs-recommend',
            bulletActiveClass: 'point-customs-active'
          }
        }
      };
    },
    components: {
      ZMswiper
    }
  };
</script>
<style scoped lang="scss">
  $maybe-fontSize: 18px;
  $maybe-color: #222222;
  $banner-font-color: #FFFFFF;
  $title-fontSize: 14px;
  $chapter-color: #BBBBBB;
  $chapter-fontSize: 10px;
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
          background: url("../../../assets/img/defaultBook.png") no-repeat;
          background-size: cover;
        }

        &-desc {
          display: flex;
          flex-direction: column;
          width: 253px;
          padding-left: 8px;

          &-title {
            display: flex;
            padding: 4px 2px;
            justify-content: space-between;
            font-size: $title-fontSize;

            &-text {
              display: block;
              overflow: hidden;
              width: 245px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            &-c {
              display: flex;
              justify-content: space-between;
              color: #12E079;
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
            align-items: center;
            padding: 0 2px 2px 2px;
            color: $chapter-color;
            font-size: $chapter-fontSize;

            &-author {
              display: inline-block;
              max-width: 155px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }

          &-label {
            margin: 4px 2px;
            color: $chapter-color;
            font-size: 12px;
            .s-border {
              position: relative;
              display: inline-block;
              padding: 3px 6px;
              /*min-width: 32px;*/
              text-align: center;
              /*border: 1px solid rgba(0, 0, 0, 0.2);*/
              /*border-radius: 4px;*/
              &:before {
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                width: 200%;
                color: #bbb;
                height: 200%;
                -webkit-transform-origin: left top;
                transform-origin: left top;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
                text-align: center;
                border: 2px solid rgba(0,0,0,0.2);
                border-radius: 8px;
              }
            }
          }

          &-content {
            margin-top: 4px;
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
          opacity: 0.8;
          margin: 6px 0;
          /*width: 1143px;*/
          /*border-bottom: 1px solid #000000;*/
          /*transform: scale(0.5);*/
          /*-webkit-transform-origin-x: 0;*/
        }
      }
    }
  }
</style>
