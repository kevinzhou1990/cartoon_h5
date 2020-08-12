<template>
  <div class="page-reader">
    <ZMHeader titleText="#001.魔神降临" :showRight="true" :hasBorder="true">
      <SvgIcon slot="left" iconClass="close_ab" class="icon-left" />
      <div slot="right" class="header-right">漫画详情</div>
    </ZMHeader>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Reader',
  components: { ZMHeader, SvgIcon }
};
</script>

<style lang="scss" scoped>
.page-reader {
  padding-top: 44px;
  background: #000;
  min-height: 100%;
  .header-right {
    font-size: 12px;
    width: 48px;
    background: none;
  }
  .icon-left {
    margin: 10px 0 10px 16px;
  }
}
</style>
