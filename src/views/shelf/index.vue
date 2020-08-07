<template>
  <div>
    <Button type="pramary" @click="dialog">弹窗</Button>
    <Button type="pramary" @click="toast">toast</Button>
  </div>
</template>

<script>
export default {
  methods: {
    dialog() {
      this.$dialog('取消收藏后，将不再展示在我的书架中', 'alert', {
        confirm: {
          text: '取消收藏',
          callback: () => {
            return false;
          }
        }
      });
    },
    toast() {
      this.$toast('收藏成功，可在书架中查看', {
        type: 'success',
        duration: 1000
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
