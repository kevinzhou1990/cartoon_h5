<template>
  <div class="box" ref="recommendList">
    <div>
      <z-m-header :title-text="titleText" show-right>
        <div slot="right" class="right-change">
          <div class="icon-bg" :class="isLightIcon ? 'trl-l': 'trl-r' "></div>
        </div>
      </z-m-header>
      <div style="z-index: 999;" :class="isLightIcon ? 'icon-l-g': 'icon-l-g-l' " @click="handleClickLightIcon"></div>
      <div style="z-index: 999;" :class="isLightIcon ? 'icon-l-g-r': 'icon-r-g' " @click="handleClickLightIcon"></div>
    </div>
    <div class="nav-bar">
      <z-m-nav-bar
          :tabListData="tabListData"
          :acticeIndex="acticeIndex"
          @getRecommendData="getComicsList"
      ></z-m-nav-bar>
    </div>
      <div style="position:relative; width: 343px; height: 86px; margin: 16px 16px 0 16px;" v-if="dataList.length">
        <z-mswiper :banner-list="adBannerList" :bannerHeight="bannerHeight"></z-mswiper>
      </div>
      <div>
        <template v-if="dataList.length">
          <mt-loadmore :bottom-method="nextPage" :bottom-all-loaded="allLoaded" ref="loadmore">
            <z-m-table v-if="isLightIcon" :dataList="dataList"></z-m-table>
            <z-m-list v-else :dataList="dataList"></z-m-list>
            <z-m-no-data v-if="allLoaded"></z-m-no-data>
          </mt-loadmore>
        </template>
        <div v-else>
          <z-m-rec-loading v-if="isRecLoading"></z-m-rec-loading>
          <z-m-not-network></z-m-not-network>
        </div>
      </div>

  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader'
