/**
* @info: 推出登陆
* @author: PengGeng
* @date: 11/9/20-11:46 上午
*/
<template>
  <div class="main box">
    <z-m-header class="zm-b-b" :title-text="titleContent"></z-m-header>
    <div class="bottom-btn" @click.stop="loginOut">退出账号</div>
  </div>
</template>

<script>
import { logout } from '@/common/api/mine';
import ZMHeader from '@/common/components/ZMHeader'
import Dialog from '@/common/plugin/dialog'
export default {
  name: 'index',
  data() {
    return {
      titleContent: '设置'
    }
  },
  methods: {
    /**
     * @info: 退出登陆
     * @author: PengGeng
     * @date: 11/9/20-12:05 下午
     */
    async loginOut(){
      Dialog('退出当前账号？', 'confirm', {
	      cancel: {
          text: '算了',
		      text_color: '#999999',
          callback: () => {
            return false
          }
        },
        confirm: {
          text: '退出',
          callback: async () => {
	          const data = await logout();
	          if (data.code === 0) {
		          this.$toast('退出成功!')
              this.$router.push('/home')
	          } else if (data.code === 1209) {
              this.$toast('该用户为登陆，请重新登陆')
            } else {
		          this.$toast(data.msg || '系统繁忙，请稍后重试!')
	          }
          }
        }
      })
    }
  },
  components: {ZMHeader}
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  margin: auto 0;
  background: #FFFFFF;
  font-family: pingfang-blod;
  font-size: 14px;
  .bottom-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 343px;
    height: 52px;
    margin: 16px;
    text-align: center;
    line-height: 52px;
    color: #12e079;
    border: 1px solid #12e079;
    border-radius: 4px;
  }
}
</style>
