<template>
  <div class="component-img" :id="`img${comics.detail_id}`" :style="`height:${height}px`">
    <img alt :data-src="src" :src="defaultLoad ? src : ''" ref="img" />
    <!-- <img :src="src" alt=""> -->
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
    },
    defaultLoad: { type: true, default: false },
    height: { type: Number }
  },
  data() {
    return {
      scrollHandle: throttle(this.scrollThrottle, 500, this)
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandle, true);
  },
  watch: {
    readscroll(n, o) {
      if (n) {
        window.addEventListener('scroll', this.scrollHandle, true);
      } else {
        window.removeEventListener('scroll', this.scrollHandle, true);
      }
    }
  },
  computed: {
    imagesList: function () {
      return this.$store.state.reader.imagesList.detail;
    },
    readscroll: function () {
      return this.$store.state.reader.readscroll;
    }
  },
  methods: {
    scrollThrottle() {
      let offset = this.$el.getBoundingClientRect();
      // 当前图片是否在可见区域
      if (offset.top > innerHeight / 3 && offset.top < innerHeight) {
        // 计算进度
        const idList = this.imagesList.map((item) => {
          return item.detail_id;
        });
        const idx = idList.indexOf(this.comics.detail_id);
        const readProcess = (idx + 1) / this.imagesList.length;
        this.$store.commit('UPDATE_READERPROCESS', readProcess * 100);
        const localContents = {};
        const chapter = {};
        chapter[this.$route.query.capterId] = {
          read_per: Math.round(readProcess * 100),
          detail_id: this.imagesList[idx].detail_id
        };
        localContents[this.$route.query.cartoon_id] = {
          ...chapter
        };
        this.$store.dispatch('saveProcess', localContents);
      }
      // 图片预加载,加载负一屏和下一屏的图片
      if (offset.top > -innerHeight && offset.top < 2 * innerHeight && this.$refs.img) {
        this.$refs.img.src = this.$refs.img.dataset.src;
      }
    },
    updateLocalData() {}
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle, true);
  }
};
</script>

<style lang="scss" scoped>
.component-img {
  min-height: 50px;
  img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
}
</style>
