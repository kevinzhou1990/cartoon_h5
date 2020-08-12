/**
* @info: ZM-Home-Label
* @author: PengGeng
* @date: 8/5/20-11:38 上午
*/
<template>
  <div class="main-label" @click.stop="hotMore">
    <span>{{ labelName }}</span>
    <span class="main-label-r">更多</span>
  </div>
</template>

<script>
export default {
  name: 'ZMHomeLabel',
  props: {
    labelName: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * @info: 热翻点击了更多
     * @author: PengGeng
     * @date: 8/4/20-6:14 下午
     */
    hotMore() {
      this.$emit('hot-more')
    }
  }
}
</script>

<style scoped lang="scss">
  $label-color: #BBBBBB;
  $label-fontSize: 18px;
  $label-right-fonSize: 10px;
  .main-label {
    display: flex;
    padding: 0 8px;
    justify-content: space-between;
    font-weight: bold;
    font-size: $label-fontSize;
    &-r {
      color: $label-color;
      font-size: $label-right-fonSize;
      text-align: right;
      padding-right: 16px;

      &:after {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        background: url("../../../assets/img/more.png") no-repeat;
        background-size: 100%;
      }
    }
  }
</style>
