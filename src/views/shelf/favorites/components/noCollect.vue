<template>
  <div>
    <no-data-view type="collect" textContent="还没有收藏呢？"></no-data-view>

    <div class="hot-recommend">
      <div class="main-container">
        <div class="content">
          <div class="img-container">
            <div class="img1 img" :style="{background: 'url('+cover[0].cover+')','background-size': '100%'}"></div>
            <div class="img2 img" :style="{background: 'url('+cover[1].cover+')','background-size': '100%'}"></div>
            <div class="img3 img" :style="{background: 'url('+cover[2].cover+')','background-size': '100%'}"></div>
          </div>

          <div class="text">
            <span>查看热门推荐</span>
            <svg-icon icon-class="more_collect" size="small" />
          </div>
        </div>
      </div>
    </div>

    <div class="hot-collect">
      <div class="title">热门收藏</div>
      <collect-table type="hotCollect" :dataList="dataList"></collect-table>
    </div>
  </div>
</template>

<script>
import noDataView from '@/common/components/noDataView';
import collectTable from './collectTable'
import SvgIcon from '@/common/components/svg';
export default {
  name: 'noCollect',
  components: { noDataView, SvgIcon, collectTable },
  props: {
    dataList: {
      type: Array
    }
  },
  data() {
    return {
      cover: [
        {
          id: 1,
          cover: 'http://bookwine.leimans.com/1600257100264-360*480.jpeg'
        },
        {
          id: 2,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png'
        },
        {
          id: 3,
          cover: 'http://bookwine.leimans.com/1599015032515-%E4%B8%A4%E6%83%85%E7%9B%B8%E6%81%8B%E5%B0%81%E9%9D%A2.png'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
  $HEIGHT: 56px;
  $FONEFAMILY: PingFangSC-Semibold;
  .hot-recommend{
    height: $HEIGHT;
    margin-top: 40px;
    padding: 0 16px;
    font-family: $FONEFAMILY;

    .main-container{
      background: #12e079;
      height: $HEIGHT;
      line-height: $HEIGHT;
      border-radius: 4px;
      position: relative;

      .content {
        padding: 0 16px;

        .text {
          color: #FFFFFF;
          float: right;
        }

        .img-container{
          height: 80px;
          position: absolute;
          bottom: 0;
          .img {
            background: url('../../../../assets/img/defaultBook.png') no-repeat;
            background-size: 100%;
            display: inline-block;
            border-radius: 4px;
            position: relative;
          }

          .img1 {
            width: 60px;
            height: 80px;
            z-index: 3;
          }

          .img2 {
            width: 56px;
            height: 74px;
            margin-left: -14px;
            z-index: 2;
          }

          .img3 {
            width: 50px;
            height: 66px;
            margin-left: -14px;
            z-index: 1;
          }
        }
      }
    }
  }

  .hot-collect{
    margin-top: 40px;
    .title {
      padding: 0 16px;
      color: #222222;
      font-family: $FONEFAMILY;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }

</style>
