<template>
  <div class="animation-active-in">
    <z-m-header :title-text="title" show-right has-border>
      <div slot="right" class="title-right">
        <span class="edit" @click="jumpDownloadPage">编辑</span>
      </div>
    </z-m-header>

    <div class="main-container">
      <collect-table
        type="myCollect"
        :refId="$route.params.favorite_id"
        :dataList="collectList"
      ></collect-table>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import collectTable from '../components/collectTable'
import { getCartoonByGroup } from '@/common/api/shelf'
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'tableList',
  components: { collectTable, ZMHeader },
  mixins: [ myMixins ],
  data() {
    return {
      collectList: [],
      title: ''
    };
  },
  mounted() {
    this.getCartoon()
  },
  methods: {
    async getCartoon(){
      const data = await getCartoonByGroup(this.$route.params.favorite_id || '');
      if (data.code === 0) {
        this.collectList = data.data.cartoon_list;
        this.title = data.data.group_info && data.data.group_info.name ? data.data.group_info.name : '';
      } else {
        this.$toast(data.msg || '系统出错,请稍后重试');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .edit{
    color: #222222;
    font-size: 12px;
  }
  .main-container{
    padding-top: 54px;
  }
</style>
