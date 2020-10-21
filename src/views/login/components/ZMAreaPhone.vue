<template>
  <transition name="area">
  <div class="area-main" v-show="areaFlag">
    <div class="area-gray"></div>
    <div class="area-content" v-if="dataList.length">
      <div class="area-content-title">
        选择国家/地区
        <span class="area-content-title-close" @click.stop="handleClickClose"></span>
      </div>
      <div class="area-content-bg"></div>
      <div class="area-content-tx"
           v-for="(item,index) in dataList"
           :key="item.code"
           @click.stop="handleClickTelCode(item.code, index)"
      >
        <div class="area-content-tx-item zm-b-b">
          {{ `${item.name}(${item.code})` }}
          <span :class="{'area-content-tx-item-checked': checkedIndex === index }"></span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { getCountryCode } from '../api/index'
export default {
  name: 'ZMAraePhone',
  props: {
	  areaFlag: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'areaFlag',
    event: 'close'
  },
  // computed: {
  //   showFlag: {
  //     get() {
  //       return this.areaFlag
  //     },
  //     set(val) {
  //       this.showFlag = val
  //     }
  //   }
  // },
  data() {
    return {
      dataList: [],
	    checkedIndex: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
	  /**
	   * @info: 选择区号
	   * @author: PengGeng
	   * @date: 10/21/20-10:50 上午
	   */
	  handleClickTelCode(code, index) {
      this.checkedIndex = index
      this.$emit('telCode', code)
		  this.$emit('close', false)
    },
	  /**
	   * @info: 获取国家区号
	   * @author: PengGeng
	   * @date: 10/21/20-10:50 上午
	   */
    async getData() {
      const resData = await getCountryCode()
      if (resData && resData.code === 0) {
        this.dataList = resData.data
        console.log(resData.data)
      } else {
        this.$toast(resData.msg || '系统出错,请稍后重试')
      }
    },
    // 关闭弹窗
	  handleClickClose() {
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped lang="scss">
  .area-enter-active {
    animation: fadeInUp 0.5s;
  }
  .area-leave-active {
    animation: fadeInDown 0.5s;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 100%, 0);
    }
  }
  $Area-title-fontSize: 18px;
  $Area-title-color: #222222;
  $Area-item-fontSize: 12px;
.area-main {
  position: fixed;
  z-index: 999;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .area-gray {
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.5;
  }
  .area-content {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 44px;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 10000;
    background: #FFFFFF;
    border-radius: 8px 8px 0 0;
    &-title {
      position: relative;
      height: 56px;
      line-height: 56px;
      /*background: #FFFFFF;*/
      color: $Area-title-color;
      font-size: $Area-title-fontSize;
      padding-left: 16px;
      &-close {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
        width: 24px;
        height: 24px;
        background: url("../images/close.png") no-repeat center;
        background-size: 100%;
      }
    }
    &-bg {
      background: #F5F5F5;
      height: 8px;
    }
    &-tx {
      font-size: $Area-item-fontSize;
      color: $Area-title-color;
      &-item {
        position: relative;
        height: 56px;
        line-height: 56px;
        padding-left: 16px;
        box-shadow: inset 0 0 0 0 rgba(0,0,0,0.08);
        &-checked {
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          background: url("../images/selected.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
