<template>
  <div class="helper-detail box">
    <z-m-header title-text="" hasBorder />
    <article>
      <h2 class="zm-b-b">问：{{ detail.question }}</h2>
      <p>答：{{ detail.answer }}</p>
    </article>
    <div class="button">
      <span class="zm-b" @click="$router.go(-1)"
        ><svg-icon icon-class="solve_ba" size="small" />明白了</span
      >
      <span
        class="zm-b"
        @click="$router.push({ path: '/feedback', query: { source: 1, ...$route.query } })"
        ><svg-icon icon-class="solve_bb" size="small" />没看懂</span
      >
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import '@/assets/style/1px.scss';
export default {
  data() {
    return {
      understand: false,
      feedback: false
    };
  },
  mounted() {
    this.$store.dispatch('getHelpDetail', this.$route.query.id);
  },
  components: { ZMHeader, SvgIcon },
  computed: {
    detail() {
      return this.$store.state.help.detail;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.helper-detail {
  color: #222222;
  h2 {
    font-family: 'pingfang-blod';
    font-weight: normal;
    padding: 16px;
    margin: 0;
  }
  p {
    font-size: 14px;
    font-family: 'pingfang-regular';
    padding: 16px;
  }
  .button {
    text-align: center;
    padding-top: 24px;
    span {
      display: inline-block;
      width: 124px;
      height: 44px;
      line-height: 44px;
      vertical-align: middle;
      &:before {
        border-radius: 44px;
      }
      &:first-child {
        margin-right: 16px;
      }
      & > svg {
        margin-right: 8px;
      }
    }
  }
}
</style>
