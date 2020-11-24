<template>
  <div>
    <div class="search" id="search">
      <div class="content">
        <form action="javascript:return true" @submit.prevent=''>
          <input
              id="searchInput"
              v-model.trim="searchValue"
              ref="searchInput"
              type="search"
              class="content-input"
              :placeholder="placeholderValue"
              maxlength="20"
              @focus="goToHistroy"
              @keyup.enter="handleClickSearch(searchValue)"
          />
        </form>
        <span class="content-clear" v-show="searchValue" @click.stop="handleClickClearInput"></span>
      </div>
      <div class="cancel" @click.stop="handleClickCancel">取消</div>
    </div>
    <div class="zm-b-b"></div>
  </div>
</template>

<script>
import { searchResult } from '@/common/api/search'
import { EventBus } from 'lib/utils/eventBus'
import setLocalStorage from '@/views/search/common/common'
export default {
  name: 'search',
  props: {
	  searchVal: {
      type: String,
      default: ''
    },
    hotData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },
  mounted() {
	  EventBus.$on('searchResultContent', (val) => {
      this.searchValue = val
	  })
	  this.$nextTick(() => {
      if (!this.searchValue) this.searchValue = this.searchVal
	  })
  },
  created() {
	  this.$nextTick(() => {
      console.log(sessionStorage.getItem('name'))
      this.searchValue = sessionStorage.getItem('name')
	  })
  },
  computed: {
	  placeholderValue() {
		  const homeSearchVal = this.$store.state.home.homeSearchVal
		  return homeSearchVal !== '' ? homeSearchVal : this.hotData && this.hotData.wordsList[0]
    }
  },
  methods: {
	  /**
	   * @info: 点击了取消
	   * @author: PengGeng
	   * @date: 9/30/20-2:16 下午
	   */
	  handleClickCancel() {
		  sessionStorage.removeItem('name')
      this.$store.commit('SET_SEARCH_VAL', '')
      this.$router.replace(this.$store.state.home.backRouter || '/home')
      console.log('back to path....')
    },
	  /**
	   * @info: 获取数据
	   * @author: PengGeng
	   * @date: 10/12/20-6:29 下午
	   */
    async getData() {
      const resData = await searchResult(this.searchValue)
      if (resData && resData.code === 0) {
        return new Promise(resolve => {
	        return resolve(resData.data)
        })
      } else {
        this.$toast(resData.msg || '系统出错请稍后重试')
      }
    },
	  /**
	   * @info: 得到焦点
	   * @author: PengGeng
	   * @date: 10/12/20-6:29 下午
	   */
	  goToHistroy() {
      if (this.$route.path !== '/ZMSearch') {
        this.$router.replace('/ZMSearch')
      }
    },
	  /**
	   * @info: 点击X按钮的事件
	   * @author: PengGeng
	   * @date: 10/12/20-6:33 下午
	   */
	  handleClickClearInput() {
      this.searchValue = ''
      this.goToHistroy()
      sessionStorage.setItem('name', '')
    },
	  /**
	   * @info: 触发键盘的entry事件
	   * @author: PengGeng
	   * @date: 10/27/20-10:41 上午
	   */
	  handleClickSearch(val) {
	    debugger
      if (!val && !this.placeholderValue) return
		  let searchContext = val.trim() || this.placeholderValue
		  setLocalStorage(searchContext)
		  // 文本框的类容同步
		  this.$router.push({
			  path: '/ZMSearchResult',
			  query: {
				  searchValue: searchContext
			  }
		  })
    }
  },
  watch: {
    searchValue: function (val, oldValue) {
      if (val && val.trim() && val !== oldValue) {
	      this.getData().then(res => {
          const searchResult = res
		      this.$emit('change', true, searchResult)
        })
      } else {
	      this.$emit('change', false)
      }
	  }
  }
}
</script>

<style scoped lang="scss">
// 设置input placeholder的字体
input::-webkit-input-placeholder {
  font-family: 'pingfang-blod';
  color: #BBBBBB;
  font-size: 12px;
}
input[type="text"]{
  font-size: inherit;
}
input[type=search]::-webkit-search-cancel-button{
  -webkit-appearance: none;
}
.search {
  /*position: relative;*/
  display: flex;
  height: 52px;
  margin: 8px auto;
  font-family: 'pingfang-blod';
  .content {
    position: relative;
    margin: 8px 16px;
    padding-left: 40px;
    font-size: 12px;
    color: #BBBBBB;
    letter-spacing: 0;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 4px;
    width: 261px;
    height: 36px;
    line-height: 36px;
    &-input {
      border: none;
      width: 248px;
      /*height: 32px;*/
      outline: none;
    }
    &:before {
      position: absolute;
      content: ' ';
      width: 16px;
      height: 16px;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      background: url("../images/search.png") no-repeat center;
      background-size: 100%;
    }
    &-clear {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 16px;
      width: 16px;
      height: 16px;
      background: url("../images/delete.png") no-repeat center;
      background-size: 100%;
    }
  }
  .cancel {
    position: relative;
    height: 52px;
    line-height: 52px;
    font-size: 12px;
    color: #222222;
    letter-spacing: 0;
  }
}
</style>
