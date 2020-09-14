<template>
  <div class="discovery-page">
    <z-m-header :title-text="titleText" show-right has-border>
      <div slot="right" class="title-right">
        <svg-icon size="default" icon-class="search_aa" />
      </div>
    </z-m-header>
    <discovery-filter></discovery-filter>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import DiscoveryFilter from './components/filter';
export default {
  name: 'Discovery',
  components: {
    ZMHeader,
    SvgIcon,
    DiscoveryFilter
  },

  data() {
    return { titleText: '发现' };
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.discovery-page {
  padding-top: 44px;
}
</style>
