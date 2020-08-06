<template>
  <svg :class="`${svgClass} ${size}`" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
function oneOf(value, list) {
  return list.indexOf(value) !== -1;
}
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    size: {
      validator(value) {
        return oneOf(value, ['default', 'small', 'middle', 'large']);
      },
      default: 'default'
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.iconClass) {
        return `icon ${this.iconClass}`;
      } else {
        return `icon`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
  &.large {
    height: 88px;
    width: 88px;
  }
  &.small {
    height: 16px;
    width: 16px;
  }
  &.middle {
    height: 48px;
    width: 48px;
  }
}
</style>
