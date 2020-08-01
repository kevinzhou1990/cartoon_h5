<template>
  <div class="index">
    首页
    <!-- <mh-Contents /> -->
    <Button type="default" size="default" :disabled="true" @click="test">饿哦</Button>
  </div>
</template>

<script>
// import Contents from '@/common/components/contents';
export default {
  name: 'home',
  components: {
    // 'mh-Contents': Contents
  },
  mounted() {},
  methods: {
    test() {
      alert('test');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
