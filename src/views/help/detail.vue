<template>
  <div class="helper-detail box">
    <z-m-header title-text="" hasBorder />
    <article>
      <h2 class="zm-b-b">问：我充值了，但是没有反应？</h2>
      <p>
        答：对于充值了但无反应的问题，官方建议先进行账户深圳雷漫网络科技有限公司（简称：雷漫网络，英文名：RAYMAN
        NETWORK）创建于2019年6月，公司坐落在国家“建设世界一流高科技园区”的试点园区之一，被誉为“中国硅谷”深圳高新技术产业园内的百度国际大厦，办公占地总面积达1000多平。
      </p>
    </article>
    <div class="button">
      <span class="zm-b"><svg-icon icon-class="solve_ba" size="small" />明白了</span>
      <span class="zm-b" @click="$router.push({ path: '/feedback', query: { source: 1 } })"
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
    return {};
  },
  components: { ZMHeader, SvgIcon },
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
