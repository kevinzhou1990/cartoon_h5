/**
* @info: 搜索联想结果词组建
* @author: PengGeng
* @date: 10/10/20-4:40 下午
*/
<template>
  <div class="result-main">
    <div class="result-main-content zm-b-b" v-for="(item, index) in searchList" :key="index">
      <span class="result-main-content-text" v-html="name"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMSearchResult',
  props: {
	  searchResultList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchList: ['隐秘的角落', '隐秘的角落1', '隐秘的角落2', '隐秘的角落3', '隐秘的角落4'],
      lightWordsList: [],
      name: "<span style='color: #000000; opacity: 0.2;'>こう</span><span style='color: #12E079; opacity: 1;'>1</span>"
    }
  },
  mounted() {
    // this.searchList = this.searchResultList.length && this.searchResultList.map(item => {
    //   return item.keywords
    // })
	  this.searchResultList.length && this.settingLightText()
  },
  methods: {
	  /**
	   * @info: 组装高亮数据
	   * @author: PengGeng
	   * @date: 10/10/20-6:40 下午
	   */
    settingLightText() {
      const reusltList = this.searchResultList.slice(0)

      console.log(reusltList)
    }
  }
}
</script>

<style scoped lang="scss">
.result-main {
  position: relative;
  width: auto;
  background: #FFFFFF;
  &-content {
    height: 44px;
    line-height: 44px;
    font-family: pingfang-blod;
    font-size: 12px;
    width: 327px;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-word;
    overflow-x: hidden;
    margin-left: 48px;
    &-text {
      padding-left: 16px;
      color: #000000;
      /*opacity: 0.2;*/
    }
  }
}
</style>
