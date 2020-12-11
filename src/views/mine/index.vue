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
    <ul class="mine-list mine-game-config" v-if="remoteAddress.length">
      <li class="flex" v-for="(game, index) in remoteAddress" :key="index" @click="gameMsg(game)">
        <img :src="game.icon" alt="" v-if="game.icon" />
        <svg-icon icon-class="game_aa" v-else />
        <div class="flex-1 flex item-name">
          <div class="flex-1">{{ game.name }}</div>
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
      needLoginRoute: ['/feedback', '/personal', '/setting'],
      gameRemoteList: [],
      userInfo: {}
    };
  },
  mounted() {
    this.userInfo = this.$store.state.login.userInfo;
  },
  computed: {
    ...mapState({
      // userInfo: state => state.login.userInfo,
      remoteAddress: state => state.user.remoteAddress
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
    },
    gameMsg(game) {
      window.location = game.jump_address;
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
      position: fixed;
      height: 48px;
      right: 0;
      top: 104px;
    }
  }
  .mine-header {
    position: fixed;
    top: 0;
    background: url('../../assets/img/head_bg.png') 0 0 transparent;
    background-size: 100%;
    box-sizing: border-box;
    padding: 60px 16px 32px 16px;
    font-size: 18px;
    width: 100%;
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
      //保留空格
      white-space: pre-wrap;
    }
  }
  .mine-game-config {
    border-bottom: 8px solid #f5f5f5;
    padding-top: 154px;
    img {
      width: 24px;
    }
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
