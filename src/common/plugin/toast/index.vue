<template>
  <div class="toast-wrap">
    <div class="toast-content">
      <SvgIcon :iconClass="typeMap[type]" class="toast-icon" />
      {{message}}
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Toast',
  components: { SvgIcon },
  data() {
    return {
      typeMap: {
        success: 'success_aa',
        fail: 'fail_aa',
        tag: 'mark_aa'
      }
    };
  },
  props: {
    message: { type: String, default: '' },
    type: { type: String, default: 'success' },
    duration: { type: Number, default: 300 }
  },
  mounted() {
    setTimeout(() => {
      this.$el.remove();
    }, this.duration);
  }
};
</script>

<style lang="scss" scoped>
.toast-wrap {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  .toast-content {
    width: 176px;
    box-sizing: border-box;
    background: rgba(34, 34, 34, 0.8);
    border-radius: 4px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    padding: 16px;
    .toast-icon {
      display: block;
      margin: 0 auto;
      margin-bottom: 8px;
    }
  }
}
</style>
