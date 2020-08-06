<template>
  <div class="dialog-wrap" v-show="show">
    <div class="dialog-mask" />
    {{message}}
    <SvgIcon iconClass="ca" />
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Dialog',
  components: { SvgIcon },
  data() {
    return { show: false, message: 'xxx', type: 'xxx' };
  },
  mounted() {
    console.log('eeee');
  }
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
  height: 100%;
  width: 100%;
  .dialog-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
