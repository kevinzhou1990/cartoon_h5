/**
* @info:
* @author: PengGeng
* @date: 8/4/20-4:29 下午
*/
<template>
  <div class="hot-main" v-if="hotComicsList.length">
    <z-m-home-label
        :label-name="labelName"
        :rec-id="recId">
    </z-m-home-label>
    <div class="hot-main-content">
      <div
          class="hot-main-content-item"
          v-for="item in hotComicsList"
          :key="item.cartoon_id"
          @click="handleZMInfo(item.cartoon_id)"
      >
        <span class="hot-main-content-item-img" :style="{ background: 'url('+item.cover+')', 'background-size': '100%'}"></span>
        <span class="hot-main-content-item-title">{{ item.title || '-' }}</span>
        <span class="hot-main-content-item-chapter"> {{ item.publish_status || '待更新' }}</span>
      </div>
    </div>
    <div class="hot-main-btn" v-if="hotComicsList.length >= 6">
      <span class="hot-main-btn-content" @click="handleChange">换一批</span>
    </div>
  </div>
</template>

<script>
import ZMHomeLabel from './ZMHomeLabel'
import { getMoreComics } from '@/common/api/home'
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMHotComics',
  mixins: [myMixins],
  props: {
    hotComicsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      labelName: '热番',
      hotComicsList: [],
      recId: 2,
      currentPage: 1,
      pageSize: 6,
      totalPages: 1
    }
  },
  components: {
    ZMHomeLabel
  },
  created() {
    this.labelName = this.hotComicsData.name
    this.hotComicsList = this.hotComicsData.cartoon_list
    this.recId = this.hotComicsData.rec_id
  },
  methods: {
    /**
     * @info: 点击更换一批
     * @author: PengGeng
     * @date: 8/20/20-11:16 上午
     */
    async handleChange() {
      const reqData = {
        page: this.currentPage,
        page_size: this.pageSize
      }
      console.log(reqData)
      const resData = await getMoreComics(this.recId, reqData)
      if (resData && resData.code === 0){
        this.hotComicsList = resData.data.cartoon_list
        this.totalPage = resData.data.total_pages
        this.currentPage = this.currentPage < this.totalPage ? this.currentPage + 1 : 1
      } else {
        this.$toast(resData.msg || '系统出错,请稍后重试')
      }
      console.log('handle click hot comics')
    }
  }
}
</script>

<style scoped lang="scss">
  $main-color: #222222;
  $main-fontSize: 18px;
  $title-fontSize: 14px;
  $chapter-color: #BBBBBB;
  $chapter-fontSize: 10px;
  .hot-main {
    position: relative;
    padding: 20px 8px;
    color: $main-color;
    font-size: $main-fontSize;

    &-content {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 12px 8px 8px 0px;

      &-item {
        width: 109px;
        display: flex;
        padding: 4px 0 4px 8px;
        flex-direction: column;

        &-img {
          width: 109px;
          height: 145px;
          background: url("../../../assets/img/defaultBook.png") no-repeat;
          background-size: cover;
          /*padding: 8px;*/
          border-radius: 4px;
          margin-bottom: 4px;
        }

        &-title {
          padding: 4px 0 2px 0;
          font-size: $title-fontSize;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &-chapter {
          padding: 2px 0 8px 0;
          font-size: $chapter-fontSize;
          transform: scale(0.83);
          -webkit-transform-origin-x: 0;
          color: $chapter-color;
          font-weight: bold;
        }
      }
    }

    &-btn {
      display: flex;
      justify-content: center;

      &-content {
        width: 160px;
        height: 44px;
        text-align: center;
        border: 1px solid #12E079;
        border-radius: 22px;
        line-height: 44px;
        font-size: 12px;
        color: #12E079;
        font-weight: bold;

        &:before {
          display: inline-block;
          content: '';
          margin-right: 4px;
          margin-bottom: 2px;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          background: url("../images/replace.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }
</style>
