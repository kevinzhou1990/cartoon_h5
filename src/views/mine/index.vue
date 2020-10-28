<template>
  <div class="mine">
    <button class="logout" @click="logout" :disabled="!isLogin">退出登录</button>
  </div>
</template>

<script>
import { logout } from '@/common/api/mine'
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      isLogin: (state) => state.status.isLogin
    })
  },
  methods: {
    async logout(){
      const data = await logout();
      if (data.code === 0) {
        this.$toast('退出成功!');
        this.$store.commit('LOGIN_STATUS', false)
      } else {
        this.$toast(data.msg || '退出失败!');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .mine{
    text-align: center;
    padding: 60px 16px;
    .logout{
      color: #ffffff;
      font-size: 14px;
      padding: 12px 38px;
      border-radius: 22px;
      border: none;
      background: #12e079;
      font-family: 'pingfang-blod';
      &:focus {
        outline: none
      }
      &:disabled{
        opacity: 50%;
      }
    }
  }
</style>
