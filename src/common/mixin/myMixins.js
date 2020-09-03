export default {
  data() {},
  methods: {
  /**
   * @info: 跳转到详情
   * @author: PengGeng
   * @date: 8/24/20-11:57 上午
   */
    handleZMInfo(val) {
		  this.$router.push({
	        path: '/detail',
		      query: {
				    cartoon_id: val
		      }
		  })
    }
  }
}
