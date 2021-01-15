/** * @info: 滑动组件 * @author: PengGeng * @date: 8/11/20-2:43 下午 */
<template>
  <div class="container"></div>
</template>

<script>
// tips 使用vue-awesome-swiper 引入组件必须首字母大写
import 'swiper/swiper-bundle.css';
import { Swiper as MySwiperClass, Pagination, Autoplay } from 'swiper/core';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

MySwiperClass.use([Pagination, Autoplay]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(MySwiperClass);
let vm = null;
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
            vm.showInfo(swiper.realIndex, JSON.parse(event.target.name));
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
  mounted() {
    vm = this;
    this.swiperOptions = Object.assign({}, this.swiperObjOptions, this.swiperOptionsProps);
    // this.swiperOptions = this.swiperOptionsObject
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    showDefaultImg() {},
    /**
     * @info: 跳转banner的详情
     * @author: PengGeng
     * @date: 8/19/20-3:58 下午
     */
    showInfo(index, ObjData) {
      // const BANNER_DATA = this.bannerList;
      // 1-标签，2=专题，3=漫画详情页；4-内部URL；5-外部URL
      const bannerType = ObjData['jump_type'];
      console.log(bannerType);
      const JUMP_ADDRESS = {
        1: () => {
          this.$router.push({ path: '/discovery', query: { tag: ObjData.tag_id } });
          console.log('jump to 标签');
        },
        2: () => {
          this.$router.push({
            path: '/topic',
            query: {
              id: ObjData.special_id || 0
            }
          });
          console.log('jump to 专题');
        },
        3: () => {
          this.$router.push({
            path: '/detail',
            query: {
              cartoon_id: ObjData.cartoon_id || ''
            }
          });
          console.log('jump to 漫画详情页');
        },
        4: () => {
          window.location.href = ObjData.jump_address
            ? ObjData.jump_address
            : this.$toast('暂时不支持跳转，谢谢！');
          console.log('jump to 内部URL');
        },
        5: () => {
          window.location.href = ObjData.jump_address
            ? ObjData.jump_address
            : this.$toast('暂时不支持跳转，谢谢！');
          console.log('jump to 外部URL');
        }
      };
      if (ObjData && ObjData['jump_type']) {
        JUMP_ADDRESS[ObjData['jump_type']]();
      } else {
        this.$toast('暂时不支持跳转，谢谢！');
      }
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
  width: 4px;
  height: 4px;
  line-height: 4px;
  border: 1px solid #ffffff;
  margin: 0 4px !important;
  border-radius: 50%;
  transition: width 0.3s ease-in-out;
}
.point-customs {
  display: inline-block;
  width: 4px;
  height: 4px;
  line-height: 4px;
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
  width: 10px;
  height: 4px;
  line-height: 4px;
  background: #12e079;
  border: 1px solid #ffffff;
  border-radius: 9px;
  opacity: 1;
  transition: width 0.3s ease-in-out;
}
</style>
