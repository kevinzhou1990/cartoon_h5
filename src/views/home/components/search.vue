<template>
  <div class="search">
    <div class="search-label">
      <img class="search-label-img" src="../images/search.png" />
<!--      <input class="search-label-input" v-model="searchValue" :placeholder="placeholderValue" />-->
      <div class="scroll-box">
        <ul v-if="scrollTextList.length>0">
          <li
              v-for="(item, index) of scrollTextList"
              :key="index"
              @click.stop="handleClickSearch(item)"
          >
            {{ item || '什么也没有' }}
          </li>
        </ul>
          <ul v-else>
            啥也不是
          </ul>
        <ul></ul>
      </div>
    </div>
  </div>
</template>
<script>
import { searchWroldList } from '@/common/api/home'
export default {
  name: 'ZM-search',
  data() {
    this.timer = null
    this.box = null
    return {
      searchValue: '', // search values
      placeholderValue: '请输入你想要的内容', // search init values
      scrollTextList: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
	  /**
	   * @info: jump search page
	   * @author: PengGeng
	   * @date: 9/29/20-4:17 下午
	   */
	  handleClickSearch(val) {
      console.log('jump search page', val)
      this.$store.commit('SET_SEARCH_VAL', val)
      this.$store.commit('SET_BACK_ROUTER', this.$route.path)
      this.$router.push('/ZMSearch')
    },
    async getData() {
      const resData = await searchWroldList()
      if (resData && resData.code === 0){
        this.scrollTextList = resData.data.hot_keywords || []
	      this.textScroll()
      } else {
	      this.$toast(resData.msg || '系统出错,请稍后重试');
      }
    },
    textScroll() {
	    this.box = document.getElementsByClassName('scroll-box')[0];
	    let parent = document.getElementsByTagName('ul')[0];
	    let parent2 = document.getElementsByTagName('ul')[1];
	    parent2.innerHTML = parent.innerHTML;
      /*启动定时器*/
      if (this.scrollTextList.length > 1){
	      this.timer = setInterval(this.autoScrollLine, 30);
      }
    },
    autoScrollLine() {
      /* 判断滚动内容是否已经滚完，滚完了则滚动的值重新设置到0否则就每隔30毫秒向上滚动1px */
      const parent = document.getElementsByTagName('ul') && document.getElementsByTagName('ul')[0]
      if (!parent) return
      if (this.box.scrollTop >= parent.offsetHeight) {
        this.box.scrollTop = 0;
      } else {
        this.box.scrollTop++;
      }
      /* 判断滚动的距离刚好为一条内容的高度时停掉定时器，隔1s之后重新启动定时器即可实现内容滚动停留效果 */
      if (this.box.scrollTop % this.box.offsetHeight === 0) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.timer = setInterval(this.autoScrollLine, 30);
        }, 1000);
      }
    }
  }
}
</script>
<style scoped lang="scss">
$search-font-size: 12px;
$search-color: #fff;
.search {
  position: relative;
  height: 52px;
  font-size: $search-font-size;
  color: $search-color;
  &-label {
    display: flex;
    justify-content: center;
    justify-items: center;
    border-radius: 4px;
    &-img {
      position: absolute;
      top: 50%;
      left: 16px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      transform: translateY(-50%);
    }
    &-input {
      height: 36px;
      width: 343px;
      line-height: 36px;
      margin: 8px 0;
      padding-left: 36px;
      background: rgba(0, 0, 0, 0.3);
      border: none;
      border-radius: 4px;
    }
    .scroll-box {
      width: 343px;
      height: 36px;
      margin: 8px auto;
      /*background: rgba(0,0,0,0.30);*/
      line-height: 36px;
      background: rgba(0,0,0,0.30);
      border-radius: 4px;
      overflow: hidden;
      ul {
        font-family: 'PingFangSC-Semibold';
        line-height: 36px;
        padding-left: 40px;
        color: #FFFFFF;
        opacity: 0.6;
        font-size: 12px;
        li {

        }
      }
    }
    input {
      color: #ffffff;
      outline: none;
    }
  }
}
</style>
