<template>
  <div class="discovery-page">
    <z-m-header :title-text="titleText" show-right has-border>
      <div slot="right" class="title-right">
        <svg-icon size="default" icon-class="search_aa" />
      </div>
    </z-m-header>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Discovery',
  components: {
    ZMHeader,
    SvgIcon
  },
  data() {
    return { titleText: '发现' };
  }
};
</script>

<style lang="scss" scoped>
</style>