import ZMNotNetwork from '@/common/components/noNetwork'
import ZMNavBar from './components/ZMNavBar'
import ZMTable from './components/ZMTable'
import ZMList from './components/ZMList'
import ZMswiper from '@/common/components/ZMswiper'
import ZMRecLoading from '@/views/recommend/components/ZMRecLoading'
import ZMNoData from '@/common/components/ZMNoData'
import { getMoreComics } from '@/common/api/home'
const defaultBanner = require('@/assets/img/defaultBanner.png')
export default {
  name: 'recommentd',
  components: {
    ZMHeader,
    ZMNavBar,
    ZMTable,
    ZMList,
    ZMNotNetwork,
	  ZMRecLoading,
	  ZMswiper,
	  ZMNoData
  },
  data() {
    return {
      titleText: '更多推荐',
      acticeIndex: 1,
      tabListData: null,
      isLightIcon: false, // false 右边高亮  true 左边高亮
      listBb: require('./images/list_bb.png'),
      listBa: require('./images/list_ba.png'),
      blockBb: require('./images/block_bb.png'),
      blockBa: require('./images/block_ba.png'),
      showDataFlag: false, // 显示是否显示没有网络的情况
      dataList: [],
	    isRecLoading: false,
	    adBannerList: [defaultBanner, defaultBanner, defaultBanner], // 广告
	    bannerHeight: 86,
      currentPage: 1,
	    totalPages: 0,
      pageSize: 30,
	    allLoaded: false
    }
  },
  computed: {},
  created() {
    this.acticeIndex = Number(this.$route.query.SEC_ID) || 1
    this.tabListData = JSON.parse(sessionStorage.getItem('SET_REC_DATA'))
    // this.getData()
  },
  methods: {
  /**
   * @info: 获取tab上的数据
   * @author: PengGeng
   * @date: 8/21/20-5:32 下午
   */
    async getData() {
      const reqData = {
		    page: this.currentPage,
        page_size: this.pageSize
      }
	    this.isRecLoading = true
      const resData = await getMoreComics(this.acticeIndex, reqData)
      if (resData && resData.code === 0 && resData.data) {
	      this.isRecLoading = false
        let cartoonList = resData.data.cartoon_list || []
        this.dataList.push(...cartoonList)
        this.totalPages = resData.data.total_pages || 0
	      if (this.currentPage >= this.totalPages) {
          setTimeout(() => {
		      this.allLoaded = true
          }, 200)
        }
	      // this.adBannerList = resData.data.ad_list || []
      } else {
        this.$toast(resData.msg || '系统繁忙,请稍后重试')
      }
    },
	  /**
	   * @info: 点击切换展示模式
	   * @author: PengGeng
	   * @date: 9/4/20-4:54 下午
	   */
    handleClickLightIcon() {
      this.isLightIcon = !this.isLightIcon
      console.log('to do something。。。。')
    },
	  /**
	   * @info: 点击tabbar 然后重新请求数据
	   * @author: PengGeng
	   * @date: 9/4/20-4:54 下午
	   */
	  getComicsList(val) {
      console.log('getComicsList.....', val)
		  this.allLoaded = false
		  this.$refs.recommendList.scrollTop = 0;
		  this.acticeIndex = Number(val)
		  this.$store.commit('UPDATE_SEC_ID', this.acticeIndex);
      this.currentPage = 1
      this.dataList = []
      this.getData()
    },
	  // resfreshPage() {
    //   this.$ref.loadmore.onTopLoaded()
    //   console.log('resfreshPage')
    // },
	  nextPage() {
      setTimeout(() => {
			  if (this.totalPages === 1) return
			  if (this.currentPage === this.totalPages) {
				  this.allLoaded = true
				  return
			  }
			  console.log('触发了。。。', this.currentPage, this.totalPages)
			  // this.$refs.loadmore.onBottomLoaded()
			  // if (this.currentPage >= this.totalPages) this.allLoaded = true
			  this.currentPage++
			  this.getData()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  $imgUrl: './images/';
  $imgName: block_bb !default;
  $xLineLength: 3px !default;
  @mixin imgSet($imgName) {
    background: url(./images/#{$imgName}.png) no-repeat;
    background-size: 100%;
    transition: all 0.6s ease-in-out;
  }
  @mixin iconBg {
    position: fixed;
    display: block;
    top: 10px;
    width: 16px;
    height: 16px;
    margin-top: 4px;
  }
  @mixin trans($xLineLength: 3px) {
    transition: transform .3s;
    transform: translateX(#{$xLineLength}px);
  }
  .right-change {
    overflow: hidden;
    display: flex;
    width: 44px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    margin: 10px 0;
    background: #E6E6E6;
  }
  .icon-bg {
    margin: 3px 0 3px 0;
    width: 18px;
    height: 18px;
    background: #ffffff;
    border-radius: 50%;
    /*&:before {*/
    /*  background: #ffffff;*/
    /*  transition: transform .3s;*/
    /*  transform: translateX(18px);*/
    /*}*/
    /*&:after {*/
    /*  background: #ffffff;*/
    /*  transition: transform .3s;*/
    /*  transform: translateX(18px);*/
    /*}*/
  }
  .trl-l {
    @include trans(22)
  }
  .trl-r {
    @include trans(3)
  }
  .icon-l-g {
    @include iconBg;
    right: 40px;
    transition:  all .3s ease-in-out;
    background: url("./images/list_bb.png") no-repeat;
    background-size: 100%;
  }
  .icon-r-g {
    @include iconBg;
    right: 20px;
    transition:  all .3s ease-in-out;
    background: url("./images/block_bb.png") no-repeat;
    background-size: 100%;
  }
  .icon-l-g-l {
    right: 40px;
    @include iconBg;
    @include imgSet(list_ba)
    /*background: url("./images/list_ba.png") no-repeat;*/
    /*background-size: 100%;*/
    /*transition: all 0.8s ease-in-out;*/
  }
  .icon-l-g-r {
    right: 20px;
    @include iconBg;
    @include imgSet(block_ba)
    /*background: url("./images/block_ba.png") no-repeat;*/
    /*background-size: 100%;*/
    /*transition: all 0.8s ease-in-out;*/
  }
  .nav-bar {
    position: relative;
    width: 100%;
    height: 56px;
    box-sizing: border-box;
  }
  .point-customs {
    display: inline-block;
    width: 6px;
    height: 6px;
    border: 1px solid #ffffff;
    margin: 0 4px !important;
    border-radius: 50%;
    transition: width 0.3s ease-in-out;
  }

</style>
