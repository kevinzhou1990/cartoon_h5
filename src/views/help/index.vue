<template>
  <div class="helper">
    <z-m-header title-text="帮助中心" has-border />
    <z-m-nav-bar :tabListData="tabListData"></z-m-nav-bar>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import ZMNavBar from '@/common/components/ZMNavBar';
export default {
  data() {
    return {
      tabListData: {
        1: '全部',
        2: '充值问题',
        3: '漫画阅读',
        4: '操作解答'
      }
    };
  },
  components: { ZMHeader, ZMNavBar }
};
</script>

<style scoped></style>
