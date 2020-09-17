<template>
  <div>
    <div class="button-container">
      <ul>
        <li v-for="item in tab" :key="item.value" @click="switchTab(item.value)" :class="[active === item.value ? 'on' : '']">{{item.name}}</li>
      </ul>
    </div>
    <div class="main-container">
      <collect-table></collect-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import collectTable from './components/collectTable'
export default {
  data() {
    return {
      tab: [
        {
          name: '默认收藏',
          value: 'default'
        },
        {
          name: '自定义收藏',
          value: 'custom'
        }
      ]
    };
  },
  components: { collectTable },
  mounted() {
    console.log(this.$store.state.collect.active)
  },
  computed: {
    ...mapState({ active: (state) => state.collect.active })
  },
  methods: {
    ...mapMutations(['updateActive']),
    switchTab(value){
      if (this.active === value) {
        return false;
      }
      this.updateActive(value)
    }
  }
};
</script>

<style lang="scss" scoped>
  $BUTTONHEIGHT: 36px;
  $BUTTONPADDING: 16px;
  .button-container{
    text-align: center;
    padding: 16px;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    background: #FFFFFF;
    width: 100%;
    height: $BUTTONHEIGHT;
    z-index: 2;
    ul{
      font-family: PingFangSC-Semibold;
      position: fixed;
      left: 50%;
      transform: translate(-50%);
      width: 200px;
      background: #f5f5f5;
      border-radius: 4px;
      li {
        color: #bbbbbb;
        display: inline-block;
        width: 100px;
        height: $BUTTONHEIGHT;
        background: #f5f5f5;
        line-height: $BUTTONHEIGHT;
        border-radius: 4px;
        transition:  all .2s ease-in-out;
      }
      li.on{
        color: #222222;
        background: #FFFFFF;
        position: relative;
        &:before {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 200%;
          border: 1px solid #eeeeee;
          height: 194%;
          -webkit-transform-origin: left top;
          transform-origin: left top;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          border-radius: 8px;
        }
      }
    }
  }
  .main-container{
    padding-top: calc(#{$BUTTONHEIGHT} + #{$BUTTONPADDING * 2});
  }
</style>
