<template>
  <div class="container">
    <swiper :options="swiperOptions" class="swiper-wrapper" ref="mySwiper" v-if="banners.length>0">
      <swiper-slide class="swiper-slide" v-for="item in banners" :key="item">
        <img :src="item" alt class="swiper-img" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bannermasek"></div>
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
  data() {
    return {
      banners: [
        require('../images/one.png'),
        require('../images/two.png'),
        require('../images/headerBg.png')
      ],
      swiperOptions: {
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
          // renderCustom: function (swiper, current, total) {
          //   let _html = ''
          //   for (let i = 1; i <= total; i++) {
          //     if (Number(current) === 1) {
          //       _html += `<span class="point-customs point-customs-active"></span>`
          //     } else {
          //       _html += `<span class="point-customs"></span>`
          //     }
          //   }
          //   console.log('current', current)
          //   console.log('total', total)
          //   return _html
          // }
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
      }
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
  mounted() {
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
    background: url('../images/bannermask.png') no-repeat;
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
