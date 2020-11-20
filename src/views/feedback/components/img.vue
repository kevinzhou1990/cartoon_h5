<template>
  <div class="pic-item zm-b-radius">
    <div>
      <span @click="delPic(idx)">
        <svg-icon icon-class="delimg_ba" size="small" />
      </span>
      <img :src="url" alt="" />
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  data() {
    return {};
  },
  props: {
    idx: { type: Number },
    url: { type: String }
  },
  components: { SvgIcon },
  methods: {
    delPic(idx) {
      this.$emit('del', idx);
    }
  }
};
</script>

<style lang="scss" scoped>
.pic-item {
  height: 64px;
  width: 64px;
  margin-right: 16px;
  display: inline-block;
  vertical-align: top;
  div {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
  span {
    position: absolute;
    right: -8px;
    top: -8px;
  }
}
</style>
