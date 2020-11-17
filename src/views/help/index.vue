<template>
  <div class="helper box">
    <z-m-header title-text="帮助中心" has-border />
    <z-m-nav-bar :tabListData="tabListData" />
    <ul class="helper-list">
      <li class="helper-item" v-for="(item, index) in qalist" :key="index" @click="toDetail(index)">
        <div class="zm-b-b flex">
          <div class="flex-1">
            <div class="helper-item-q">问：{{ item.q }}</div>
            <div class="helper-item-a">
              <div>答：{{ item.a }}</div>
            </div>
          </div>
          <div class="flex icon">
            <svg-icon icon-class="more_bb" size="small" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import ZMNavBar from '@/common/components/ZMNavBar';
import SvgIcon from '@/common/components/svg';
export default {
  data() {
    return {
      tabListData: {
        1: '全部',
        2: '充值问题',
        3: '漫画阅读',
        4: '操作解答'
      },
      qalist: [
        {
          q: '我充值了，但是没有反应？',
          a:
            '对于充值了但没有反应的问题，官方建议先进行账户方面的核查，其他乱七八糟的问题好吧可以了。。。。来啊'
        },
        {
          q: '充值没有到账？',
          a: '充值没有到账，可以等24小时后，重新查询，或咨询客服'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        },
        {
          q: '缓存券还有，使用缓存的时候提示缓存券不足？',
          a:
            '可能是因为选择的漫画章数，超过了缓存券的张数，导致部分章节没有使用到缓存券，提示缓存券不足；建议缓存时，检查缓存券数量和缓存章节数量'
        }
      ]
    };
  },
  components: { ZMHeader, ZMNavBar, SvgIcon },
  methods: {
    toDetail(id) {
      this.$router.push({ path: '/help/detail', query: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.helper {
  .helper-list {
    padding-top: 72px;
    .helper-item {
      padding: 16px 0 0px 16px;
      font-size: 12px;
      & > div {
        padding-bottom: 16px;
      }
    }
  }
  .flex {
    display: flex;
    .flex-1 {
      flex: 1;
    }
  }
  .icon {
    align-items: center;
    padding-right: 16px;
  }
  .helper-item-q {
    color: #222222;
    margin-bottom: 8px;
  }
  .helper-item-a {
    color: #999999;
    font-size: 10px;
    max-width: 311px;
    & > div {
      width: calc(100% * 1.16);
      transform: scale(0.84);
      transform-origin: 0 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
