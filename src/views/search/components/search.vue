<template>
  <div>
    <div class="search">
      <div class="content">
        <input v-model="searchValue" class="content-input" :placeholder="placeholderValue" maxlength="20" />
        <span class="content-clear" v-show="searchValue.length" @click.stop="searchValue = ''"></span>
      </div>
      <div class="cancel" @click.stop="handleClickCancel">取消</div>
    </div>
    <div class="zm-b-b"></div>
  </div>

</template>

<script>
import { searchResult } from '@/common/api/search'
export default {
  name: 'search',
  data() {
    return {
      placeholderValue: '黑白放音机 第二季',
      searchValue: ''
    }
  },
  methods: {
	  /**
	   * @info: 点击了取消
	   * @author: PengGeng
	   * @date: 9/30/20-2:16 下午
	   */
	  handleClickCancel() {
      console.log('back to path....')
    },
    async getData() {
      const resData = await searchResult(this.searchValue)
      if (resData && resData.code === 0) {
        return new Promise(resolve => {
	        return resolve(resData.data)
        })
      } else {
        this.$toast(resData.msg || '系统出错请稍后重试')
      }
    }

  },
  watch: {
    searchValue: function (val, oldValue) {
      if (val !== oldValue && val.length > 0) {
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
