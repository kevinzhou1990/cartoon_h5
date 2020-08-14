<template>
  <div class="navigation-wrap navigation-wrap-right">
    <div class="navigation-content">
      <div class="navigation-contents">
        <SvgIcon iconClass="catalog_ba" size="small" />
      </div>
      <div class="navigation-process">
        <div></div>
      </div>
      <div class="navigation-next">
        <span>下一话</span>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Navigation',
  components: { SvgIcon }
};
</script>

<style lang="scss" scoped>
.navigation-wrap {
  text-size-adjust: none;
  position: fixed;
  top: calc(50% - 160px);
  width: 40px;
  &-left {
    left: 16px;
  }
  &-right {
    right: 16px;
  }
  .navigation-process {
    height: 160px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 16px 0 16px 0;
    & > div {
      height: 20%;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px 8px 0 0;
    }
  }
  .navigation-contents,
  .navigation-next {
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
    span {
      transform: scale(0.875);
      display: inline-block;
      height: 40px;
      width: 40px;
    }
  }
}
</style>
