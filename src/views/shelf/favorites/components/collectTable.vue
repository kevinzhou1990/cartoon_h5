<template>
  <div class="main-content">
    <div class="container">
      <div
        class="main-content-item"
        v-for="item in dataList"
        :key="item.cartoon_id"
        @click.stop="handleClickInfo(item.cartoon_id)"
      >
        <span
          class="main-content-item-img"
          :style="{background: 'url('+item.cover+')','background-size': 'contain'}"
        ></span>
        <span class="main-content-item-title">{{ item.title }}</span>
        <span class="main-content-item-status">{{ item.publish_status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collectTable',
  data() {
    return {
      dataList: [
        {
          cartoon_id: 1,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试1hfkshdkfhasdkjfhsdjkhfkjsdahfjkhsadfjkhsdajklfs',
          publish_status: '更新至第1话'
        },
        {
          cartoon_id: 2,
          cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
          title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
          publish_status: '更新至第2话'
        },
        {
          cartoon_id: 3,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试3',
          publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊'
        },
        {
          cartoon_id: 4,
          cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
          title: '测试4',
          publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs'
        },
        {
          cartoon_id: 5,
          cover: 'http://bookwine.leimans.com/1600336891080-360_480.png',
          title: '测试1hfkshdkfhasdkjfhsdjkhfkjsdahfjkhsadfjkhsdajklfs',
          publish_status: '更新至第1话'
        },
        {
          cartoon_id: 6,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
          publish_status: '更新至第2话'
        },
        {
          cartoon_id: 7,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试3',
          publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊'
        },
        {
          cartoon_id: 8,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试4',
          publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs'
        },
        {
          cartoon_id: 9,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试2是粉红色空间的回复即可收到回房间啊水电费接受的',
          publish_status: '更新至第2话'
        },
        {
          cartoon_id: 10,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试3',
          publish_status: '更新至第3话都十分好看就是大恢复会计啊还是对方空间哈的空间发挥圣诞节啊'
        },
        {
          cartoon_id: 11,
          cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
          title: '测试4',
          publish_status: '更新至第4话sdfsdfjhsdfhsadlkjfhaksjdhfljskdhflkjsdfs'
        }
      ]
    };
  },
  methods: {
    handleClickInfo(val) {
      this.$router.push({
        path: '/detail',
        query: {
          cartoon_id: val
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .main-content {
    position: relative;
    width: auto;
    padding: 0 12px 16px;
    .container{
      display: flex;
      flex-flow: row wrap;
      .main-content-item {
        font-family: PingFangSC-Semibold;
        display: flex;
        flex-direction: column;
        width: 109px;
        padding: 8px 4px;

        .main-content-item-img {
          height: 145px;
          width: 109px;
          border-radius: 4px;
          background: url('../../../../assets/img/defaultBook.png') no-repeat;
          background-size: 100%;
        }

        .main-content-item-title {
          font-size: 14px;
          display: inline-block;
          padding: 8px 0 2px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .main-content-item-status {
          padding: 2px 0 8px 0;
          color: #bbbbbb;
          font-size: 10px;
          transform: scale(0.83);
          -webkit-transform-origin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
