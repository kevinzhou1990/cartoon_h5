<template>
  <div class="list-main">
    <span class="list-result">找到{{count}}本相关的</span>
    <div class="list-main-content zm-b-b"
         v-for="item in cartoonList"
         :key="item.cartoon_id"
         @click.stop="handleClickInfo(item.cartoon_id)"
    >
      <div class="list-main-content-img" :style="{background: 'url('+item.cover+') no-repeat center / cover'}"></div>
<!--      :style="{ background: 'url('+articleItem.cover+') no-repeat center / cover' }"-->
      <div class="list-main-content-text">
        <span class="title" v-html="hitWrods(item.title, item.hit_words)"></span>
        <div class="chapter">
          <span class="chapter-author">{{ item.author|authorFormate }}</span>
          <span class="chapter-num">{{ item.publish_status }}</span>
        </div>
        <div class="list-main-content-text-label">
          <span
              class="s-border"
              :class="{'m-l8' : index > 0}"
              v-for="(tagItem, index) in item.tag"
              :key="index"
          >
            {{tagItem}}
          </span>
        </div>
        <span class="list-main-content-text-com">{{ item.publish_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import myMixins from '@/common/mixin/myMixins'
export default {
  name: 'ZMSearchResultList',
  props: {
	  cartoonList: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number || String,
      default: 0
    }
  },
  mixins: [myMixins],
  data() {
    return {}
  },
  methods: {
    hitWrods(val, hitValue) {
      if (!val) return '--'
      if (!hitValue && val) return val
      let hitWordsArr = hitValue
	    let hitWordsStrArr = []
      if (hitWordsArr.length > 1) {
        for (let i = 0; i < hitWordsArr.length; i++) {
	        // val.replace(hitWordsArr[i], `<span style='color: #000000;'>${hitWordsArr[i]}</span>`)
	        hitWordsStrArr.push(`[${hitWordsArr[i]}]+`)
        }
	      let regExp = new RegExp(`${hitWordsStrArr.join('|')}`, 'g')
	      val = val.replace(regExp, '<span style="color: #000000;">$&</span>')
	      return val
      } else {
        const newVal = val.replace(hitWordsArr[0], `<span style='color: #000000;'>${hitWordsArr[0]}</span>`)
        return newVal
      }
    },
	  /**
	   * @info: 去详情
	   * @author: PengGeng
	   * @date: 10/13/20-6:54 下午
	   */
	  handleClickInfo(val) {
      this.handleZMInfo(val)
    }
  }
}
</script>

<style scoped lang="scss">
.m-l8 {
  margin-left: 8px;
}
.list-main {
  position: relative;
  display: inline-block;
  overflow: auto;
  margin-top: 58px;
  padding: 8px 0 16px 16px;
  font-family: pingfang-blod;
  .list-result {
    display: inline-block;
    color: #999999;
    padding-top: 24px;
    font-size: 12px;
  }
  &-content {
    display: flex;
    height: 96px;
    padding: 16px 0;
    &-img {
      height: 96px;
      width: 72px;
      border-radius: 4px;
      background: url("../../../assets/img/defaultBook.png") no-repeat center;
      background-size: 100%;
    }
    &-text {
      margin: 8px 0 8px 8px;
      display: flex;
      flex-direction: column;
      font-size: 10px;
      width: 263px;
      .title {
        font-size: 14px;
        overflow: hidden;
        color: #BBBBBB;
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: nowrap;
      }
      .chapter {
        display: inline-block;
        width: 317px;
        line-height: 14px;
        color: #BBBBBB;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        &-author {
          display: inline-block;
          vertical-align: middle;
          margin-right: 16px;
          max-width: 207px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          white-space: nowrap;
        }
        &-num {
          display: inline-block;
          min-width: 90px;
          overflow: hidden;
          vertical-align: middle;
          text-overflow: ellipsis;
          word-break: break-word;
          white-space: nowrap;
        }
      }
      &-label {
        margin: 4px 0;
        color: #BBBBBB;
        font-size: 10px;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        .s-border {
          display: inline-block;
          min-width: 32px;
          padding: 2px;
          height: 20px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 4px;
          text-align: center;
          line-height: 20px;
        }
      }
      &-com {
        font-size: 10px;
        width: 317px;
        color: #BBBBBB;
        transform: scale(0.83);
        -webkit-transform-origin-x: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: nowrap;
      }
    }
  }
}

</style>
