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
      <collect-table type="hotCollect" :dataList="collectList"></collect-table>
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
      ],
      collectList: [
        {
          cartoon_id: 1,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试1hfkshdkfhasdkjfhsdjkhfkjsdahfjkhsadfjkhsdajklfs',
          publish_status: '更新至第1话',
          isUpdate: true,
          total: '22.5万'
        },
        {
          cartoon_id: 2,
          cover: '',
          title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
          publish_status: '更新至第2话',
          isUpdate: true,
          total: '22.5万'
        },
        {
          cartoon_id: 3,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试3',
          publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 4,
          cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
          title: '测试4',
          publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 5,
          cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
          title: '测试1hfkshdkfhasdkjfhsdjkhfkjsdahfjkhsadfjkhsdajklfs',
          publish_status: '更新至第1话',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 6,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
          publish_status: '更新至第2话',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 7,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试3',
          publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 8,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试4',
          publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 9,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
          publish_status: '更新至第2话',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 10,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试3',
          publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 11,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试4',
          publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
          isUpdate: false,
          total: '22.5万'
        },
        {
          cartoon_id: 12,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试4',
          publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs',
          isUpdate: false,
          total: '22.5万'
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
