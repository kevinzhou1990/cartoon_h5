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
      if (offset.top < innerHeight && offset.top > 0) {
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
