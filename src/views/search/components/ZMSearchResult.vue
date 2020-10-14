/**
* @info: 搜索联想结果词组建
* @author: PengGeng
* @date: 10/10/20-4:40 下午
*/
<template>
  <div class="result-main" v-if="lightWordsList.length">
    <div class="result-main-content zm-b-b"
         v-for="(item, index) in lightWordsList"
         :key="index"
         @click.stop="handleClickSearchWords(item.wordsText)"
    >
      <span class="result-main-content-text" v-html="item.lightWords"></span>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/lib/utils/eventBus'
import setLocalStorage from '../common/common'
export default {
  name: 'ZMSearchResult',
  props: {
	  searchResultList: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'searchResultList',
    event: 'change'
  },
  computed: {
    resulstData: {
		  get: function () {
			  return this.searchResultList
		  },
      set: function (val) {
        this.resulstData = val
      }
    }
  },
  data() {
    return {
      // resultList: this.searchResultList,
      lightWordsList: [] // 高亮联想搜索词
    }
  },
  mounted() {
	  this.resulstData.length && this.settingLightText()
  },
  methods: {
	  /**
	   * @info: 组装高亮数据
	   * @author: PengGeng
	   * @date: 10/10/20-6:40 下午
	   */
    settingLightText() {
		  this.lightWordsList = []
      const resultList = this.resulstData.slice(0)
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
      let hitWordsStrArr = []
      if (hitWordsArr.length > 1) {
        for (let i = 0; i < hitWordsArr.length; i++) {
	        hitWordsStrArr.push(`[${hitWordsArr[i]}]+`)
        }
	      let regExp = new RegExp(`${hitWordsStrArr.join('|')}`, 'g')
	      keyWords = keyWords.replace(regExp, '<span style="color: #12e079;">$&</span>')
        return keyWords
      } else {
        const hitwords = keyWords.replace(hitWordsArr[0], `<span style='color: #12E079;'>${hitWordsArr[0]}</span>`)
	      return hitwords
      }
    },
	  /**
	   * @info: 点击搜索的联想词
	   * @author: PengGeng
	   * @date: 10/12/20-11:17 上午
	   */
	  handleClickSearchWords(val) {
      if (!val) return
		  EventBus.$emit('searchResultContent', val)
		  setLocalStorage(val)
		  // 文本框的类容同步
		  this.$router.push({
        path: '/ZMSearchResult',
        query: {
          searchValue: val
        }
      })
      console.log(val)
    }
  },
  watch: {
    'resulstData': {
      handler: function (val, oldValue) {
        this.settingLightText()
      },
      deep: true
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
      width: 327px;
      padding-left: 16px;
      color: #BBBBBB;
    }
  }
}
</style>
