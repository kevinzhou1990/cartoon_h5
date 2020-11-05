/**
* @info: 滑动组件
* @author: PengGeng
* @date: 8/11/20-2:43 下午
*/
<template>
  <div class="container">
    <swiper :options="swiperOptions" class="swiper-wrapper" ref="mySwiper" v-if="bannerList.length>0">
      <swiper-slide class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
        <img :src="item.img" alt class="swiper-img" :style="{ height: bannerHeight+'px', 'min-width': bannerWidth+ 'px'}" />
<!--        <div class="swiper-img" :style="{ height: bannerHeight+'px', background: 'url('+item.img+')' }"></div>-->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bannermasek" v-if="isBottomImg"></div>
  </div>
</template>

<script>
// tips 使用vue-awesome-swiper 引入组件必须首字母大写
import 'swiper/swiper-bundle.css';
import { Swiper as MySwiperClass, Pagination, Autoplay } from 'swiper/core';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

MySwiperClass.use([Pagination, Autoplay]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(MySwiperClass);
let vm = null
export default {
  name: 'ZMswiper',
  props: {
    // banner 高度
    bannerHeight: {
      type: Number,
      default: 340
    },
    bannerWidth: {
      type: Number,
      default: 375
    },
    // 是否现实下标图片 共首页banner
    isBottomImg: {
      type: Boolean,
      default: false
    },
    // swiper的配置
    swiperOptionsProps: {
      type: Object,
      default: () => {}
    },
    // banner 图片
    bannerList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperObjOptions: {
        preventClicksPropagation: false,
        // autoplay
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          // 触摸滑动后是否继续轮播
          disableOnInteraction: false
        },
        on: {
          click(swiper, event) {
            // 1,4 第一个; 2 第二个;  3 第三个 分别跳转不同的链接
            vm.goBannerInfo(swiper.realIndex)
          }
        },
        pagination: {
          el: '.swiper-pagination',
          // type: 'custom',
          clickable: true, //点击分页器的指示点分页器会控制Swiper切换
          bulletClass: !this.isBottomImg ? 'point-customs-zero' : 'point-customs',
          bulletActiveClass: 'point-customs-active'
        },
        observer: true,
        observerParents: true,
        notNextTick: true,
        // 循环
        loop: this.bannerList.length > 1,
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
    vm = this
    this.swiperOptions = Object.assign({}, this.swiperObjOptions, this.swiperOptionsProps)
    // this.swiperOptions = this.swiperOptionsObject
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    /**
     * TODO 跳转链接待协商
     * @info: 跳转banner的详情
     * @author: PengGeng
     * @date: 8/19/20-3:58 下午
     */
    goBannerInfo(index) {
      const BANNER_DATA = this.bannerList
      // 1-标签，2=专题，3=漫画详情页；4-内部URL；5-外部URL
      const bannerType = BANNER_DATA[index]['jump_type']
      console.log(bannerType)
      const JUMP_ADDRESS = {
        1: () => {
          this.$router.push('/discovery')
          console.log('jump to 标签')
        },
        2: () => {
	        this.$router.push({
		        path: '/recommend',
		        query: {
			        SEC_ID: BANNER_DATA[index].special_id || 0
		        }
	        });
          console.log('jump to 专题')
        },
        3: () => {
	        this.$router.push({
		        path: '/detail',
		        query: {
			        cartoon_id: BANNER_DATA[index].cartoon_id || ''
		        }
	        })
          console.log('jump to 漫画详情页')
        },
        4: () => {
          window.location.href = BANNER_DATA[index].jump_address ? BANNER_DATA[index].jump_address : location.href
          console.log('jump to 内部URL')
        },
        5: () => {
	        window.location.href = BANNER_DATA[index].jump_address ? BANNER_DATA[index].jump_address : location.href
          console.log('jump to 外部URL')
        }
      }
      console.log(JUMP_ADDRESS[bannerType]())
    }
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
    background: url("../../assets/img/defaultBanner.png") no-repeat center;
    background-size: 100%;
  }

  .bannermasek {
    position: absolute;
    top: 92%;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 24px;
    margin-bottom: 20px;
    background: url('../../views/home/images/bannermask.png') no-repeat;
    background-size: 100%;
  }
}
.point-customs-zero {
  display: inline-block;
  width: 6px;
  height: 6px;
  border: 1px solid #ffffff;
  margin: 0 4px;
  border-radius: 50%;
  transition: width 0.3s ease-in-out;
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
  height: 0.1rem;
  border: 1px solid #ffffff;
  margin: -4px 4px;
  border-radius: 50%;
  transition: width 0.3s ease-in-out;
}
.point-customs-active {
  display: inline-block;
  width: 12px;
  height: 0.1rem;
  background: #12e079;
  border: 1px solid #ffffff;
  border-radius: 3px;
  opacity: 1;
  transition: width 0.3s ease-in-out;
}
</style>
