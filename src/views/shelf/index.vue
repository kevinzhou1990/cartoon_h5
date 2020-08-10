<template>
  <div>
    <Button type="pramary" @click="dialog">弹窗</Button>
    <Button type="pramary" @click="toast">toast</Button>
    <Button type="pramary" @click="openContents">目录</Button>
    <Contents @close="closeConents" :show="show" />
  </div>
</template>

<script>
import Contents from '@/common/components/contents';
export default {
  components: {
    Contents
  },
  data() {
    return {
      show: false
    };
  },
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
    },
    openContents() {
      console.log('打开目录');
      this.show = true;
    },
    closeConents() {
      console.log('关闭目录');
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
