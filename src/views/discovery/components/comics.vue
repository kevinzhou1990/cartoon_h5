<template>
  <div class="comics-component" @click="goDetail">
    <div class="comics-component-cover" :style="`background-image:url(${comics.cover})`"></div>
    <div class="comics-component-title">{{comics.title}}</div>
    <div class="comics-component-update">
      <span>{{comics.status_text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comics',
  props: {
    comics: { type: Object }
  },
  data() {
    return {};
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: '/detail',
        query: { cartoon_id: this.comics.cartoon_id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.comics-component {
  font-family: 'pingfang-blod';
  &-cover {
    width: 109px;
    height: 145px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  &-title {
    box-sizing: border-box;
    color: #222;
    font-size: 14px;
    padding: 8px 0 4px 0;
    width: 109px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-update {
    font-size: 10px;
    color: #bbb;
    width: 109px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      display: inline-block;
      transform: scale(0.83);
      transform-origin: 0;
    }
  }
}
</style>
