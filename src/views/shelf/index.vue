<template>
  <div>
    <Button type="pramary" @click="dialog">弹窗</Button>
  </div>
</template>

<script>
export default {
  methods: {
    dialog() {
      this.$dialog('取消收藏后，将不再展示在我的书架中', 'confirm', {
        confirm: () => {
          console.log('xxx');
        },
        cancel: () => {
          console.log('cancel');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
