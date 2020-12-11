/** * @info: ZM-Home-Label * @author: PengGeng * @date: 8/5/20-11:38 上午 */
<template>
  <div class="main-label" @click.stop="hotMore">
    <span class="main-label-l">{{ labelName }}</span>
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
    },
    recId: {
      type: Number,
      default: 1
    }
  },
  methods: {
    /**
     * @info: 热翻点击了更多
     * @author: PengGeng
     * @date: 8/4/20-6:14 下午
     */
    hotMore() {
      // this.$emit('hot-more')
      this.$store.commit('recommend/UPDATE_SEC_ID', this.recId);
      this.$router.push({
        path: '/recommend',
        query: {
          SEC_ID: this.recId
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
$label-color: #bbbbbb;
$label-fontSize: 18px;
$label-right-fonSize: 10px;
.main-label {
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: $label-fontSize;
  &-l {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 260px;
  }
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
      background: url('../../../assets/img/more.png') no-repeat;
      background-size: 100%;
    }
  }
}
</style>
