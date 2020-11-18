<template>
  <div class="mine">
    <div class="mine-info" @click="redicrectTo('/personal')">
      <div class="mine-header flex">
        <img :src="userInfo.avatar || defaultHead" alt="" class="mine-avatar" />
        <div class="flex flex-1 mine-name">
          <div class="flex-1">{{ userInfo.nickname || '进入你的漫画世界' }}</div>
          <svg-icon icon-class="more_ba" size="small" />
        </div>
      </div>
      <img src="../../assets/img/cat_abc.png" alt="" />
    </div>
    <ul class="mine-list mine-game-config">
      <li class="flex">
        <svg-icon icon-class="game_aa" />
        <div class="flex-1 flex item-name">
          <div class="flex-1">游戏</div>
          <svg-icon icon-class="more_bb" size="small" />
        </div>
      </li>
    </ul>
    <ul class="mine-list">
      <li class="flex" v-for="(item, i) in itemList" :key="i" @click="redicrectTo(item.path)">
        <svg-icon :icon-class="item.icon" />
        <div class="flex-1 flex item-name zm-b-b">
          <div class="flex-1">
            {{ item.name }}
          </div>
          <svg-icon icon-class="more_bb" size="small" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { logout } from '@/common/api/mine';
import { mapState } from 'vuex';
import SvgIcon from '@/common/components/svg';
import defaultHead from '@/assets/img/headAa.png';
export default {
  components: { SvgIcon },
  data() {
    return {
      itemList: [
        {
          icon: 'help_aa',
          name: '帮助中心',
          path: '/help'
        },
        {
          icon: 'feedback_aa',
          name: '问题反馈',
          path: '/feedback'
        },
        {
          icon: 'set_aa',
          name: '设置',
          path: '/setting'
        },
        {
          icon: 'about_aa',
          name: '关于我们',
          path: '/about'
        }
      ],
      defaultHead,
      needLoginRoute: ['/feedback', '/personal', '/setting']
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  methods: {
    redicrectTo(address) {
      const p = this.needLoginRoute;
      if (p.indexOf(address) !== -1) {
        if (JSON.stringify(this.$store.state.login.userInfo) === '{}') {
          this.$router.push({ path: '/ZMLogin' });
        } else {
          this.$router.push({ path: address });
        }
      } else {
        this.$router.push({ path: address });
      }
      // this.$router.push({ path: address });
    },
    async logout() {
      const data = await logout();
      if (data.code === 0) {
        this.$toast('退出成功!');
        this.$store.commit('LOGIN_STATUS', false);
      } else {
        this.$toast(data.msg || '退出失败!');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mine {
  font-family: 'pingfang-blod';
  .flex {
    display: flex;
    .flex-1 {
      flex: 1;
    }
  }
  .mine-info {
    position: relative;
    & > img {
      height: 52px;
      position: absolute;
      right: 0;
      top: 104px;
    }
  }
  .mine-header {
    background: url('../../assets/img/head_bg.png') 0 0 transparent;
    background-size: 100%;
    box-sizing: border-box;
    padding: 60px 16px 32px 16px;
    font-size: 18px;
    .mine-avatar {
      height: 64px;
      width: 64px;
      border-radius: 32px;
    }
    .mine-name {
      height: 64px;
      line-height: 64px;
      padding-left: 16px;
      align-items: center;
    }
  }
  .mine-game-config {
    border-bottom: 8px solid #f5f5f5;
  }
  .mine-list {
    li {
      height: 56px;
      line-height: 56px;
      padding-left: 16px;
      font-size: 12px;
      align-items: center;
      .item-name {
        margin-left: 16px;
        padding-right: 16px;
        align-items: center;
      }
    }
  }
}
</style>
