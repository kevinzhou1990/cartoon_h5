export default {
  data() {},
  methods: {
    //传登录态到父组件
    emitData(code){
      this.$emit('updateStatus', !(code === 1204 || code === 1209))
    },
    //未登录不弹出提醒
    noLoginToast(data){
      if (data.code !== 1209){
        this.$toast(data.msg || '系统出错,请稍后重试');
      }
    }
  }
}
