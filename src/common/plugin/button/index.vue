<template>
  <button
    :disabled="disabled"
    @click="handlerClick"
    :class="`${type} ${cycle ? 'cycle':''} size-${size}`"
  >
    <!-- 插槽 --->
    <slot name="icon" />
    <slot />
  </button>
</template>

<script>
function oneOf(value, list) {
  return list.indexOf(value) !== -1;
}
export default {
  name: 'Button',
  // 参数
  props: {
    type: {
      validator(value) {
        return oneOf(value, ['default', 'pramary']);
      },
      default: 'default'
    },
    size: {
      validator(value) {
        return oneOf(value, ['large', 'default']);
      },
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    cycle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlerClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  padding: 0;
  margin: 0;
}
.pramary {
  color: #fff;
  background: #12e079;
  &:active {
    background: #0ead5e;
  }
  &:disabled {
    background: #a2f5cb;
    color: rgba(255, 255, 255, 0.6);
  }
}
.default {
  color: #12e079;
  background: #fff;
  border: 1px solid #12e079;
  &:active {
    background: #a2f5cb;
  }
  &:disabled {
    color: #a2f5cb;
    border: 1px solid #a2f5cb;
  }
}
.size-large {
  width: 343px;
  height: 52px;
  line-height: 52px;
}
.size-default {
  width: 135px;
  height: 36px;
  line-height: 36px;
}
</style>
