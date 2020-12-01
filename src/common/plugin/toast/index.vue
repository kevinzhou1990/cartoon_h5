<template>
  <div class="toast-wrap" :class="`toast-wrap-${toastStyle}`">
    <div class="toast-content" :class="`toast-content-${toastStyle}`" @click="callback">
      <SvgIcon :iconClass="typeMap[type]" class="toast-icon" v-if="toastStyle === 'fixed'" />
      {{ message }}
      <svg-icon iconClass="more_bb" size="small" v-if="toastStyle === 'free'" class="toast-more" />
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
        tag: 'mark_aa',
        warning: 'warn_aa'
      }
    };
  },
  props: {
    message: { type: String, default: '' },
    type: { type: String, default: 'fail' },
    duration: { type: Number, default: 300 },
    toastStyle: { type: String, default: 'fixed' },
    callback: { type: Function, default: () => {} }
  },
  mounted() {
    setTimeout(() => {
      this.$el.remove();
    }, this.duration);
  }
};
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  to {
    opacity: 0;
  }
}

.toast-show {
  animation: fadeIn 0.3s;
}

.toast-hidden {
  animation: fadeOut 0.3s;
}

.toast-wrap {
  animation: fadeIn 0.3s;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  &-free {
    align-items: flex-end;
  }
  .toast-content {
    background: rgba(34, 34, 34, 0.8);
    border-radius: 4px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    .toast-icon {
      display: block;
      margin: 0 auto;
      margin-bottom: 8px;
    }
    .toast-more {
      margin-top: -2px;
    }
    &-fixed {
      box-sizing: border-box;
      max-width: 176px;
      padding: 16px;
    }
    &-free {
      padding: 11px 24px;
      margin-bottom: 80px;
      color: #bbb;
    }
  }
}
</style>
