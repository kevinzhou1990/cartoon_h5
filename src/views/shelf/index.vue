<template>
  <div>
    <Button type="pramary" @click="dialog">弹窗</Button>
  </div>
</template>

<script>
export default {
  methods: {
    dialog() {
      this.$dialog('msg', 'confirm');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
