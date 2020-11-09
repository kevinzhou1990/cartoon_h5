<template>
  <div class="dialog-wrap" v-if="show">
    <div class="dialog-content">
      <SvgIcon iconClass="ca" size="large" class="dialog-icon" />
      <div class="dialog-msg">{{ message }}</div>
      <div class="dialog-button zm-b-t" v-if="type === 'alert'" @click="confirm">确认</div>
      <div class="dialog-button zm-b-t" v-else>
        <div @click="cancel" class="zm-b-r" :style="{ color: options.cancel.text_color || '' }">{{ options.cancel.text || '取消' }}</div>
        <div @click="confirm">{{ options.confirm.text || '确认' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Dialog',
  components: { SvgIcon },
  data() {
    return { show: false, message: 'xxx', type: 'alert' };
  },
  methods: {
    cancel() {
      if (this.type === 'confirm') {
        this.options.cancel.callback();
        this.show = false;
      }
    },
    confirm() {
      this.options.confirm.callback();
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'pingfang-blod';
  z-index: 999;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  .dialog-content {
    box-sizing: border-box;
    width: 311px;
    background: #fff;
    position: relative;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    .dialog-icon {
      position: absolute;
      left: calc(50% - 44px);
      top: -55px;
    }
    .dialog-msg {
      padding: 32px;
    }
    .dialog-button {
      display: flex;
      height: 55px;
      line-height: 55px;
      justify-content: center;
      & > div {
        flex: 1;
      }
    }
  }
}
</style>
