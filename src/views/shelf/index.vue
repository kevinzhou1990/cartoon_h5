<template>
  <div>
    <div class="header-container zm-b-b">
      <ul class="tab-container">
        <li v-for="item in tab" :key="item.id">
          <span class="tab-btn red-point" :class="[item.name === active ? 'on' : '']" @click="switchTab(item.name)">{{item.name}}</span>
        </li>

        <li class="edit">编辑</li>
      </ul>
    </div>

    <div class="main-container">
      <div>
        <z-m-history v-if="active === '历史'"></z-m-history>
        <z-m-cache v-else-if="active === '缓存'"></z-m-cache>
        <z-m-favorites v-else></z-m-favorites>
      </div>
    </div>
  </div>
</template>

<script>
import ZMFavorites from '@/views/shelf/favorites';
import ZMHistory from '@/views/shelf/history';
import ZMCache from '@/views/shelf/cache';

export default {
  name: 'Shelf',
  components: { ZMFavorites, ZMHistory, ZMCache },
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
      ]
    };
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
  methods: {
    switchTab(name){
      if (this.active === name) {
        return
      }
      this.active = name;
      let query = JSON.parse(JSON.stringify(this.$route.query));
      query.tab = this.active;
      this.$router.replace({ path: this.$route.path, query: query });
    }
  }
};
</script>

<style lang="scss" scoped>
  $HEADERHEIGHT: 44px;
  .header-container{
    font-family: PingFangSC-Semibold;
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
  }
</style>
