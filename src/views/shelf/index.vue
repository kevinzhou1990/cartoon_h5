<template>
  <div>
    <div class="header-container zm-b-b">
      <ul class="tab-container">
        <li v-for="item in tab" :key="item.id">
          <span class="tab-btn" :class="[item.name === active ? 'on' : '']" @click="switchTab(item.name)">{{item.name}}</span>
        </li>
      </ul>
    </div>

    <div class="main-container">
      <div>
        <z-m-history v-if="active === '历史'"></z-m-history>
        <z-m-favorites v-else></z-m-favorites>
      </div>
    </div>
  </div>
</template>

<script>
import ZMFavorites from '@/views/shelf/favorites';
import ZMHistory from '@/views/shelf/history';

export default {
  name: 'Shelf',
  components: { ZMFavorites, ZMHistory },
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
          name: '历史'
        }
      ]
    };
  },
  methods: {
    switchTab(name){
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
    position: fixed;
    width: 100%;
    height: $HEADERHEIGHT;
    background: white;
    z-index: 2;
    .tab-container {
      li{
        font-family: PingFangSC-Semibold;
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
    }
  }
  .main-container{
    padding-top: $HEADERHEIGHT;
  }
</style>
