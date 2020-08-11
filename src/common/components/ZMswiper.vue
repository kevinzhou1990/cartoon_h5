/**
* @info: 滑动组件
* @author: PengGeng
* @date: 8/11/20-2:43 下午
*/
<template>
  <div class="container">
    <swiper :options="swiperOptions" class="swiper-wrapper" ref="mySwiper" v-if="banners.length>0">
      <swiper-slide class="swiper-slide" v-for="item in banners" :key="item">
        <img :src="item" alt class="swiper-img" :style="{ height: bannerHeight+'px' }" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bannermasek" v-if="isBottomImg"></div>
  </div>
</template>

<script>
// tips 使用vue-awesome-swiper 引入组件必须首字母打下
import 'swiper/swiper-bundle.css';
import { Swiper as MySwiperClass, Pagination, Autoplay } from 'swiper/core';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

MySwiperClass.use([Pagination, Autoplay]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(MySwiperClass);

export default {
  name: 'ZMswiper',
  props: {
    bannerHeight: {
      type: Number,
      default: 300
    },
    isBottomImg: {
      type: Boolean,
      default: true
    },
    swiperOptionsProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      banners: [
        require('../../views/home/images/one.png'),
        require('../../views/home/images/two.png'),
        require('../../views/home/images/headerBg.png')
      ],
      swiperObjOptions: {
        preventClicksPropagation: false,
        // autoplay
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          // 触摸华滑动后是否继续轮播
          disableOnInteraction: false
        },
        on: {
          click(swiper, event) {
          // todo 1,4 第一个 2 第二个  3 第三个 分别跳转不同的链接
            console.log(swiper.clickedIndex);
          }
        },
        pagination: {
          el: '.swiper-pagination',
          // type: 'custom',
          clickable: true, //点击分页器的指示点分页器会控制Swiper切换
          bulletClass: 'point-customs',
          bulletActiveClass: 'point-customs-active'
        },
        observer: true,
        observerParents: true,
        notNextTick: true,
        // 循环
        loop: true,
        // setting init index
        initialSlide: 0,
        // 滑动的速度
        speed: 800,
        // 滑动的方向
        direction: 'horizontal'
      },
      swiperOptions: {}
    };
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  created() {
    this.swiperOptions = Object.assign({}, this.swiperObjOptions, this.swiperOptionsProps)
    // this.swiperOptions = this.swiperOptionsObject
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  }
};
</script>

<style lang="scss">
.container {
  position: relative;
  margin: 0 auto;
  padding: 0;

  .swiper-img {
    width: 100%;
    height: 300px;
  }

  .bannermasek {
    position: absolute;
    top: 91%;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 24px;
    margin-bottom: 20px;
    background: url('../../views/home/images/bannermask.png') no-repeat;
    background-size: 100%;
  }
}

.point-customs {
  display: inline-block;
  width: 6px;
  height: 6px;
  border: 1px solid #ffffff;
  margin: 20px 4px;
  border-radius: 50%;
  transition: width 0.3s ease-in-out;
}
.point-customs-recommend {
  display: inline-block;
  width: 6px;
  height: 6px;
  border: 1px solid #ffffff;
  margin: -4px 4px;
  border-radius: 50%;
  transition: width 0.3s ease-in-out;
}
.point-customs-active {
  display: inline-block;
  width: 12px;
  height: 6px;
  background: #12e079;
  border: 1px solid #ffffff;
  border-radius: 3px;
  opacity: 1;
  transition: width 0.3s ease-in-out;
}

</style>
