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
      <common-info
        :dataList = "hotComicsList"
        refs = 2
        :refId = "recId"
        showStatus
      ></common-info>
    </div>
    <div class="hot-main-btn" v-if="hotComicsList.length >= 6 || nowPages!==1">
      <span class="hot-main-btn-content" @click="handleChange">换一批</span>
    </div>
    <z-m-home-a-d v-if="ad_list.length" :ad-data="ad_list"></z-m-home-a-d>
  </div>
</template>

<script>
import ZMHomeLabel from './ZMHomeLabel'
import { getMoreComics } from '@/common/api/home'
import myMixins from '@/common/mixin/myMixins'
import commonInfo from '@/common/components/WKTableItem'
import ZMHomeAD from './ZMHomeAD'
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
      currentPage: 2,
      pageSize: 6,
      totalPages: 1,
      ad_list: [],
      nowPages: 1 // 当前在第几页
    }
  },
  components: {
    ZMHomeLabel,
    ZMHomeAD,
    commonInfo
  },
  created() {
    this.labelName = this.hotComicsData.name
    this.hotComicsList = this.hotComicsData.cartoon_list
    this.recId = this.hotComicsData.rec_id
    this.ad_list = this.hotComicsData.ad_list
  },
  methods: {
    /**
     * @info: 点击更换一批
     * @author: PengGeng
     * @date: 8/20/20-11:16 上午
     */
    async handleChange() {
      this.nowPages = this.currentPage
      const reqData = {
        page: this.currentPage,
        page_size: this.pageSize
      }
      const resData = await getMoreComics(this.recId, reqData)
      if (resData && resData.code === 0){
        debugger
        if (resData.data && !resData.data.cartoon_list.length) return
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
  $chapter-fontSize: 12px;
  .hot-main {
    position: relative;
    padding: 20px 8px;
    color: $main-color;
    font-size: $main-fontSize;

    &-content {
      padding: 8px 4px 12px 4px;
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
