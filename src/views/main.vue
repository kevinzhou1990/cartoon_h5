<template>
  <div class="home-main">
    <transition :name="transitionName">
      <router-view />
    </transition>
    <div class="tabber zm-b-t flex">
      <div
        :class="actived === 'home' ? 'active' : ''"
        @dblclick="handleDoubleScrollTOP"
        @click="switchTab('home')"
      >
        <svgIcon :iconClass="`home_${actived === 'home' ? 'aa' : 'ab'}`" />
        <span>首页</span>
      </div>
      <div
        :class="[actived === 'shelf' ? 'active' : '', isUpdate ? 'red-point' : '']"
        @click="switchTab('shelf')"
        @dblclick="handleDoubleScrollTOP"
      >
        <svgIcon :iconClass="`bookshelf_${actived === 'shelf' ? 'aa' : 'ab'}`" />
        <span>书架</span>
      </div>
      <div
        :class="actived === 'mine' ? 'active' : ''"
        @click="switchTab('mine')"
        @dblclick="handleDoubleScrollTOP"
      >
        <svgIcon :iconClass="`my_${actived === 'mine' ? 'aa' : 'ab'}`" />
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcon from '../common/components/svg';
import { mapState } from 'vuex';
export default {
  name: 'v-main',
  components: { svgIcon },
  data() {
    return {
      transitionName: ''
    };
  },
  computed: {
    ...mapState({
      actived: state => state.main.actived,
      isUpdate: state => state.status.hasUpdate
    })
  },
  methods: {
    switchTab(name) {
      if (this.actived === name) {
        return false;
      }
      this.$store.commit('main/UPDATE_ACTIVED', name);
      this.$router.push(`/${name}`);
    },
    handleDoubleScrollTOP() {
      if (document.documentElement.scrollTop !== 0 || document.body.scrollTop !== 0) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        document.getElementsByClassName('home-main')[0].scrollTop = 0;
      }
    }
  },
  mounted() {
    this.$store.commit('main/UPDATE_ACTIVED', this.$route.name);
  }
};
</script>

<style lang="scss" scoped>
.home-main {
  padding-bottom: 49px;
  .tabber {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-clip: padding-box;
    background-color: #fff;
    height: 49px;
    z-index: 9999;
    .red-point {
      position: relative;
      &:after {
        content: ' ';
        background: #ff3456;
        width: 8px;
        height: 8px;
        position: absolute;
        border-radius: 8px;
        top: 2px;
        left: calc(50% + 8px);
      }
    }
    a {
      color: #222;
      text-decoration: none;
    }
  }
  .flex {
    display: flex;
    text-align: center;
    & > div {
      flex: 1;
      font-size: 10px;
      padding-top: 6px;
    }
    & > div.active {
      font-family: 'pingfang-blod';
    }
    span {
      display: block;
    }
  }
}
</style>
