<template>
  <div class="main-bar zm-b-t-b bar-zindex">
    <div class="main-bar-content">
      <div class="main-bar-content-item"
           v-for="(value, name) in tabListData"
           :key="name"
           @click.stop="handleRecommendTabItem(name)"
      >
        <span
            :class="isSelected == name ? 'is-selected' : ''"
        >
          {{ value }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ZMTabBar',
  props: {
    tabListData: {
      type: Object,
      default: () => {}
    },
    acticeIndex: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      isSelected: this.acticeIndex
    }
  },
  created() {

  },
  methods: {
    handleRecommendTabItem(val) {
      this.isSelected = Number(val)
      this.$emit('getRecommendData', this.isSelected)
    }
  }
}
</script>

<style scoped lang="scss">
  $BORDER_COLOR: red;
  $item-selected-color: #222222;
  $item-color: #BBBBBB;
  .is-selected {
    position: relative;
    color: $item-selected-color;
    &:after {
      content: ' ';
      display: block;
      border-bottom: 2px solid $item-selected-color;
      /*width: 24px;*/
      margin: 0 8px;
    }
  }

  .bar-zindex {
    /*position: relative;*/
    left: 0;
    top: 44px;
    z-index: 9;
    background: #ffffff;
  }

  .main-bar {
    position: fixed;
    font-size: 12px;
    font-weight: bold;
    height: 56px;
    line-height: 56px;
    color: $item-color;
    width: 100%;
    &-content {
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      width: 100%;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        width: 0 !important
      }

      &-item {
        padding: 0 16px;
        white-space: nowrap;
      }
    }
  }
</style>
