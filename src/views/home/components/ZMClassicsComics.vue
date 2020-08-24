/**
* @info: ZM-home-classics
* @author: PengGeng
* @date: 8/5/20-2:12 下午
*/
<template>
  <div class="classics-main">
    <z-m-home-label
        :label-name="labelName"
        :rec-id="recId"
    ></z-m-home-label>
    <div class="classics-main-content">
      <div
          class="classics-main-content-item"
          v-for="item in classicsComicsList"
          :key="item.cartoon_id"
          @click="handleZMInfo(item.cartoon_id)"
      >
        <div class="classics-main-content-item-bg">
          <div class="classics-main-content-item-bg-img" :style="{background: 'url('+item.cover+')'}"></div>
          <div class="classics-main-content-item-bg-content">
            <span class="classics-main-content-item-bg-content-title">{{ item.title }}</span>
            <div>
              <span class="classics-main-content-item-bg-content-label" v-for="(tagItem, index) in item.tag" :key="index">{{ tagItem }}</span>
            </div>
            <span class="classics-main-content-item-bg-content-chapter">{{ item.publish_status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZMHomeLabel from './ZMHomeLabel'
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMClassicsComics',
  mixins: [myMixins],
  props: {
    classicsComicsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      labelName: '经典漫画',
      classicsComicsList: [],
      recId: 4
    }
  },
  components: {
    ZMHomeLabel
  },
  created() {
    this.labelName = this.classicsComicsData.name
    this.classicsComicsList = this.classicsComicsData.cartoon_list
    this.recId = this.classicsComicsData.rec_id
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  $main-color: #222222;
  $main-fontSize: 18px;
  $title-fontSize: 14px;
  $chapter-fontSize: 10px;
  $chapter-color: #BBBBBB;
  .classics-main {
    position: relative;
    padding: 20px 8px;
    color: $main-color;
    font-size: $main-fontSize;
    &-content {
      display: flex;
      justify-content: space-between;
      padding: 4px 0 20px 0;
      flex-wrap: wrap;
      &-item {
        position: relative;
        width: 175px;
        height: 104px;
        padding: 4px 0;
        &-bg {
          display: flex;
          width: 175px;
          justify-content: flex-start;
          background: url("../images/module_bg.png") no-repeat;
          background-position-y: bottom;
          background-size: contain;
          border-radius: 4px;
          &-img {
            /*display: inline-block;*/
            margin-left: 9px;
            margin-top: 8px;
            width: 72px;
            height: 96px;
            border-radius: 4px;
            background: url("../../../assets/img/defaultBook.png") no-repeat;
            background-size: cover;
            background-position-y: bottom;
          }
          &-content {
            padding-top: 24px;
            padding-bottom: 10px;
            padding-left: 8px;
            width: 82px;
            color: $chapter-color;
            font-size: $chapter-fontSize;
            &-title {
              display: block;
              padding: 4px 0;
              color: $main-color;
              font-size: $title-fontSize;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &-label {
              display: inline-block;
              padding: 2px;
              min-width: 32px;
              height: 20px;
              border: 1px solid rgba(0,0,0,0.08);;
              border-radius: 4px;
              text-align: center;
              line-height: 20px;
              -webkit-transform-origin-x: 0;
              transform: scale(0.83);
            }
            &-chapter {
              display: inline-block;
              -webkit-transform-origin-x: 0;
              transform: scale(0.83);
              padding: 4px 0;
            }
          }
        }
      }
    }
  }
</style>
