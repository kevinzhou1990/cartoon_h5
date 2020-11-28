export default {
  data() {},
  methods: {
    jumpLogin(){
      setTimeout(() => {
        this.Toast('用户信息验证失败!', {
          type: 'fail',
          duration: 3000
        });
      }, 250);

      //未登录，跳转到登录页
      this.$router.replace({
        path: '/'
      });
    },
  }
}
