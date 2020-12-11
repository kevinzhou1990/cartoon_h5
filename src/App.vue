<template>
  <!--  还在加载客户端代码状态下设置超出隐藏，防止在loading图下出现滚动条-->
  <div id="app" :class="!isShow ? 'h-overflow': ''">
    <div v-if="!isShow" class="app-loading"></div>

    <!--  服务端代码视图设置为透明，等待客户端代码加载完成，即关掉loading显示客户端视图，优化视觉效果-->
    <!--  服务端代码不走keep-alive，否则ssr没效果-->
    <router-view v-if="(!$route.meta.keepAlive) || !isClient" :class="!isClient ? 'opacity' : ''"></router-view>
    <keep-alive v-else>
      <router-view :class="!isClient ? 'opacity' : ''" />
    </keep-alive>
  </div>
</template>

<script>
import env from '../src/lib/utils/env';
export default {
  name: 'App',
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    isClient() {
      return env.isClient();
    }
  },
  mounted() {
    this.isShow = true;
    console.log(this.$route.meta.keepAlive, this.$route.name, this.isClient);
    console.log('漫画H5--202012031750');
  }
};
</script>

<style lang="scss">
$BORDER_COLOR: #eee;
@import './assets/style/1px.scss';

.opacity {
  opacity: 0;
}

.h-overflow {
  overflow: hidden;
}

.app-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('./assets/img/default_record_aa.png') center no-repeat;
  background-size: 100%;
  z-index: 999;
  touch-action: none;
}

#app {
  font-family: 'pingfang-blod';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background: #ffffff;
}
.box {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 44px;
  overflow: auto;
  & > .header-main {
    position: fixed !important;
    top: 0;
    left: 0;
  }
}
</style>
