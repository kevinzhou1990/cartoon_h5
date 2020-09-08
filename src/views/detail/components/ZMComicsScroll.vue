<template>
  <div class="main">
    <div class="main-title">{{ titleContent }}</div>
    <div class="main-img" v-if="comicsList.length">
      <div
          class="main-img-content"
          v-for="item in comicsList"
          :key="item.cartoon_id"
          @click="handleDetial(item.cartoon_id)"
      >
        <span class="main-img-content-img" :style="{background: 'url('+item.cover || comicsImg+')', 'background-size': '100%'}"></span>
        <span class="main-img-content-title">{{ item.title }}</span>
        <span class="main-img-content-chapter" v-if="comicsType === 1">{{ item.status_text }}</span>
        <span class="main-img-content-chapter" v-else>{{ item.author | authorFormate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMComicsScroll',
  mixins: [myMixins],
  props: {
    titleContent: {
      type: String,
      default: ''
    },
	  comicsList: {
      type: Array,
      default: () => []
    },
	  comicsType: {
      type: Number,
      defatult: 1
    }
  },
  data() {
    return {
      comicsImg: require('../../../assets/img/defaultBook.png')
    }
  },
  methods: {
	  handleDetial(val) {
      this.$router.replace(`/detail?cartoon_id=${val}`)
		  window.location.reload()
	  }
  }
};
</script>

<style scoped lang="scss">
.main {
  position: relative;
  padding: 20px 12px 20px 12px;
  font-weight: bold;
  overflow-y: hidden;
  margin: 0 auto;
  width: 100%;
  &-title {
    font-size: 18px;
    color: #222222;
    letter-spacing: 0;
  }
  &-img {
    display: flex;
    padding-top: 12px;
    margin-right: 2px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    &-content {
      display: flex;
      flex-flow: column;
      padding: 4px;
      &-img {
        padding: 4px 0;
        width: 90px;
        height: 120px;
        background-size: 100%;
        border-radius: 4px;
      }
      &-title {
        display: inline-block;
        width: 90px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 4px 0;
        font-size: 14px;
        color: #222222;

      }
      &-chapter {
        font-size: 10px;
        color: #bbbbbb;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 90px;
      }
    }
  }
}
</style>
