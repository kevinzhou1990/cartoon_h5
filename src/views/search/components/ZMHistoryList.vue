<template>
  <div class="history-main" v-if="wordsData && wordsData.wordsList.length">
    <div class="label">
      <span>{{ wordsData.leftName }}</span>
      <span class="right-cancel" @click.stop="handleClickDel" v-if="!isShowActiveFlag && wordsData.rightFlag"></span>
      <z-m-clear-histroy v-if="isShowActiveFlag" @handle_click_clear="handleClear"></z-m-clear-histroy>
    </div>
    <div
        class="content"
    >
      <div
          class="content-bg"
          :class="{dl: isShowActiveFlag}"
          v-for="(item, index) in wordsData.wordsList"
          :key="index"
          @click="handleClickInfo(item)"
      >
        <span>{{ item }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import ZMClearHistroy from '@/views/search/components/ZMClearHistroy'
import setLocalStorage from '../common/common'
export default {
  name: 'ZMHistoryList',
  props: {
    wordsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
		  // delFlag:
	    isShowActiveFlag: false
    }
  },
  components: {
	  ZMClearHistroy
  },
  methods: {
	  /**
	   * @info: delete all history wrods
	   * @author: PengGeng
	   * @date: 9/30/20-2:28 下午
	   */
	  handleClickDel() {
      // this.delFlag = false
      this.isShowActiveFlag = true
    },
	  handleClear() {
		  localStorage.setItem('HISTROY_WORDS', '')
      this.wordsData.wordsList = []
      this.isShowActiveFlag = true
    },
	  handleClickClearFlag(val) {
		  this.isShowActiveFlag = val
    },
	  /**
	   * @info: go to comics detail
	   * @author: PengGeng
	   * @date: 9/30/20-2:20 下午
	   */
	  handleClickInfo(val) {
		  setLocalStorage(val)
		  this.$router.push({
        path: '/ZMSearchResult',
        query: {
	        searchValue: val
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  $label-fontSize: 12px;
  $label-color: #999999;
  $content-color: #222222;
  .dl {
    color: #BBBBBB !important;
  }
.history-main {
  position: relative;
  overflow: hidden;
  font-family: 'pingfang-blod';
  padding: 24px 8px 0 8px;
  font-size: 12px;
  color: $label-color;
  .label {
    display: flex;
    height: 32px;
    line-height: 32px;
    margin: 0 8px;
    justify-content: space-between;
    .right-cancel {
      /*line-height: 32px;*/
      display: block;
      margin: 6px;
      width: 16px;
      height: 16px;
      background: url("../images/cancel.png") no-repeat center;
      background-size: 100%;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    margin: 8px auto;
    &-bg {
      margin: 8px;
      /*max-width: 150px;*/
      height: 36px;
      line-height: 36px;
      background: #F5F5F5;
      border-radius: 18px;
      text-align: center;
      color: $content-color;
      font-size: $label-fontSize;
      span {
        display: block;
        box-sizing: content-box;
        max-width: 118px;
        padding: 0 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        white-space: nowrap;
      }
    }
  }
}
</style>
