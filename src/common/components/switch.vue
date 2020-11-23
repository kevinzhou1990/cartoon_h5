<template>
  <div
    :class="`switch-wrap ${activated ? 'switch-wrap-activated' : 'switch-wrap-inactivated'}`"
    @click="switchStatus"
  >
    <span class="switch-wrap-item">
      <SvgIcon iconClass="happy_ba" size="small" v-show="activated" />
    </span>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'SwitchBtn',
  props: {
    activated: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  components: { SvgIcon },
  methods: {
    switchStatus() {
      this.$emit('changeStatus');
    }
  }
};
</script>

<style lang="scss" scoped>
.switch-wrap {
  display: flex;
  height: 24px;
  width: 44px;
  border-radius: 16px;
  position: relative;
  align-items: center;
  &.switch-wrap-inactivated {
    background: #e6e6e6;
    .switch-wrap-item {
      left: 0;
    }
  }
  &.switch-wrap-activated {
    background: #12e079;
    .switch-wrap-item {
      right: 0px;
    }
  }

  .switch-wrap-item {
    position: absolute;
    display: inline-block;
    height: 16px;
    width: 16px;
    background: #fff;
    border-radius: 8px;
    margin-right: 5px;
    margin-left: 5px;
  }
}
</style>
