<template>
  <div>
    <z-m-header title-text="自定义收藏" show-right has-border>
      <div slot="right" class="title-right">
        <span class="edit">编辑</span>
      </div>
    </z-m-header>

    <div class="main-container">
      <collect-table type="myCollect" :dataList="collectList"></collect-table>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import collectTable from '../components/collectTable'
export default {
  name: 'tableList',
  components: { collectTable, ZMHeader },
  data() {
    return {
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
          cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
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
.edit{
  color: #222222;
  font-size: 12px;
}
.main-container{
  margin-top: 54px;
}
</style>
