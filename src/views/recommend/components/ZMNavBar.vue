<template>
  <div class="main-bar zm-b-t-b bar-zindex">
    <div class="main-bar-content">
      <div class="main-bar-content-item"
           v-for="index in 10"
           :key="index"
           @click.stop="isSelected = index"
      >
        <span
            :class="isSelected ===index ? 'is-selected' : ''"
        >
          7月热番{{ index }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ZMTabBar',
  data() {
    return {
      isSelected: 1
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
      width: 24px;
      margin: 0 8px;
    }
  }

  .bar-zindex {
    /*position: relative;*/
    left: 0;
    top: 44px;
    z-index: 9999;
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
      width: auto;
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 0 !important
      }

      &-item {
        width: 50px;
        padding: 0 16px;
        white-space: nowrap;
      }
    }
  }
</style>
