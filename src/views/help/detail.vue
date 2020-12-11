<template>
  <div class="helper-detail box">
    <z-m-header title-text="" />
    <article>
      <h2 class="zm-b-b">问：{{ detail.question }}</h2>
      <p>答：{{ detail.answer }}</p>
    </article>
    <div class="button">
      <span class="zm-b" @click="$router.go(-1)"
        ><svg-icon icon-class="solve_ba" size="small" />明白了</span
      >
      <span :class="understand ? 'zm-b no' : 'zm-b'" @click="doNotUnderstand"
        ><svg-icon icon-class="solve_bb" size="small" /><i>没看懂</i></span
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
      feedback: false
    };
  },
  mounted() {
    this.$store.dispatch('help/getHelpDetail', this.$route.query.id);
  },
  components: { ZMHeader, SvgIcon },
  computed: {
    detail() {
      return this.$store.state.help.detail;
    },
    understand() {
      const list = this.$store.state.help.list;
      for (let i = 0; i < list.length; i++) {
        if (list[i].help_id === parseInt(this.$route.query.id)) {
          return list[i].readed;
        }
      }
    }
  },
  methods: {
    doNotUnderstand() {
      if (!this.understand) {
        this.$router.push({ path: '/feedback', query: { source: 1, ...this.$route.query } });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'help') {
      this.$store.commit('help/UPDATEHELPDETAIL', {});
    }
    next();
  }
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
      * {
        font-style: normal;
      }
      &:before {
        border-radius: 44px;
      }
      &:first-child {
        margin-right: 16px;
      }
      & > svg {
        margin-right: 8px;
        margin-top: -1px;
      }
      &.no * {
        opacity: 0.1;
      }
    }
  }
}
</style>
