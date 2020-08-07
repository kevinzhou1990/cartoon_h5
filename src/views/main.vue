<template>
  <div class="main">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="main-wrap" />
      </keep-alive>
    </transition>
    <div class="tabber zm-b-t flex">
      <div :class="actived === 'home' ? 'active' : ''" @click="switchTab('home')">
        <svgIcon :iconClass="`home_${actived === 'home' ? 'aa' : 'ab'}`" />
        <span>首页</span>
      </div>
      <div :class="actived === 'shelf' ? 'active' : ''" @click="switchTab('shelf')">
        <svgIcon :iconClass="`bookshelf_${actived === 'shelf' ? 'aa' : 'ab'}`" />
        <span>书架</span>
      </div>
      <div :class="actived === 'mine' ? 'active' : ''" @click="switchTab('mine')">
        <svgIcon :iconClass="`my_${actived === 'mine' ? 'aa' : 'ab'}`" />
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcon from '../common/components/svg';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'v-main',
  components: { svgIcon },
  data() {
    return {
      transitionName: ''
    };
  },
  computed: {
    ...mapState({ actived: (state) => state.main.actived })
  },
  methods: {
    ...mapMutations(['updateActived']),
    switchTab(name) {
      if (this.actived === name) {
        return false;
      }
      this.updateActived(name);
      this.$router.push(`/${name}`);
    }
  },
  mounted() {
    this.updateActived(this.$route.name);
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding-bottom: 49px;
  .tabber {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-clip: padding-box;
    background-color: #fff;
    height: 49px;
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
