/** * @info: 滑动组件 * @author: PengGeng * @date: 8/11/20-2:43 下午 */
<template>
  <div class="container">
    <swiper
      :options="swiperOptions"
      class="swiper-wrapper"
      ref="mySwiper"
      v-if="bannerList.length > 0"
    >
      <swiper-slide class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
        <img
          :src="item.img"
          onerror="this.src='data:image/png;base64,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'; this.onerror=null"
          alt="banner"
          class="swiper-img"
          :style="{ height: bannerHeight + 'px', 'min-width': bannerWidth + 'px' }"
          @click.prevent="showInfo(index)"
        />
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
      defaultImgSource: '',
      swiperObjOptions: {
        preventClicksPropagation: false,
        // autoplay
        autoplay: {
          delay: 4500,
          stopOnLastSlide: false,
          // 触摸滑动后是否继续轮播
          disableOnInteraction: false
        },
        on: {
          click(swiper, event) {
            // 1,4 第一个; 2 第二个;  3 第三个 分别跳转不同的链接
            // vm.goBannerInfo(swiper.realIndex)
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
    this.swiperOptions = Object.assign({}, this.swiperObjOptions, this.swiperOptionsProps);
    // this.swiperOptions = this.swiperOptionsObject
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    showDefaultImg(){},
    /**
     * @info: 跳转banner的详情
     * @author: PengGeng
     * @date: 8/19/20-3:58 下午
     */
    showInfo(index) {
      const BANNER_DATA = this.bannerList;
      // 1-标签，2=专题，3=漫画详情页；4-内部URL；5-外部URL
      const bannerType = BANNER_DATA[index]['jump_type'];
      console.log(bannerType);
      const JUMP_ADDRESS = {
        1: () => {
          this.$router.push({ path: '/discovery', query: { tag: BANNER_DATA[index].tag_id } });
          console.log('jump to 标签');
        },
        2: () => {
          this.$router.push({
            path: '/topic',
            query: {
              id: BANNER_DATA[index].special_id || 0
            }
          });
          console.log('jump to 专题');
        },
        3: () => {
          this.$router.push({
            path: '/detail',
            query: {
              cartoon_id: BANNER_DATA[index].cartoon_id || ''
            }
          });
          console.log('jump to 漫画详情页');
        },
        4: () => {
          window.location.href = BANNER_DATA[index].jump_address
            ? BANNER_DATA[index].jump_address
            : this.$toast('暂时不支持跳转，谢谢！');
          console.log('jump to 内部URL');
        },
        5: () => {
          window.location.href = BANNER_DATA[index].jump_address
            ? BANNER_DATA[index].jump_address
            : this.$toast('暂时不支持跳转，谢谢！');
          console.log('jump to 外部URL');
        }
      };
      if (BANNER_DATA[index] && BANNER_DATA[index]['jump_type']) {
        JUMP_ADDRESS[BANNER_DATA[index]['jump_type']]();
      } else {
        this.$toast('暂时不支持跳转，谢谢！');
      }
    }
    /**
     * TODO 跳转链接待协商
     * @info: 跳转banner的详情
     * @author: PengGeng
     * @date: 8/19/20-3:58 下午
     */
    // goBannerInfo(index) {
    //   this.$emit('adBannerInfo', index)
    //   // const BANNER_DATA = this.bannerList
    //   // // 1-标签，2=专题，3=漫画详情页；4-内部URL；5-外部URL
    //   // const bannerType = BANNER_DATA[index]['jump_type']
    //   // console.log(bannerType)
    //   // const JUMP_ADDRESS = {
    //   //   1: () => {
    //   //     this.$router.push('/discovery')
    //   //     console.log('jump to 标签')
    //   //   },
    //   //   2: () => {
    //   //     this.$router.push({
    //   //       path: '/recommend',
    //   //       query: {
    // 	//         SEC_ID: BANNER_DATA[index].special_id || 0
    //   //       }
    //   //     });
    //   //     console.log('jump to 专题')
    //   //   },
    //   //   3: () => {
    //   //     this.$router.push({
    //   //       path: '/detail',
    //   //       query: {
    // 	//         cartoon_id: BANNER_DATA[index].cartoon_id || ''
    //   //       }
    //   //     })
    //   //     console.log('jump to 漫画详情页')
    //   //   },
    //   //   4: () => {
    //   //     window.location.href = BANNER_DATA[index].jump_address ? BANNER_DATA[index].jump_address : location.href
    //   //     console.log('jump to 内部URL')
    //   //   },
    //   //   5: () => {
    //   //     window.location.href = BANNER_DATA[index].jump_address ? BANNER_DATA[index].jump_address : location.href
    //   //     console.log('jump to 外部URL')
    //   //   }
    //   // }
    //   // console.log(JUMP_ADDRESS[bannerType]())
    // }
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
    /*background: url("../../assets/img/defaultBanner.png") no-repeat center;*/
    background-size: 100%;
  }

  .bannermasek {
    position: absolute;
    top: 93%;
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
  line-height: 6px;
  border: 1px solid #ffffff;
  margin: 0 4px !important;
  border-radius: 50%;
  transition: width 0.3s ease-in-out;
}
.point-customs {
  display: inline-block;
  width: 6px;
  height: 6px;
  line-height: 6px;
  border: 1px solid #ffffff;
  margin: 20px 4px;
  border-radius: 9px;
  transition: width 0.3s ease-in-out;
}
.point-customs-recommend {
  display: inline-block;
  width: 4px;
  height: 0.1rem;
  border: 1px solid #ffffff;
  margin: -4px 4px;
  border-radius: 9px;
  line-height: 6px;
  transition: width 0.3s ease-in-out;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 12px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.point-customs-active {
  /*display: inline-block;*/
  /*margin-bottom: 21px;*/
  align-items: center;
  /*margin: 21px auto;*/
  width: 12px;
  height: 6px;
  line-height: 6px;
  background: #12e079;
  border: 1px solid #ffffff;
  border-radius: 9px;
  opacity: 1;
  transition: width 0.3s ease-in-out;
}
</style>
