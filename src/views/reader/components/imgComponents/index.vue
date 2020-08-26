<template>
  <div class="component-img">
    <img :src="src" alt />
  </div>
</template>

<script>
import { throttle } from '@/lib/utils';
export default {
  name: 'ImgComponent',
  props: {
    src: { type: String, default: '' },
    comics: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      scrollHandle: throttle(this.scrollThrottle, 200, this)
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandle, true);
  },
  methods: {
    scrollThrottle() {
      let offset = this.$el.getBoundingClientRect();
      // 移动到屏幕上半部分1/3处即认为已读
      if (offset.top < innerHeight / 3) {
        // if (offset.top === innerHeight / 2 && offset.bottom >= 0) {
        console.log('comics', this.comics);
      } else {
        console.log('移除可视区域');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.component-img {
  img {
    width: 100%;
  }
}
</style>
