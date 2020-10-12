/**
* @info: 搜索联想结果词组建
* @author: PengGeng
* @date: 10/10/20-4:40 下午
*/
<template>
  <div class="result-main">
    <div class="result-main-content zm-b-b" v-for="(item, index) in lightWordsList" :key="index">
      <span class="result-main-content-text" v-html="item.lightWords" @click.stop="handleClickSearchWords(item.wordsText)"></span>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/lib/utils/eventBus'
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
      lightWordsList: [] // 高亮联想搜索词
    }
  },
  mounted() {
	  this.searchResultList.length && this.settingLightText()
  },
  methods: {
	  /**
	   * @info: 组装高亮数据
	   * @author: PengGeng
	   * @date: 10/10/20-6:40 下午
	   */
    settingLightText() {
		  this.lightWordsList = []
      const resultList = this.searchResultList.slice(0)
      resultList.map(item => {
	       this.lightWordsList.push({wordsText: item.keywords, lightWords: this.lightMethods(item)})
      })
      console.log(this.lightWordsList)
    },
	  /**
	   * @info: 替换成高亮文字
	   * @author: PengGeng
	   * @date: 10/12/20-10:41 上午
	   */
	  lightMethods(val) {
      if (!val || !val.keywords || !val.hit_words) return
      let keyWords = val.keywords
      let hitWordsArr = val.hit_words
      if (hitWordsArr.length > 1) {
        for (let i = 1; i < hitWordsArr.length; i++) {
	        keyWords.replaceAll(hitWordsArr[i], `<span style='color: #12E079;'>${hitWordsArr[i]}</span>`)
        }
        return keyWords
      } else {
        return keyWords.replaceAll(hitWordsArr[0], `<span style='color: #12E079;'>${hitWordsArr[0]}</span>`)
      }
    },
	  /**
	   * @info: 点击搜索的联想词
	   * @author: PengGeng
	   * @date: 10/12/20-11:17 上午
	   */
	  handleClickSearchWords(val) {
      // todo 跳转页面
      // 文本框的类容同步
		  EventBus.$emit('searchResultContent', val)
      console.log(val)
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
      color: #BBBBBB;
    }
  }
}
</style>
