export default {
  data() {
    return {
      defaultCover: require('../../assets/img/defaultBook.png'), // comics Icon
      defaultLCover: require('../../assets/img/defaultLBook.png'), // 长的默认图
      defaultCBanner: require('../../assets/img/defaultCBanner.png'), // 漫画的大图
      defaultBanner: require('../../assets/img/defaultBanner.png'), // banner
      defaultBannerAb: require('../../assets/img/defaultBannerAD.png') // ad default
    }
  },
  methods: {
  /**
   * @info: 跳转到详情
   * @author: PengGeng
   * @date: 8/24/20-11:57 上午
   * @params val 漫画ID type [string]
   *         ref 来源ID对应页面 type [number] 来源 1.排行榜 2.楼层 3.搜索 4.推荐 5.书架 6.发现
   *         refId 从页面的某一个楼层或者某一个排行榜进入的来源  来源ID-只有排行榜ID/楼层ID/书架ID
   */
    handleZMInfo(val, ref = undefined, refId = undefined) {
		  this.$router.push({
	        path: '/detail',
		      query: {
				    cartoon_id: val,
			      ref,
			      refId
		      }
		  })
    },
    //跳转下载引导页
    jumpDownloadPage() {
      this.$router.push({
        path: '/download'
      })
    }
  }
}
