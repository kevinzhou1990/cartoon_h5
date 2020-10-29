<template>
  <div>
    <div class="header-container zm-b-b">
      <ul class="tab-container" v-if="isLogin">
        <li v-for="item in tab" :key="item.id">
          <span class="tab-btn" :class="[item.name === active ? 'on' : '', item.name === '收藏' && isUpdate ? 'red-point' : '']" @click="switchTab(item.name)">{{item.name}}</span>
        </li>

        <li class="edit" @click="jumpDownloadPage">编辑</li>
      </ul>
    </div>

    <div class="main-container">
      <div v-if="isLogin">
        <z-m-history v-if="active === '历史'" class="animation-active-in" @updateStatus="update"></z-m-history>
        <z-m-cache v-else-if="active === '缓存'" class="animation-active-in"></z-m-cache>
        <z-m-favorites v-else @updateStatus="update"></z-m-favorites>
      </div>

      <div class="no-login-shelf" v-else-if="!isLoading && !isLogin">
        <div class="img"></div>
        <button class="button" @click="jumpLogin">进入你的书架</button>
      </div>

    </div>
  </div>
</template>

<script>
import ZMFavorites from '@/views/shelf/favorites';
import ZMHistory from '@/views/shelf/history';
import ZMCache from '@/views/shelf/cache';
import { mapState } from 'vuex';
import myMixins from '@/common/mixin/myMixins'

export default {
  name: 'Shelf',
  components: { ZMFavorites, ZMHistory, ZMCache },
  mixins: [ myMixins ],
  data() {
    return {
      active: this.$route.query.tab || '收藏',
      tab: [
        {
          id: 0,
          name: '收藏'
        },
        {
          id: 1,
          name: '缓存'
        },
        {
          id: 2,
          name: '历史'
        }
      ],
      isLogin: true
    };
  },
  computed: {
    ...mapState({
      // isLogin: (state) => state.status.isLogin,
      isLoading: (state) => state.status.isLoading,
      isUpdate: (state) => state.status.hasUpdate
    })
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
  methods: {
    switchTab(name){
      if (name === '缓存'){
        this.jumpDownloadPage()
        return
      }
      if (this.active === name) {
        return
      }
      this.active = name;
      let query = JSON.parse(JSON.stringify(this.$route.query));
      query.tab = this.active;
      this.$router.replace({ path: this.$route.path, query: query });
      document.documentElement.scrollTop = 0;
    },
    //跳转到登录页
    jumpLogin() {
      this.$router.push({
        path: '/ZMLogin'
      })
    },
    //更新登录态
    update(boolean){
      this.isLogin = boolean;
      this.$store.commit('LOGIN_STATUS', boolean)
    }
  }
};
</script>

<style lang="scss" scoped>
  $HEADERHEIGHT: 44px;
  .header-container{
    font-family: 'pingfang-blod';
    position: fixed;
    width: 100%;
    height: $HEADERHEIGHT;
    background: white;
    z-index: 10;
    .tab-container {
      background: white;
      height: 100%;
      //红点
      .red-point{
        position: relative;
        &:after {
          content: ' ';
          background: #ff3456;
          width: 8px;
          height: 8px;
          position: absolute;
          border-radius: 8px;
          top: 0;
          right: -3px;
        }
      }
      li{
        display: inline-block;
        overflow: hidden;
        text-align: center;
        color: #bbbbbb;
        font-size: 18px;
        padding: 0 16px;
        line-height: $HEADERHEIGHT;
        transition:  all .2s ease-in-out;
        .tab-btn.on{
          color: #222222;
        }
      }
      .edit{
        color: #222222;
        position: absolute;
        right: 0;
        top: 2px;
        font-size: 12px;
      }
    }
  }
  .main-container{
    padding-top: $HEADERHEIGHT;

    .no-login-shelf{
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -45%);
      text-align: center;

      .img {
        background: url('../../assets/img/default_books.png') no-repeat;
        background-size: 100%;
        width: 160px;
        height: 160px;
        margin-bottom: 8px;
      }

      .button{
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
        &:active {
          background: #0ead5e;
        }
      }
    }
  }
</style>
